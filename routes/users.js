var express = require("express");
var router = express.Router();
const { dburl, mongodb, MongoClient } = require("../dbConfig");

/*Get uers listing*/
router.get("/all", async (req, res) => {
  const client = await MongoClient.connect(dburl);

  try {
    const db = await client.db("databaselocal");
    let document = await db.collection("users").find().toArray();
    res.json({
      message: "Data Fetched Successfully!",
      data: document,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error!" });
  } finally {
    client.close();
  }
});

/* POST users listing. */
router.post("/register", async (req, res) => {
  console.log(dburl);
  const client = await MongoClient.connect(dburl);

  try {
    const db = await client.db("databaselocal");
    let user = await db.collection("users").findOne({ email: req.body.email });

    if (user) {
      res.json({
        message: "User with same email exists",
      });
    } else {
      let document = await db.collection("users").insertOne(req.body);
      res.json({
        message: "User Register Successfully!",
        document,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error!" });
  } finally {
    client.close();
  }
});

router.put("/edit-user/:id", async (req, res) => {
  const client = await MongoClient.connect(dburl);

  try {
    const db = await client.db("databaselocal");
    let document = await db
      .collection("users")
      .findOneAndReplace({ _id: mongodb.ObjectId(req.params.id) }, req.body);

    if (document.value) {
      res.json({
        message: "Data changed Successfully!",
        data: document,
      });
    } else {
      res.status(404).json({
        message: "Invalid Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error!" });
  } finally {
    client.close();
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  const client = await MongoClient.connect(dburl);

  try {
    const db = await client.db("databaselocal");
    let document = await db
      .collection("users")
      .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });

    if (document.value) {
      res.json({
        message: "Data Deleted Successfully!",
        data: document,
      });
    } else {
      res.status(404).json({
        message: "Invalid Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error!" });
  } finally {
    client.close();
  }
});

module.exports = router;
