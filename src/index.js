const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static(path.join( 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };

        const userdata = await collection.create(data);
        console.log(userdata);
        res.redirect("/"); // Redirect to login page or another appropriate page
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.render("home");
        } else {
            res.send("Invalid Email or Password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port:${port}`);
});
