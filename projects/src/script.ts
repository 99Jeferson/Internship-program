// ===== TYPES & INTERFACES =====

interface FormElements {
  form: HTMLFormElement
  nameInput: HTMLInputElement
  emailInput: HTMLInputElement
  messageInput: HTMLTextAreaElement
}

interface CarouselElements {
  slides: NodeListOf<HTMLElement>
  dots: NodeListOf<HTMLElement>
  prevBtn: HTMLButtonElement
  nextBtn: HTMLButtonElement
}

// ===== HELPER: safely select elements =====
// This function selects an element and throws a clear error if not found
const selectElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector)
  if (!element) throw new Error(`Element not found: ${selector}`)
  return element
}

// ===== FORM VALIDATION =====

const formElements: FormElements = {
  form: selectElement<HTMLFormElement>(".contact-form"),
  nameInput: selectElement<HTMLInputElement>("#name"),
  emailInput: selectElement<HTMLInputElement>("#email"),
  messageInput: selectElement<HTMLTextAreaElement>("#message")
}

const showError = (input: HTMLElement, message: string): void => {
  const existingError = input.parentElement?.querySelector(".error-msg")
  if (existingError) existingError.remove()

  const error = document.createElement("span")
  error.className = "error-msg"
  error.textContent = message
  error.style.color = "#ff4d4d"
  error.style.fontSize = "0.8rem"
  input.parentElement?.appendChild(error)
  ;(input as HTMLInputElement).style.borderColor = "#ff4d4d"
}

const clearError = (input: HTMLElement): void => {
  const existingError = input.parentElement?.querySelector(".error-msg")
  if (existingError) existingError.remove()
  ;(input as HTMLInputElement).style.borderColor = ""
}

const isValidEmail = (email: string): boolean => {
  return email.includes("@") && email.includes(".")
}

formElements.form.addEventListener("submit", (event: Event): void => {
  event.preventDefault()
  let isValid: boolean = true

  if (formElements.nameInput.value.trim() === "") {
    showError(formElements.nameInput, "Please enter your full name")
    isValid = false
  } else {
    clearError(formElements.nameInput)
  }

  if (formElements.emailInput.value.trim() === "") {
    showError(formElements.emailInput, "Please enter your email address")
    isValid = false
  } else if (!isValidEmail(formElements.emailInput.value)) {
    showError(formElements.emailInput, "Please enter a valid email address")
    isValid = false
  } else {
    clearError(formElements.emailInput)
  }

  if (formElements.messageInput.value.trim().length < 10) {
    showError(formElements.messageInput, "Message must be at least 10 characters")
    isValid = false
  } else {
    clearError(formElements.messageInput)
  }

  if (isValid) {
    alert("Message sent! I will get back to you soon.")
    formElements.form.reset()
  }
})

// ===== CAROUSEL =====

const carouselElements: CarouselElements = {
  slides: document.querySelectorAll<HTMLElement>(".carousel-slide"),
  dots: document.querySelectorAll<HTMLElement>(".dot"),
  prevBtn: selectElement<HTMLButtonElement>(".prev-btn"),
  nextBtn: selectElement<HTMLButtonElement>(".next-btn")
}

let currentIndex: number = 0

const goToSlide = (index: number): void => {
  carouselElements.slides[currentIndex].classList.remove("active")
  carouselElements.dots[currentIndex].classList.remove("active")

  currentIndex = index
  if (currentIndex >= carouselElements.slides.length) currentIndex = 0
  if (currentIndex < 0) currentIndex = carouselElements.slides.length - 1

  carouselElements.slides[currentIndex].classList.add("active")
  carouselElements.dots[currentIndex].classList.add("active")
}

carouselElements.nextBtn.addEventListener("click", (): void => {
  goToSlide(currentIndex + 1)
})

carouselElements.prevBtn.addEventListener("click", (): void => {
  goToSlide(currentIndex - 1)
})

carouselElements.dots.forEach((dot: HTMLElement, index: number): void => {
  dot.addEventListener("click", (): void => {
    goToSlide(index)
  })
})

let autoPlay: ReturnType<typeof setInterval> = setInterval((): void => {
  goToSlide(currentIndex + 1)
}, 4000)

carouselElements.prevBtn.addEventListener("click", (): void => clearInterval(autoPlay))
carouselElements.nextBtn.addEventListener("click", (): void => clearInterval(autoPlay))