import express, { response } from 'express';
const __dirname = import.meta.dirname;
const app = express();
app.use(express.static('public'));
// ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html')
});
app.get('/userPage', (req, res) => {
    res.sendFile(__dirname + '/pages/user.html')
});
app.get('/studentPage', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html')
});
app.get('/adminPage', (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html')
});

// API
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + "/view/style.css"));
});
app.get('/getStudent', (req, res) => {
    var response = {
        studentId: req.query.studentId,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section
    }
    console.log("Respones is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`)
})
app.get('/getAdmin', (req, res) => {
    var response = {
        studentId: req.query.adminId,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.department
    }
    console.log("Respones is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`)
})
const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
})