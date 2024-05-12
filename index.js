const express =require('express')
const cors =require('cors')
require('dotenv').config()
const port = process.env.PORT||9000

const app = express()

const corsOption ={
    origin:['http://localhost:5173'],
    credentials:true,
    optionSuccessStatus:200,
}
app.use(cors(corsOption))
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kowhoxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   const serviceCollection= client.db('glowBloom').collection('service')
   const bookCollection= client.db('glowBloom').collection('books')
 //get all services

 app.get('/service', async(req,res)=>{

  const result = await serviceCollection.find().toArray();
  res.send(result)
 })

 //get one data
 app.get('/service/:id', async(req,res)=>{
  const id=req.params.id;
  const query ={_id: new ObjectId(id)}
  const result= await serviceCollection.findOne(query)
  res.send(result)
 })

 //book id
 app.get('/book/:id', async(req,res)=>{
  const id=req.params.id;
  const query ={_id: new ObjectId(id)}
  const result= await serviceCollection.findOne(query)
  res.send(result)
 })




//save service 
app.post('/service', async(req,res)=>{
    const serviceData =req.body;
    const result =await serviceCollection.insertOne(serviceData);
    res.send(result)
  })

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// glowBloom
//t7CX4DzHmvkCYErQ
app.get('/', (req,res)=>{
    res.send('glowBloom server is running')
})

app.listen(port, ()=>console.log(`server is running on port ${port}`))