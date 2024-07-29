const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/login", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected Successfully");
    } catch (error) {
        console.log("Database cannot be Connected", error);
    }
}

connectDB();

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("login", LoginSchema);
module.exports = collection;
