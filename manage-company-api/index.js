const app = require("express")();
const PORT = 8080;
const { MongoClient, ObjectId } = require("mongodb");
var bodyParser = require("body-parser");

var cors = require("cors");

const url =
  "mongodb+srv://lukifraniewski:Wwsi123@manage-company-db.rjxbt.mongodb.net/manage-company-db?retryWrites=true&w=majority";
const dbName = "test";

MongoClient.connect(url, { promiseLibrary: Promise }, (err, db) => {
  if (err) {
    console.log(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db.db(dbName);
  app.listen(PORT, () => {
    console.log(`Node.js app is listening at http://localhost:${PORT}`);
  });
  app.use(cors()); // Use this after the variable declaration
});

// create application/json parser
var jsonParser = bodyParser.json();

app.get("/users", (req, res) => {
  const cursor = app.locals.db.collection("users").find({});
  cursor.toArray().then((x) => res.status(200).send(x));
});

app.get("/workdays", (req, res) => {
  const cursor = app.locals.db.collection("workdays").find({});
  cursor.toArray().then((x) => res.status(200).send(x));
});

app.post("/users", jsonParser, (req, res) => {
  const col = app.locals.db.collection("users");

  const dbResponse = col.insertOne(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    (err, dbres) => {
      if (err) {
        res.send("Error occurred while inserting");
        // return
      } else {
        res.send("inserted record");
        // return
      }
    }
  );
});

app.get("/workday", (req, res) => {
  if (req.query.id) {
    const cursor = app.locals.db
      .collection("workdays")
      .find({ _id: ObjectId(req.query.id) });
    cursor.toArray().then((x) => res.status(200).send(x));
  } else if (req.query.date) {
    const cursor = app.locals.db
      .collection("workdays")
      .find({ date: req.query.date });
    cursor.toArray().then((x) => res.status(200).send(x));
  }
});

app.post("/workday", jsonParser, (req, res) => {
  const col = app.locals.db.collection("workdays");

  const dbResponse = col.insertOne(
    {
      date: req.body.date,
      users: req.body.users,
    },
    (err, dbres) => {
      if (err) {
        res.send("Error occurred while inserting");
        // return
      } else {
        res.send(dbres);
        // return
      }
    }
  );
});

app.put("/workday", jsonParser, (req, res) => {
  const col = app.locals.db.collection("workdays");
  const dbResponse = col.updateOne(
    { _id: ObjectId(req.query.id) },
    {
      $set: { users: req.body.users },
    },
    (err, dbres) => {
      if (err) {
        res.send("Error occurred while inserting");
        // return
      } else {
        res.send(dbres);
        // return
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  console.log(req.params.id);
  app.locals.db.collection("users").deleteOne({ _id: ObjectId(req.params.id) });
  res.send(req.params.id);
});

app.delete("/workday/user", (req, res) => {
  app.locals.db
    .collection("workdays")
    .updateOne(
      { _id: ObjectId(req.query.dayID) },
      { $pull: { users: { _id: req.query.id } } }
    );
  res.send(req.params.id);
});

app.delete("/workdays", (req, res) => {
  app.locals.db
    .collection("workdays")
    .deleteOne({ _id: ObjectId(req.query.id) });
  res.send(req.params.id);
});
