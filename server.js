if (process.env.NODE_ENV !=="production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index")
const authRouter = require("./routes/authors")
//setting up the view engine
app.set("view engine","ejs")
//using body bodyParser..taken from bodyParser doc!
app.use(bodyParser.urlencoded({limit:"10mb",extended: false}))
// views location
app.set("views",__dirname +"/views")
//hooking up express layouts
app.set("layout","layouts/layout")
//force it to use express layouts
app.use(expressLayouts)
//Location of our public files
app.use(express.static ("public"))

//importing db
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on("error",error => console.error(error))
db.once("open", () => console.log("You are connected to mongoose"))

app.use("/",indexRouter)
app.use("/authors",authRouter)

app.listen (process.env.PORT || 3000)