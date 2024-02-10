#! /usr/bin/env node

console.log(
    'This script populates some test items, categories and MAYBE iteminstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/item");
  const Category = require("./models/category");

  const categories = [];
  const items = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");

    await createCategories();
    await createItems();
    //await createItemInstances();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }

  async function itemCreate(index, name, description, price, number_in_stock, category) {
    const itemdetail = {
      name: name,
      description: description,
      price: price,
      number_in_stock: number_in_stock,
    };
    if (category != false) itemdetail.category = category;
  
    const item = new Item(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  /*
  async function bookInstanceCreate(index, book, imprint, due_back, status) {
    const bookinstancedetail = {
      book: book,
      imprint: imprint,
    };
    if (due_back != false) bookinstancedetail.due_back = due_back;
    if (status != false) bookinstancedetail.status = status;
  
    const bookinstance = new BookInstance(bookinstancedetail);
    await bookinstance.save();
    bookinstances[index] = bookinstance;
    console.log(`Added bookinstance: ${imprint}`);
  }
  */

  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Fruits", "Healthy and tasty"),
      categoryCreate(1, "Vegetables", "Healthy but not tasty"),
      categoryCreate(2, "Meat", "Not always healthy but tasty"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding Books");
    await Promise.all([
      itemCreate(0,
        "Apple",
        "Red and grows on trees",
        2.99,
        10,
        [categories[0]]
      ),
      itemCreate(1,
        "Orange",
        "Orange and grows on trees",
        3.99,
        15,
        [categories[0]]
      ),
      itemCreate(2,
        "Beef",
        "Cow meat",
        12.99,
        5,
        [categories[2]]
      ),
      itemCreate(3,
        "Broccoli",
        "Green and comes from the ground",
        1.99,
        20,
        [categories[1]]
      ),
      itemCreate(4,
        "Potato",
        "Brown and comes from the ground",
        2.99,
        10,
        [categories[1]]
      ),
      itemCreate(5,
        "Chicken-Breast",
        "Chicken meat: Farm raised",
        4.99,
        12,
        [categories[2]]
      ),
      itemCreate(6,
        "Test Item 1",
        "Description of test item 1",
        0.00,
        100,
        false
      ),
    ]);
  }
  
  /*
  async function createBookInstances() {
    console.log("Adding authors");
    await Promise.all([
      bookInstanceCreate(0, books[0], "London Gollancz, 2014.", false, "Available"),
      bookInstanceCreate(1, books[1], " Gollancz, 2011.", false, "Loaned"),
      bookInstanceCreate(2, books[2], " Gollancz, 2015.", false, false),
      bookInstanceCreate(3,
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(4,
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(5,
        books[3],
        "New York Tom Doherty Associates, 2016.",
        false,
        "Available"
      ),
      bookInstanceCreate(6,
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Available"
      ),
      bookInstanceCreate(7,
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Maintenance"
      ),
      bookInstanceCreate(8,
        books[4],
        "New York, NY Tom Doherty Associates, LLC, 2015.",
        false,
        "Loaned"
      ),
      bookInstanceCreate(9, books[0], "Imprint XXX2", false, false),
      bookInstanceCreate(10, books[1], "Imprint XXX3", false, false),
    ]);
  } */