var express = require("Express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

var employee = require("./routes/employee.js");

var mongoose = require("mongoose");
var mongoURI = "mongodb://localhost:27017/market";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on("error", function(err)
{
  console.log("Mongo error " + err);
});

mongoDB.once("open", function()
{
  console.log("Mongo connected.");
});

app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: true})); //This should be near the top

app.use("/employees", employee);

app.use(express.static("server/public/"));
app.get("/", function(req, res)
{
  res.sendFile(path.resolve("server/public/views/index.html"));
});

app.listen(app.get("port"), function()
{
  console.log("listening on port: " + app.get("port"));
});
