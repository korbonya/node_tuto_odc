// express app
import express, { json } from "express";
import mongoose from "mongoose";
import { isStringObject } from "util/types";
const app = express();

app.use(json());


// user model
const User = mongoose.model("User", {
    firstName: String,
    lastName: String,
    age: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
}
);

// create a user in users collection using mongoose


app.get("/", (req, res) => {
    res.send({
        id: 20,
        name: "Mamdou Aliou",
        age: 30
    })
  res.status(200)
});

// get users in users collection using mongoose

app.get("/users", (req, res) => {
    User.find().then((users) => {
        res.send(users);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "some error occured while retrieving users"
        })
    })
});

app.post('/users', (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    newUser.save().then(() => {
        res.send({
            message:"user created successfully"
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "some error occured while creating a user"
        })
    })
})



mongoose.connect(MongodbUrl).then(() => {
    console.log("connecte a la base de donnee");
})
.then(() => {
    app.listen(5000, () => {
        console.log("le server est lance sur http://localhost:5000/");
      });      
})
.catch((err) => {
    console.log("erreur de connexion a la base de donnee", err);
})



