// ===== FORM VALIDATION =====
const contactForm = document.querySelector(".contact-form")
const nameInput = document.querySelector("#name")
const emailInput = document.querySelector("#email")
const messageInput = document.querySelector("#message")

const showError = (input, message) => {
    // Remove any existing error first under an input 
    const existingError = input.parentElement.querySelector(".error-msg")
    if (existingError) existingError.remove()

    // Create and insert the error message
    const error = document.createElement("span")
    error.className = "error-msg"
    error.textContent = message
    error.style.color = "#ff4d4d"
    error.style.fontSize = "0.8em"
    input.parentElement.appendChild(error)
    input.style.borderColor = "#ff4d4d"
}

//Helper function - clears errors from an input 
const clearError = (input) => {
    const existingError = input.parentElement.querySelector(".error-msg")
    if (existingError) existingError.remove()
    input.style.borderColor = ""
}

// Validate email format using s simple check
const isValidEmail = (email) => {
    return email.includes("@") && email.includes(".")
}

//Run validation when form is submitted
contactForm.addEventListener("submit", (event) => {
    event.preventDefault() // Prevent form from submitting
    let isValid = true

    // Check name
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your full name")
        isValid = false
    }else {
        clearError(nameInput)
    }

    // Check email
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Please enter your email address")
        isValid = false
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email address")
        isValid = false
    } else {
        clearError(emailInput)
    }
    //check message
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, "Message must be at least 10 characters long")
        isValid = false
    } else {
        clearError(messageInput)
    }

    //If everything passed
    if (isValid) {
        alert("Message sent successfully! I will get back to you soon.")
        contactForm.reset() // Clear the form
    }
})  
