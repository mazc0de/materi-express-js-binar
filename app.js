// setup express js
const express = require("express");
const app = express();
const port = 3000;

// json parser
app.use(express.json());

// body parser (x-www-urlencoded)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// route localhost:3000/about
app.get("/about", (req, res) => {
    res.send("Ini adalah halaman About");
});

let students = [{
        id: 1,
        name: "Leonardo",
        email: "leonardo@gmail.com",
    },
    {
        id: 2,
        name: "Natalie",
        email: "natalie@gmail.com",
    },
    {
        id: 3,
        name: "Erwin",
        email: "erwin@gmail.com",
    },
];

// request method GET
app.get("/students", (req, res) => {
    res.json(students);
});

// request method GET with Parameter
app.get("/student/detail/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const getStudent = students.find((student) => student.id === studentId);

    if (!getStudent) {
        res.status(500);
        res.send("student not found!");
    } else {
        res.json(getStudent);
    }
});

// request method POST
app.post("/student/add", (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.json(students);
});

// request method PUT
app.put("/student/edit/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const body = req.body;
    const student = students.find((student) => student.id === studentId);
    const index = students.indexOf(student);

    if (!student) {
        res.status(500);
        res.send("account not found!");
    } else {
        const updateStudent = {...student, ...body };

        students[index] = updateStudent;

        res.send(updateStudent);
    }
});

// request method DELETE
app.delete("/student/delete/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const newStudents = students.filter((student) => student.id != studentId);

    if (!newStudents) {
        res.status(500);
        res.send("account not found!");
    } else {
        students = newStudents;
        res.send(students);
    }
});

// x-www-urlencoded
app.post("/product/add", (req, res) => {
    res.status(200);
    console.log(req.body);
    res.json(req.body);
    res.end();
});

// menjalankan server dengan port yang telah ditentukan (Port : 3000)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});