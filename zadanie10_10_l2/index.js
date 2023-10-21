const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const students = require('./public/api/students.js')
const subjects = require('./public/api/subjects.js')


app.use(bodyParser.urlencoded({ extended: false }));
app.set('json spaces', 2)
app.use(express.static(path.join(__dirname, 'public'))); // Obsługa statycznych plików z folderu public

app.get('/', (req, res) => {
  res.send(`
    <h1>Strona główna</h1>
    <p>Dowolny tekst.</p>
  `);
});

app.get('/kontakt', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'html', 'index.html');
  res.sendFile(filePath);
});

app.post('/kontakt', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.get('/api', (req, res) => {
  res.json({
    "/api/students": "Zwraca liste studentów",
    "/api/students/:id": "Zwraca studentów po id",
    "/api/subjects": "Zwraca liste przedmiotów",
    "/api/subjects/:id": "Zwraca przedmiot po id"
  });
});

// /api/students endpoint
app.get('/api/students', (req, res) => {
  res.json(students);
});

// /api/students/:id endpoint
app.get('/api/students/:id', (req, res) => {
  console.log(req.params.id)
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// /api/subjects endpoint
app.get('/api/subjects', (req, res) => {
  res.json(subjects);
});

// /api/subjects/:id endpoint
app.get('/api/subjects/:id', (req, res) => {
  const subject = subjects.find(s => s.id === parseInt(req.params.id));
  if (subject) {
    res.json(subject);
  } else {
    res.status(404).send('Subject not found');
  }
});
app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000');
});
