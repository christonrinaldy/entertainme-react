const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb://127.0.0.1:27017";

// Create a new MongoClient
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();

//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

async function db () {
    const client = new MongoClient(uri);
        await client.connect();
            await client.db("admin").command({ ping: 1 });
        return (
            client.db('services').collection('tvseries')
        )

}
module.exports = db
