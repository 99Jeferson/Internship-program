"use strict";
// ===== TYPES & INTERFACES =====
// ===== HELPER: safely select elements =====
// This function selects an element and throws a clear error if not found
const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element)
        throw new Error(`Element not found: ${selector}`);
    return element;
};
// ===== FORM VALIDATION =====
const formElements = {
    form: selectElement(".contact-form"),
    nameInput: selectElement("#name"),
    emailInput: selectElement("#email"),
    messageInput: selectElement("#message")
};
const showError = (input, message) => {
    var _a, _b;
    const existingError = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".error-msg");
    if (existingError)
        existingError.remove();
    const error = document.createElement("span");
    error.className = "error-msg";
    error.textContent = message;
    error.style.color = "#ff4d4d";
    error.style.fontSize = "0.8rem";
    (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(error);
    input.style.borderColor = "#ff4d4d";
};
const clearError = (input) => {
    var _a;
    const existingError = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".error-msg");
    if (existingError)
        existingError.remove();
    input.style.borderColor = "";
};
const isValidEmail = (email) => {
    return email.includes("@") && email.includes(".");
};
formElements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    if (formElements.nameInput.value.trim() === "") {
        showError(formElements.nameInput, "Please enter your full name");
        isValid = false;
    }
    else {
        clearError(formElements.nameInput);
    }
    if (formElements.emailInput.value.trim() === "") {
        showError(formElements.emailInput, "Please enter your email address");
        isValid = false;
    }
    else if (!isValidEmail(formElements.emailInput.value)) {
        showError(formElements.emailInput, "Please enter a valid email address");
        isValid = false;
    }
    else {
        clearError(formElements.emailInput);
    }
    if (formElements.messageInput.value.trim().length < 10) {
        showError(formElements.messageInput, "Message must be at least 10 characters");
        isValid = false;
    }
    else {
        clearError(formElements.messageInput);
    }
    if (isValid) {
        alert("Message sent! I will get back to you soon.");
        formElements.form.reset();
    }
});
// ===== CAROUSEL =====
const carouselElements = {
    slides: document.querySelectorAll(".carousel-slide"),
    dots: document.querySelectorAll(".dot"),
    prevBtn: selectElement(".prev-btn"),
    nextBtn: selectElement(".next-btn")
};
let currentIndex = 0;
const goToSlide = (index) => {
    carouselElements.slides[currentIndex].classList.remove("active");
    carouselElements.dots[currentIndex].classList.remove("active");
    currentIndex = index;
    if (currentIndex >= carouselElements.slides.length)
        currentIndex = 0;
    if (currentIndex < 0)
        currentIndex = carouselElements.slides.length - 1;
    carouselElements.slides[currentIndex].classList.add("active");
    carouselElements.dots[currentIndex].classList.add("active");
};
carouselElements.nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
});
carouselElements.prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
});
carouselElements.dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        goToSlide(index);
    });
});
let autoPlay = setInterval(() => {
    goToSlide(currentIndex + 1);
}, 4000);
carouselElements.prevBtn.addEventListener("click", () => clearInterval(autoPlay));
carouselElements.nextBtn.addEventListener("click", () => clearInterval(autoPlay));
