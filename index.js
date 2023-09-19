const { stdin, stdout } = require('process')

function guessAge(age){
    return age
}
const readLine = require('readline').createInterface({
    input: stdin,
    output: stdout
})

readLine.question("Zgadne twój wiek na podstawie twojego wieku!\nPodaj swój wiek: ", age =>{
    console.log(`\n---------------------\n\nTwój wiek to: ${guessAge(age)}\n\n---------------------`)
    readLine.close()
})
