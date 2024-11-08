const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

const password = "Prakash@24";
const encodedPassword = encodeURIComponent(password);
const uri = `mongodb+srv://rivalcoder:${encodedPassword}@rivalcoder.fdxlp.mongodb.net/?retryWrites=true&w=majority&appName=rivalcoder`;
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json()); // Enable JSON parsing for POST requests
app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve the HTML file
});

app.get('/style', (req, res) => {
    res.sendFile(__dirname + '/public/style.css'); // Serve the CSS file
});

app.get('/notes', async (req, res) => {
    try {
        await client.connect();
        const username = req.query.username;
        const database = client.db('mydb');
        const collection = database.collection('notes');
        const notes = await collection.find({ username }).toArray();
        res.json(notes.map(note => note.notes)); // Respond with note content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.get('/addNote', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('mydb');
        const collection = database.collection('notes');
        const newNote = { username: req.query.username, notes: req.query.note };
        await collection.insertOne(newNote);
        res.json({ message: 'Note added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.get('/deleteNote', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('mydb');
        const collection = database.collection('notes');
        await collection.deleteOne({ username: req.query.username, notes: req.query.note });
        res.json({ message: 'Note deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
