require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./servers/config/db");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");

const { isActiveRoute} = require("./servers/helpers/routeHelpers");

const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret:"keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
})
}));


app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layout/main');
app.set("view engine", "ejs");

app.locals.isActiveRoute  = isActiveRoute;

app.use("/", require("./servers/routes/main"));
app.use("/", require("./servers/routes/admin"));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});