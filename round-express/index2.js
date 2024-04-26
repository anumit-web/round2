require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const express = require('express');
const app = express();
const port = 3000;

const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, INLINE, 'somehost.com'],
        'style-src': [SELF, 'mystyles.net'],
        'img-src': ['data:', 'images.com'],
        'worker-src': [NONE],
        'block-all-mixed-content': true
    }
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
    res.send('Welcome to JSON Get response demo page');
})

app.get('/welcome', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Welcome traveller' })
    console.log('http://localhost:3000/welcome');

})

var customer_list = [
    { customer_id: 1 },
    { customer_id: 2 },
    { customer_id: 3 },
    { customer_id: 4 },
    { customer_id: 5 },
    { customer_id: 6 },
    { customer_id: 7 },
    { customer_id: 8 },
    { customer_id: 9 },
    { customer_id: 10 }
];

// return an array
app.get('/listofcustomers', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(customer_list);
    console.log('return an array as json');
    console.log('http://localhost:3000/continents');

})


// return an array
app.get('/listofcustomers2', (req, res) => {

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    // Database Name
    const dbName = 'round';

    

    async function main() {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('customers');
        const projection = { _id: 0 };
        const findResult = await collection.find({}).project(projection).toArray();
        console.log('Found documents =>', findResult);

        res.setHeader('Content-Type', 'application/json');
        //res.json(customer_list);
        res.json(findResult);
        console.log('return an array as json');
        console.log('http://localhost:3000/listofcustomers2');
    
    
        // the following code examples can be pasted here...
    
        return 'done.';
    }
    
    main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());



})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})