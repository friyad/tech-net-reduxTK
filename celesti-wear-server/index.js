const serverless = require("serverless-http");
const cors = require("cors");
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const whitelist = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
};

// declare a new express app
const app = express();
app.use(cors(corsOptions));
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@celesti-wear-cluster.vat64gn.mongodb.net/`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const db = client.db("celesti-wear");
const productCollection = db.collection("product");

app.get("/products", async (req, res) => {
  const cursor = productCollection.find({});
  const product = await cursor.toArray();
  res.send({ status: true, data: product });
});

app.post("/product", async (req, res) => {
  const product = req.body;
  const result = await productCollection.insertOne(product);
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const result = await productCollection.findOne({ _id: ObjectId(id) });
  res.send(result);
});

app.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  const result = await productCollection.deleteOne({ _id: ObjectId(id) });
  res.send(result);
});

app.post("/comment/:id", async (req, res) => {
  const productId = req.params.id;
  const comment = req.body.comment;
  const result = await productCollection.updateOne(
    { _id: ObjectId(productId) },
    { $push: { comments: comment } }
  );

  if (result.modifiedCount !== 1) {
    console.error("Product not found or comment not added");
    res.json({ error: "Product not found or comment not added" });
    return;
  }

  res.json({ message: "Comment added successfully" });
});

app.get("/comment/:id", async (req, res) => {
  const productId = req.params.id;
  const result = await productCollection.findOne(
    { _id: ObjectId(productId) },
    { projection: { _id: 0, comments: 1 } }
  );

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {});

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(500).json({
    error: err,
    message: err.message,
  });
};

app.use(errorHandler);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
