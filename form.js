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
  document.body.style.backgroundColor = theme.bg || ''
  document.body.style.color = theme.text || ''
  document.body.style.fontFamily = theme.font || ''
  document.body.className = ''
  document.body.classList.add(theme.class || '')
  localStorage.setItem('site-theme', theme.class || 'light-theme')
}
function initTheme() {
  const savedTheme = localStorage.getItem('site-theme')
  if (savedTheme) {
    if(savedTheme === 'light-theme'){
      applyTheme({ bg: '#fafafa', text: '#333', font: 'sans-serif', class: 'light-theme' })
    } else if(savedTheme === 'dark-theme'){

      applyTheme({ bg: '#1e1e1e', text: '#ddd', font: 'sans-serif', class: 'dark-theme' })
    } else if(savedTheme === 'blue-theme'){
      applyTheme({ bg: '#e0f0ff', text: '#003366', font: 'sans-serif', class: 'blue-theme' })
    } else if(savedTheme === 'green-theme'){
      applyTheme({ bg: '#e6ffe6', text: '#003300', font: 'sans-serif', class: 'green-theme' })
    } else {

      const currentCustom = JSON.parse(localStorage.getItem('currentCustomTheme'))
      if(currentCustom){
        applyTheme(currentCustom)
      } else {
        applyTheme({ bg: '#fafafa', text: '#333', font: 'sans-serif', class: 'light-theme' })
      }
    }
  } else {
    applyTheme({ bg: '#fafafa', text: '#333', font: 'sans-serif', class: 'light-theme' })
  }
}
themeToggle.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme'
  if(newTheme === 'light-theme'){
    applyTheme({ bg: '#fafafa', text: '#333', font: 'sans-serif', class: 'light-theme' })
  } else {
    applyTheme({ bg: '#1e1e1e', text: '#ddd', font: 'sans-serif', class: 'dark-theme' })
  }
})
initTheme()

const presetTheme = document.getElementById('preset-theme')
const customBg = document.getElementById('custom-bg')
const customText = document.getElementById('custom-text')
const customFont = document.getElementById('custom-font')
const themeNameInput = document.getElementById('theme-name')
const saveThemeBtn = document.getElementById('save-theme')
const savedThemesSelect = document.getElementById('saved-themes')
const applySavedThemeBtn = document.getElementById('apply-saved-theme')
function loadSavedThemes() {
  const themes = JSON.parse(localStorage.getItem('customThemes')) || {}
  savedThemesSelect.innerHTML = '<option value="">--Select Saved Theme--</option>'
  for (let name in themes) {
    let opt = document.createElement('option')
    opt.value = name
    opt.textContent = name
    savedThemesSelect.appendChild(opt)
  }
}
function saveTheme() {
  const name = themeNameInput.value.trim()
  if (!name) return
  const theme = { bg: customBg.value, text: customText.value, font: customFont.value }
  const themes = JSON.parse(localStorage.getItem('customThemes')) || {}
  themes[name] = theme
  localStorage.setItem('customThemes', JSON.stringify(themes))
  loadSavedThemes()
  localStorage.setItem('currentCustomTheme', JSON.stringify(theme))
  applyTheme({ bg: customBg.value, text: customText.value, font: customFont.value, class: '' })
}
presetTheme.addEventListener('change', () => {
  if (presetTheme.value) {
    if(presetTheme.value === 'light-theme'){
      applyTheme({ bg: '#fafafa', text: '#333', font: 'sans-serif', class: 'light-theme' })
    } else if(presetTheme.value === 'dark-theme'){
      applyTheme({ bg: '#1e1e1e', text: '#ddd', font: 'sans-serif', class: 'dark-theme' })
    } else if(presetTheme.value === 'blue-theme'){
      applyTheme({ bg: '#e0f0ff', text: '#003366', font: 'sans-serif', class: 'blue-theme' })
    } else if(presetTheme.value === 'green-theme'){
      applyTheme({ bg: '#e6ffe6', text: '#003300', font: 'sans-serif', class: 'green-theme' })
    }
  }
})
saveThemeBtn.addEventListener('click', saveTheme)
applySavedThemeBtn.addEventListener('click', () => {
  const name = savedThemesSelect.value
  if (!name) return
  const themes = JSON.parse(localStorage.getItem('customThemes')) || {}
  if (themes[name]) {
    localStorage.setItem('currentCustomTheme', JSON.stringify(themes[name]))
    applyTheme({ bg: themes[name].bg, text: themes[name].text, font: themes[name].font, class: '' })
  }
})
loadSavedThemes()