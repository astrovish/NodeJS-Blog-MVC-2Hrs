const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoutes");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// creating an express application
const app = express();

// configuring .env file path
dotenv.config({path: './config/config.env'});

// connecting application with database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(result => {
    console.log('Application successfully connected with database.')
})
.catch(err => {
    console.log(`Following error occured while connecting with database: ${err}`);
})

const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
    console.log(`Application listening on PORT: ${PORT}`);
})

// setting up view engine
app.set("view engine", "ejs");

// setting up views folder
app.set("views", process.env.VIEWS_FOLDER)

// home page route
app.get("/", (req, res) => {
    res.render("index", {
        pageTitle: "Home Page"
    })
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"))
app.use(express.static(__dirname + "/public"));

// blog routes
app.use("/blogs", blogRouter);

app.use((req, res) => {
    res.status(404).render("404", {
        pageTitle: "OOPS!!! Page Not Found."
    })
})