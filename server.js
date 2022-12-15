// import the file system module
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || "4300";
const app = express();
app.set("port", PORT);
const CLASS_FILE_NAME = "standardClass.json";
const STUDENT_FILE_NAME = "students.json";
let contacts = {};
const readFileAsync = () => {};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "dist/school-mgmt")));
app.get("/classes", function (req, res) {
  fs.readFile(CLASS_FILE_NAME, (error, data) => {
    console.log("Async Read: starting...");

    if (error) {
      // if there is an error, print it
      console.log("Async Read: NOT successful!");
      console.log(error);
      res.send({ classes: [] });
    } else {
      try {
        // try to parse the JSON data
        const dataJson = JSON.parse(data);
        classesDetails = dataJson;
        console.log("Async Read: successful!");
        console.log(dataJson);
        res.send(classesDetails);
      } catch (error) {
        // else print an error (e.g. JSON was invalid)
        console.log(error);
        res.send({ classes: [] });
      }
    }
  });
});
app.post("/searchStudents", function (req, res) {
  console.log(req);
  fs.readFile(STUDENT_FILE_NAME, (error, data) => {
    console.log("Async Read: starting...");

    if (error) {
      // if there is an error, print it
      console.log("Async Read: NOT successful!");
      console.log(error);
      res.send({ students: [] });
    } else {
      try {
        // try to parse the JSON data
        const dataJson = JSON.parse(data);
        console.log("Async Read: successful!");
        console.log(dataJson);
        let finalResponse = { students: [] };
        dataJson.students.forEach((element) => {
          console.log("element", element);
          console.log("req", req.body);
          if (element.standard === req.body.standard) {
            finalResponse.students.push(element);
          }
        });
        console.log("finalResponse", finalResponse);
        res.send(finalResponse);
      } catch (error) {
        // else print an error (e.g. JSON was invalid)
        console.log(error);
        res.send({ students: [] });
      }
    }
  });
});
app.post("/student", function (req, res) {
  console.log("req", req);
  console.log("req.body", req.body);
  let data = fs.readFileSync(STUDENT_FILE_NAME);
  let dataObj = JSON.parse(data);
  dataObj.students.push(req.body);
  fs.writeFile(STUDENT_FILE_NAME, JSON.stringify(dataObj), (err) => {
    if (err) {
      console.log("error occured while saving");
      res.status(200).send({ message: "error occured while saving/deleting" });
    } else {
      console.log("student saved successfully");
      res.status(200).send({ message: "post is successful" });
    }
  });
});
app.get("/*", (req, res) =>
  res.sendFile(path.resolve("dist/school-mgmt/index.html"))
);
app.listen(PORT, function () {
  console.log("server is running on local Host " + PORT);
});
