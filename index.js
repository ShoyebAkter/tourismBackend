const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { MongoClient } = require('mongodb');
const port = 3000;
const dbName = 'tourData';
const client = new MongoClient("mongodb+srv://heroreal5385:QnPcBaleMEgDW0Og@cluster0.oy9lyxu.mongodb.net/?retryWrites=true&w=majority");

async function connectToMongo() {
    try {
      client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  connectToMongo();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post("/message",async(req,res)=>{
  const { name, message,from,touristName,touristPhone,place } = req.body;
  const msgInfo = {
    touristName:touristName,
    touristPhone:touristPhone,
    name:name,
    message: message,
    from:from,
    place:place
  }
  const db = client.db(dbName);
  const collection = db.collection(name);
  await collection.insertOne(msgInfo);
})
app.post("/payment",async(req,res)=>{
  const {user,date,adults,childs,guide,days,place,price,pickUpLocation } = req.body;
  const paymentDetails = {
        From:user,
        date:date,
        adults:adults,
        childs:childs,
        guide:guide,
        days:days,
        place:place,
        price:price,
        pickUpLocation:pickUpLocation
  }
  const db = client.db(dbName);
  const collection = db.collection("payment");
  await collection.insertOne(paymentDetails);
})
app.post("/user",async(req,res)=>{
  const  {email,name}  = req.body;
  const userInfo = {
    email:email,
    name:name
  }
  const db = client.db(dbName);
  const collection = db.collection("UserData");
  await collection.insertOne(userInfo);
})

app.get('/user', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("UserData");

    // Retrieve data from MongoDB
    const data = await collection.find().toArray();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/message/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const db = client.db(dbName);
    const collection = db.collection(name);

    // Retrieve data from MongoDB
    const data = await collection.find().toArray();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/payment', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("payment");

    // Retrieve data from MongoDB
    const data = await collection.find().toArray();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});