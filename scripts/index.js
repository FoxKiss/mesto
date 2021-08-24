import { validationConfig, FormValidator } from '../components/FormValidator.js'
import Card from '../components/Card.js'
import UserInfo from '../components/User.info.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js'
import {
  profileName, profileAbout, profileEditButton, profilePopup, profileForm, profileInputName, profileInputAbout,
  cardsList, cardCreateButton, cardPopup, cardForm, cardInputName, cardInputLink, imagesPopup, cardPopImage, cardPopImageName,
  profileCloseButton, cardPopCloseButton, imagesCloseButton, cardTemplate
} from '../utils/constants.js'
import { jsStartCards } from '../utils/jsStartCards.js'


//Создание Классов\\

//PopupWithForm для Карточек и Профиля
const popupWithCard = new PopupWithForm(cardPopup,
  {
    submitForm: (data) => {
      const cardElement = createCard(data)
      cardsSection.prependItem(cardElement)

      popupWithCard.closePopup()
    }
  })

const popupWithProfile = new PopupWithForm(profilePopup,
  {
    submitForm: (data) => {
      userInfo.setUserInfo(data)
    }
  })

//PopupWithImage
const popupWithImage = new PopupWithImage(imagesPopup)
popupWithImage.setEventListeners()

//UserInfo
const userInfo = new UserInfo(profileName, profileAbout)

//Section
const cardsSection = new Section({
  data: jsStartCards,
  renderer: (item) => {
    const cardElement = createCard(item)
    cardsSection.appendItem(cardElement)
  }
}, cardsList)

//Класс Card и функция создания карточек
function createCard(item) {
  const card = new Card(item.link, item.name, cardTemplate, handleCardClick)
  const cardElement = card.generateCard()

  return cardElement
}


//Функции\\

//Открытие и закрытие Popup
function openProfilePopup() {
  const userData = userInfo.getUserInfo()
  profileInputName.value = userData.name
  profileInputAbout.value = userData.about
  popupWithProfile.openPopup()
}

function openCardPopup() {
  popupWithCard.openPopup()

  cardFormValidation.resetValidation()
}

function handleCardClick(evt) {
  popupWithImage.openPopup(evt)
}

//Валидация\\
const profileFormValidation = new FormValidator(validationConfig, profileForm)
profileFormValidation.enableValidation()
const cardFormValidation = new FormValidator(validationConfig, cardForm)
cardFormValidation.enableValidation()



//
profileEditButton.addEventListener('click', openProfilePopup)
popupWithProfile.setEventListeners()

cardCreateButton.addEventListener('click', openCardPopup)
popupWithCard.setEventListeners()

cardsSection.renderItems()


