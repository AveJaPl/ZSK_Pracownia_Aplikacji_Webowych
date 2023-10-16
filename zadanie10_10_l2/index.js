const express = require('express');
const path = require('path');
const app = express();

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
    <form>
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
    <script src="/public/js/form.js"></script>
  `);
});

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000');
});
