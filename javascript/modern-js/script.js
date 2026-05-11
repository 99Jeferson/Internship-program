// VARIABLES 
let age = 22
const country = "Uganda";

console.log(age);
console.log(country);

// TEMPLATE LITERALS
const username = "Jeferson";
const role = "Frontend Developer";

const intro = `My name is ${username} and I am a ${role}`;
console.log(intro);

// ARROW FUNCTIONS
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
languages.forEach(language => {
    console.log(language);
});

// OBJECTS
const developer = {
    name: "Jeferson",
    age: 22,
    country: "Uganda",
    skills: ["HTML", "CSS", "JavaScript"],
    role: "Frontend Developer"
};
console.log(developer);
console.log(developer.name);

//DESTRUCTURING 
const {name, skills, role} = developer;
console.log(name);
console.log(skills);
console.log(role);

// SPREAD OPERATOR
const forntendskills = ["HTML", "CSS"];
const allskills = [...frontendskills, "JavaScript", "React"];
console.log(allskills);

// FETCH API
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then((users) => {
        
    users.forEach(user => {
        console.log(user.name);
    });
    });