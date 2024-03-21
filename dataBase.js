const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionUrl);

const dbName = "CarsCrudApp";

async function main(){
    console.log("Connected!");
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("cars");

    //await addNewCar(collection)
    await updateCar(collection);
    await findAllCars(collection);

    return "Done!";
};

//Function för att lägga till data i databasen.
async function addNewCar(collection) {
    const newCar = {
        make: "Volvo",
        model: "V70",
        year: 2015
    };

    const result = await collection.insertOne(newCar);
    console.log({result});
};

//Function för att kolla vad för data som finns i databasen.
async function findAllCars(collection){
    const findResult = await collection.find({}).toArray();
    console.log({findResult});
};

//Function för att uppdatera data i databasen.
async function updateCar(collection){
    const objectId = new ObjectId("6439542f542c7a27e57d4801")
    const updateResult = await collection.updateOne({_id: objectId}, {$set: {distance: 1000}});
    console.log({updateResult});

};

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

