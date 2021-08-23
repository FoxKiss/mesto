//Открытие/Закрытие PopUp
function openPopup(popup) {
  document.addEventListener('keydown', escClosePop)
  popup.classList.add('popup_open')
}

function closePopup(popup) {
  document.removeEventListener('keydown', escClosePop)
  popup.classList.remove('popup_open')
}

function openImagePop(evt) {
  cardPopImage.src = evt.target.src
  cardPopImage.alt = evt.target.alt
  cardPopImageName.textContent = evt.target.alt
  openPopup(imagesPopup)
}

function clickCLosePop(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_open')) {
      closePopup(popup)
    }
  })
}

function escClosePop(evt) {
  const activePop = document.querySelector('.popup_open')
  if (evt.key === 'Escape') {
    closePopup(activePop)
  }
}
profileEditButton.addEventListener('click', () => {
  profileInputName.value = `${profileName.textContent}`
  profileInputAbout.value = `${profileAbout.textContent}`

  openPopup(profilePopup)
})

profileCloseButton.addEventListener('click', () => {
  closePopup(profilePopup)
})

cardCreateButton.addEventListener('click', () => {
  openPopup(cardPopup)
})

cardPopCloseButton.addEventListener('click', () => {
  closePopup(cardPopup)
})

imagesCloseButton.addEventListener('click', () => {
  closePopup(imagesPopup)
})

clickCLosePop(profilePopup)
clickCLosePop(cardPopup)
clickCLosePop(imagesPopup)
//Сохранение данных профиля
function handleEditProfile(evt) {
  evt.preventDefault();

  profileName.textContent = `${profileInputName.value}`
  profileAbout.textContent = `${profileInputAbout.value}`

  closePopup(profilePopup)
}
profileForm.addEventListener('submit', handleEditProfile)



//Создание Карточек
function createCard(link, name) {
  const cardTemplate = document.querySelector('#cardTemplate').content
  const cardElement = cardTemplate.querySelector('.cards__list_element').cloneNode(true)
  cardElement.querySelector('.cards__image').src = link
  cardElement.querySelector('.cards__image').alt = name
  cardElement.querySelector('.cards__name').textContent = name
  cardElement.querySelector('.cards__image')
    .addEventListener('click', openImagePop)

  const cardLikeButton = cardElement.querySelector('.cards__like-button')
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('cards__like-button_active')
  })

  const cardDeleteButton = cardElement.querySelector('.cards__delete-button')
  cardDeleteButton.addEventListener('click', (evt) => {
    const element = evt.target.closest('.cards__list_element')
    element.remove()
  })

  return cardElement
}

jsStartCards.forEach((item) => {
  cardsList.append(createCard(item.link, item.name))
})

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  cardsList.prepend(createCard(cardInputLink.value, cardInputName.value))

  cardForm.reset()
  closePopup(cardPopup)
})


const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    setEventListeners(formElement, validationConfig)
  })
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig)
    })
  })
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, validationConfig)
  } else {
    hideError(formElement, inputElement, validationConfig)
  }
}

function showError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(validationConfig.inputErrorClass)
  errorElement.classList.add(validationConfig.errorClass)
  errorElement.textContent = errorMessage
}

function hideError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(validationConfig.inputErrorClass)
  errorElement.classList.remove(validationConfig.errorClass)
  errorElement.textContent = 'errorMessage'
}

enableValidation(validationConfig)