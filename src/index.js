const {MongoClient, ObjectId} = require('mongodb');

const url = "mongodb://0.0.0.0:27017";
const databaseName = "task-manager";


const insertInto = async(db) =>{
    const res = await db.collection('user').insertOne({
        name: 'Khanh khong beo',
        age: 1
    });
    console.log({res});
}
const findId = async(db) =>{
    const res = await db.collection('user').findOne(
        {_id : ObjectId("62cf92714d486497e36824ab")}
        );
    console.log({res});
}
const updateId = async(db) => {
    const res = await db.collection('user').updateOne({
        _id:  ObjectId("62cf92714d486497e36824ab")
    }, {
        $set: {
            name: "Nguyen Van A3"
        }
    })
    console.log({res});
}
const updateManyObj = async(db) => {
    const res = await db.collection('user').updateMany(
        {
            
        }, {
        $inc: {
            age: 1
        }
    })
}
const insertManyObj = async(db) => {
    const res = await db.collection('user').insertMany([
        {
            name: "Nam A",
            age: 5
        },
        {
            name: "Nam B",
            age: 6
        },
        {
            name: "Nam C",
            age: 7
        }
    ]);
    console.log({res});
}
const deleteManyObj = async (db) => {
    const res = await db.collection('user').deleteMany({
        age: 5
    });
    console.log({res});
}
const client = new MongoClient(url);
async function main(){
    try {
        await client.connect();
        const db = client.db(databaseName);
        console.log({db});
        await insertInto(db);
        // await findId(db);
        // await updateId(db); 
        // await insertManyObj(db);
        // await deleteManyObj(db);
        // await updateManyObj(db);
    }
    catch (error) {
        console.log(error);
    }
}
main();
