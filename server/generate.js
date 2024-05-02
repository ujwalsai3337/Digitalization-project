
// index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user"); // Import the User model

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://keerthu:chellam2004@cluster0.cqttcna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

app.post('/generate-password', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username }); // Check if the user already exists
        if (user) {
            user.password = password;
        } else {
            user = new User({ username, password });
        }
        await user.save(); // Save the user to the database
        res.status(201).json({ username, generatedPassword: password }); // Respond with the username and generated password
    } catch (error) {
        console.error("Error generating password:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/', (req, res) => {
    try {
        res.send("Hello world");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(5000, () => {
    console.log("Listening to the port 5000...");
});
