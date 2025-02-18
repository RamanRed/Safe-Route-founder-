const express = require("express")
const bcrypt = require('bcrypt'); // Correct import of bcrypt
const mongoose = require("mongoose")
const cors = require("cors")
const blogModel = require("./Model/model")
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/maps")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    blogModel.findOne({ Email: email })
        .then(user => {
            if (user) {
                // Compare hashed password (assuming password is hashed)
                bcrypt.compare(password, user.Password, (err, isMatch) => {
                    if (err) {
                        return res.status(500).json({ message: "Error during password comparison" });
                    }
                    if (!isMatch) {
                        console.log("Password is correct, match found.");
                        res.status(200).json({ message: "Login successful" });
                    } else {
                        console.log(isMatch)
                        console.log(`${password} and correct ${user.Password}`)
                        console.log("Incorrect password.");
                        res.status(401).json({ message: "Incorrect password" });
                    }
                });
            } else {
                console.log("No such entry found.");
                res.status(404).json({ message: "No user found, please register" });
            }
        })
        .catch(err => {
            console.error("Error during login:", err);
            res.status(500).json({ message: "Server error during login", error: err });
        });
}); 

app.post("/register", (req, res)=>{
    blogModel.create(req.body)
        .then(blog => {
            // Send the blog data as a response if successful
            res.status(201).json(blog);
        })
        .catch(err => {
            // Log and send the error message back to the client
            console.log(`Error at server POST: ${err}`);
            res.status(500).json({ message: "Error saving data", error: err });
        });
})

const port = 3001
app.listen( port, ()=>{
    console.log(`App is running of port ${port}`);
}) 