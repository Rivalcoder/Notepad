const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const password = "Prakash@24";
const encodedPassword = encodeURIComponent(password);
const uri = `mongodb+srv://rivalcoder:${encodedPassword}@rivalcoder.fdxlp.mongodb.net/?retryWrites=true&w=majority&appName=rivalcoder`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));




// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});
// Helper function to get MongoDB collection
const getCollection = async (collectionName) => {
    try {
        await client.connect();
        const database = client.db('mydb');  // Replace with your database name
        return database.collection(collectionName);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};

// POST route to add a note
app.post('/addNote', async (req, res) => {
    try {
        const { username, note } = req.body;
        const collection = await getCollection('notes');  // Use a collection named 'notes'
        
        await collection.updateOne(
            { username },
            { $push: { notes: note } },
            { upsert: true }
        );

        res.json({ message: 'Note added successfully!' });
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ message: 'An error occurred while adding the note.' });
    } finally {
        await client.close();
    }
});

// GET route to fetch notes for a user
app.get('/notes', async (req, res) => {
    try {
        const { username } = req.query;
        const collection = await getCollection('notes');  // Use a collection named 'notes'
        
        const user = await collection.findOne({ username });
        if (user) {
            res.json(user.notes || []);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'An error occurred while fetching the notes.' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
