import express, { response } from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import { stripVTControlCharacters } from 'node:util';
import { fileURLToPath } from 'node:url';
const __dirname = import.meta.dirname;
const app = express();

var storage = multer.diskStorage({
    destination: (req, file, callback ) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

var upload = multer({storage: storage}).fields([{name: 'file', maxCount: 1}]);

const urlEncoderParser = bodyParser.urlencoded({extended:false});
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
app.get('/fileUpload', (req, res) => {
    res.sendFile(__dirname + '/pages/fileUpload.html')
});


// API
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
app.post('/postAdmin', urlEncoderParser, (req, res) => {
    var response = {
        studentId: req.body.adminId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department
    }
    console.log("Respones is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`)
})
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.statusCode(400).send('Error Uploading File');
        
        var response = {
        studentId: req.body.adminId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department
    }
        const uploadedFile = req.files['file'][0];

        console.log(`File path: ${uploadedFile.path}`)

        res.end(`File and form data uploaded successfully`);
    })
})
const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
})