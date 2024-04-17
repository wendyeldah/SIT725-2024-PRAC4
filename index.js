const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://wendyapiyo:n$U^CQedA6Qz^GU@cluster0.ihwxmvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/public_html'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function runDBConnection() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    collection = client.db().collection('Cat');
    console.log(collection);
  } catch (ex) {
    console.error(ex);
  }
}

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/api/cards', async (req, res) => {
  try {
    const result = await getAllCats();
    res.json({ statusCode: 200, data: result, message: 'get all cards success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: 'Internal server error' });
  }
});

async function getAllCats() {
  // Assuming you have a function to retrieve all cats from the database
  const result = await collection.find({}).toArray();
  return result;
}

runDBConnection().catch(console.error);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
