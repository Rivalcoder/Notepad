const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection Details
const password = "Prakash@24";
const encodedPassword = encodeURIComponent(password);
const uri = `mongodb+srv://rivalcoder:${encodedPassword}@rivalcoder.fdxlp.mongodb.net/?retryWrites=true&w=majority&appName=rivalcoder`;
const dbName = "mydb";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Helper function to get MongoDB collection
// Helper function to get MongoDB collection
const getCollection = async (collectionName) => {
    await client.connect();
    const database = client.db(dbName);
    return database.collection(collectionName);
};

// Update Notes Schema (Migrate Old Notes Format)
app.get("/", async (req, res) => {
    try {
        const collection = await getCollection("notes");
        const documents = await collection.find({ "notes.0": { $exists: true, $type: "string" } }).toArray();
        let updatedCount = 0;

        for (let doc of documents) {
            let updatedNotes = doc.notes
                .filter(note => typeof note === "string" && note.trim() !== "") // Ensure it's a string before trimming
                .map(note => ({
                    id: new ObjectId().toString(),
                    content: note,
                    timestamp: new Date().toISOString()
                }));

            await collection.updateOne(
                { _id: doc._id },
                { $set: { notes: updatedNotes } }
            );

            updatedCount++;
        }

        res.json({ success: true, message: `Migration completed! Updated ${updatedCount} documents.` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Migration failed", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});