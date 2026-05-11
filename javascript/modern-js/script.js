// VARIABLES
let age = 22;

const country = "Uganda";

console.log(age);
console.log(country);


// TEMPLATE LITERALS
const username = "Jeferson";
const myRole = "Frontend Developer";

const intro = `My name is ${username} and I am a ${myRole}`;

console.log(intro);


// ARROW FUNCTION
const welcome = () => {
    console.log("Welcome Developer");
};

welcome();


// ARRAYS
const languages = ["HTML", "CSS", "JavaScript"];

console.log(languages);

languages.push("React");

console.log(languages);


// LOOPING
languages.forEach((language) => {
    console.log(language);
});


// OBJECTS
const developer = {
    name: "Jeferson",
    age: 22,
    country: "Uganda",
    skills: ["HTML", "CSS", "JavaScript"]
};

console.log(developer);

console.log(developer.name);


// DESTRUCTURING
const { name, skills } = developer;

console.log(name);

console.log(skills);


// SPREAD OPERATOR
const frontendSkills = ["HTML", "CSS"];

const allSkills = [...frontendSkills, "JavaScript", "React"];

console.log(allSkills);


// FETCH API
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {

        users.forEach((user) => {
            console.log(user.name);
        });

    });