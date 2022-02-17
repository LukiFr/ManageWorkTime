const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://lukifraniewski:Wwsi123@manage-company-db.rjxbt.mongodb.net/manage-company-db?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    module.export = db;
  } catch (err) {
    console.log(err.stack);
  }
}

run().catch(console.dir);

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected correctly to server");
//     const db = client.db(dbName);
//     // Use the collection "people"
//     const col = db.collection("people");
//     // Construct a document
//     let personDocument = {
//       name: { first: "Alan", last: "Turing" },
//       birth: new Date(1912, 5, 23), // June 23, 1912
//       death: new Date(1954, 5, 7), // June 7, 1954
//       contribs: ["Turing machine", "Turing test", "Turingery"],
//       views: 1250000,
//     };
//     // Insert a single document, wait for promise so we can read it back
//     const p = await col.insertOne(personDocument);
//     // Find one document
//     const myDoc = await col.findOne();
//     // Print to the console
//     console.log(myDoc);
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
