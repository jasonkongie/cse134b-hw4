const form = document.getElementById('enhancedForm')
const nameField = document.getElementById('name')
const emailField = document.getElementById('email')
const commentsField = document.getElementById('comments')
const errorOutput = document.getElementById('error-message')
const infoOutput = document.getElementById('info-message')
const formErrorsField = document.getElementById('formErrorsField')
let formErrors = []

function maskIllegalChars(field) {
  const pattern = new RegExp(field.getAttribute('pattern'))
  let filteredValue = ''
  for (let ch of field.value) {
    if (pattern.test(ch)) {
      filteredValue += ch
    } else {
      formErrors.push({ field: field.name, error: `Illegal character '${ch}' removed` })
      errorOutput.textContent = `Illegal character '${ch}' removed`
      field.classList.add('flash-error')
      setTimeout(() => {
        field.classList.remove('flash-error')
        errorOutput.textContent = ''
      }, 1000)
      
    }
  }
  if (filteredValue !== field.value) {
    field.value = filteredValue
  }
}

function updateCharacterCount() {
  const maxLength = parseInt(commentsField.getAttribute('maxlength'))
  const currentLength = commentsField.value.length


  const remaining = maxLength - currentLength
  infoOutput.textContent = `Characters left: ${remaining}`
  infoOutput.id = 'char-count'
  if (remaining <= 20 && remaining > 10) {
    infoOutput.className = 'warning'
  } else if (remaining <= 10) {
    infoOutput.className = 'error'
  } else {
    infoOutput.className = ''
  }
}

function validateOnSubmit(event) {
  formErrors = []
  if (!nameField.checkValidity()) {
    formErrors.push({ field: 'name', error: 'Name is invalid' })
  }
  if (!emailField.checkValidity()) {
    formErrors.push({ field: 'email', error: 'Email is invalid' })
  }
  if (!commentsField.checkValidity()) {
    formErrors.push({ field: 'comments', error: 'Comments are invalid' })
  }
  if (formErrors.length > 0) {
    formErrorsField.value = JSON.stringify(formErrors)
    event.preventDefault()
    errorOutput.textContent = 'Please fix the errors above.'
  } else {
    formErrorsField.value = ''
  }
}



[nameField, emailField, commentsField].forEach(field => {
  field.addEventListener('input', () => {
    if (field.hasAttribute('pattern')) {
      maskIllegalChars(field)


    }
    if (field === commentsField) {
      updateCharacterCount()
    }
    field.setCustomValidity('')
    if (!field.checkValidity()) {
      field.setCustomValidity('Invalid field')
    }
  })
})

form.addEventListener('submit', validateOnSubmit)
updateCharacterCount()

const themeToggle = document.getElementById('theme-toggle')
function applyTheme(theme) {
  document.body.classList.remove('light-theme', 'dark-theme')
  document.body.classList.add(theme)
}
function initTheme() {
  const savedTheme = localStorage.getItem('site-theme')
  if (savedTheme) {
    applyTheme(savedTheme)
  } else {
    applyTheme('light-theme')
  }
}
themeToggle.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme'
  localStorage.setItem('site-theme', newTheme)
  applyTheme(newTheme)
})
initTheme()
