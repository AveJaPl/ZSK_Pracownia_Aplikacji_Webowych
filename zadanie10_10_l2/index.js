const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('json spaces', 2)
app.use('/public', express.static(path.join(__dirname, 'public'))); // Obsługa statycznych plików z folderu public

app.get('/', (req, res) => {
  res.send(`
    <h1>Strona główna</h1>
    <p>Dowolny tekst.</p>
  `);
});

app.get('/kontakt', (req, res) => {
  res.send(`
    <h1>Kontakt</h1>
    <form action="/kontakt" method="post">
      <label for="name">Imię:</label>
      <input type="text" id="name" name="name"><br><br>

      <label for="email">Adres e-mail:</label>
      <input type="email" id="email" name="email"><br><br>

      <label for="subject">Temat:</label>
      <select id="subject" name="subject">
        <option value="temat1">Temat 1</option>
        <option value="temat2">Temat 2</option>
      </select><br><br>

      <label for="message">Treść wiadomości:</label><br>
      <textarea id="message" name="message" rows="4" cols="50"></textarea><br><br>

      <input type="submit" value="Wyślij">
    </form>
  `);
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

// Przykładowe dane dla studentów i przedmiotów
const students = [...Array(10)].map((_, i) => ({
  id: i + 1,
  name: `Name${i + 1}`,
  surname: `Surname${i + 1}`,
  email: `email${i + 1}@example.com`
}));

const subjects = [...Array(10)].map((_, i) => ({
  id: i + 1,
  name: `Subject${i + 1}`,
  hoursAWeek: (i + 1) * 2
}));

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
