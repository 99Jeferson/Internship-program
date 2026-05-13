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

// ===== IMAGE CAROUSEL =====

const slides = document.querySelectorAll(".carousel-slide")
const dots = document.querySelectorAll(".dot")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

let currentIndex = 0   // tracks which slide is showing

// Core function — shows a specific slide by index number
const goToSlide = (index) => {
  // Remove active from whatever is currently active
  slides[currentIndex].classList.remove("active")
  dots[currentIndex].classList.remove("active")

  // Update currentIndex — handle wrapping at the ends
  currentIndex = index

  if (currentIndex >= slides.length) currentIndex = 0  // went past last → go to first
  if (currentIndex < 0) currentIndex = slides.length - 1  // went before first → go to last

  // Add active to the new slide
  slides[currentIndex].classList.add("active")
  dots[currentIndex].classList.add("active")
}

// Next button → move forward one slide
nextBtn.addEventListener("click", () => {
  goToSlide(currentIndex + 1)
})

// Prev button → move back one slide
prevBtn.addEventListener("click", () => {
  goToSlide(currentIndex - 1)
})

// Clicking a dot → jump directly to that slide
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index)
  })
})

// Auto-play — moves to next slide every 4 seconds automatically
let autoPlay = setInterval(() => {
  goToSlide(currentIndex + 1)
}, 4000)

// Pause auto-play when user interacts with buttons
prevBtn.addEventListener("click", () => clearInterval(autoPlay))
nextBtn.addEventListener("click", () => clearInterval(autoPlay))


//Helper function - clears errors from an input 
const clearError = (input) => {
    const existingError = input.parentElement.querySelector(".error-msg")
    if (existingError) existingError.remove();
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
