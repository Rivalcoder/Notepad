const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const password = "Prakash@24";
const encodedPassword = encodeURIComponent(password);
// MongoDB Atlas connection string
const uri = `mongodb+srv://rivalcoder:${encodedPassword}@rivalcoder.fdxlp.mongodb.net/?retryWrites=true&w=majority&appName=rivalcoder`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('mydb');  // Replace with your database name
        const collection = database.collection('users');  // Replace with your collection name

        const data = req.body;
        await collection.insertOne(data);

        res.json({ message: 'Data saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the data.' });
    } finally {
        await client.close();
    }
});


