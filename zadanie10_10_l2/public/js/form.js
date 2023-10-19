console.log("Skrypt został załadowany")

const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Formularz zablokowany!');
});