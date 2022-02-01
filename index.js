const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000

// middleWare
app.use(cors())
// for the access userData body data
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.poyqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect()
        const database = client.db('user_collector');
        const userCollection = database.collection('user-collection');



        console.log('your User Collector database running')


        // GET API
        //get all the medicine 
        app.get('/user', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            // console.log(comments)
            res.json(users);
        })


        // POST Api
        // upload a new medicine
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.json(result)
            // res.json({message:'sakilhere'})
        })




        // Delete Api
        // delete one
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.json(result);
        })


    } finally {
        // await client.close()
    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello freaking user data collector!')
})

app.listen(port, () => {
    console.log(`this freaking app listening http://localhost:${port}`)
})

