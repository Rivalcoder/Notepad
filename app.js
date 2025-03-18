const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
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
    res.sendFile(path.join(__dirname, 'htmlnew.html'));
});

// Helper function to get MongoDB collection
const getCollection = async (collectionName) => {
    await client.connect();
    const database = client.db('mydb');  
    return database.collection(collectionName);
};

// Add Note
app.post('/addNote', async (req, res) => {
    try {
        const { username, note } = req.body;
        const collection = await getCollection('notes');

        const noteObj = {
            id: new ObjectId().toString(),
            content: note,
            timestamp: new Date().toISOString()
        };

        await collection.updateOne(
            { username },
            { $push: { notes: noteObj } },
            { upsert: true }
        );

        res.json({ message: 'Note added successfully!', noteId: noteObj.id });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the note.' });
    }
});

// Fetch Notes
app.get('/notes', async (req, res) => {
    try {
        const { username } = req.query;
        const collection = await getCollection('notes');
        const user = await collection.findOne({ username });

        res.json(user ? user.notes || [] : []);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching notes.' });
    }
});

// Fetch Single Note
app.get('/note/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const { username } = req.query;

        if (!username) return res.status(400).json({ message: 'Username is required' });

        const collection = await getCollection('notes');
        const user = await collection.findOne({ username });

        if (!user || !user.notes) return res.status(404).json({ message: 'Note not found' });

        const note = user.notes.find(n => n.id === noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (req.headers.accept.includes('application/json')) {
            return res.json(note);
        }

        res.sendFile(path.join(__dirname, 'note-viewer.html'));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the note.' });
    }
});

// Edit Note
app.put('/editNote/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const { content } = req.body;
        const collection = await getCollection('notes');

        await collection.updateOne(
            { "notes.id": noteId },
            { $set: { "notes.$.content": content, "notes.$.timestamp": new Date().toISOString() } }
        );

        res.json({ success: true, message: "Note updated successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating note." });
    }
});

// Delete Note
app.delete('/deleteNote/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const collection = await getCollection('notes');

        await collection.updateOne(
            { "notes.id": noteId },
            { $pull: { notes: { id: noteId } } }
        );

        res.json({ success: true, message: "Note deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting note." });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
