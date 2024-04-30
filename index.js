const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5003;

// middleware
app.use(cors());
app.use(express.json());

// mongodb start

const uri = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_KEY}@cluster0.sabx81g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Connect to the "b9a10-server-side-44fahadhasan" database and access its "CraftItems" collection
    const database = client.db("b9a10-server-side-44fahadhasan");
    const craftItemsCollection = database.collection("CraftItems");

    // Add Craft Item
    const addCraftItem = database.collection("AddCraftItem");

    // get craft items all data this data create manually
    app.get("/craft-items", async (req, res) => {
      // Execute query all data
      const cursor = craftItemsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get craft item single data this data create manually
    app.get("/craft-items/:id", async (req, res) => {
      const id = req.params.id;

      // Query for a craft item that has the _id
      const query = { _id: new ObjectId(id) };

      // Execute query single data
      const result = await craftItemsCollection.findOne(query);
      res.send(result);
    });

    // post data from add craft item
    app.post("/add-craft-item", async (req, res) => {
      const addCraftItemData = req.body;

      // Insert the defined document into the "addCraftItem" collection
      const result = await addCraftItem.insertOne(addCraftItemData);

      res.send(result);
    });

    // get all data from addCraftItem collection
    app.get("/add-craft-item", async (req, res) => {
      // Execute query all data
      const cursor = addCraftItem.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get single data from add craft item collection based on id
    app.get("/add-craft-item/:id", async (req, res) => {
      const id = req.params.id;

      // Query for a AddCraftItem that has the id
      const query = { _id: new ObjectId(id) };

      // Execute query id data
      const result = await addCraftItem.findOne(query);
      res.send(result);
    });

    // get single data delete from add craft item collection based on id
    app.delete("/add-craft-item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await addCraftItem.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
}
run();

// mongodb end

app.get("/", (req, res) => {
  res.send("Server is running...!");
});

app.listen(port, () => {
  console.log(`Port number: ${port}`);
});
