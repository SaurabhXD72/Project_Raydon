if (process.env.NODE_ENV !=="production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

const indexRouter = require("./routes/index")
//setting up the view engine
app.set("view engine","ejs")
// views location
app.set("views",__dirname +"/views")
//hooking up express layouts
app.set("layouts","Layouts/layout")
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

app.listen (process.env.PORT || 3000)