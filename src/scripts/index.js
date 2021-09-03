import '../pages/style.css';

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



class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl
    this._token = token
  }

  _checkResponse(res) {
    if (res) {
      return res.json()
    } return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers:
      {
        authorization: this._token
      },
    }).then(this._checkResponse)
  }

  setInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers:
      {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    }).then(this._checkResponse)
  }

  getStartCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers:
      {
        authorization: this._token
      }
    }).then(this._checkResponse)
  }

  postCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers:
      {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse)
  }
}

//Создание Классов\\
//Api
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-27', '40f69e37-e35f-44b4-a4bd-e53ae77f767e')

//PopupWithForm для Карточек и Профиля
const popupWithCard = new PopupWithForm(cardPopup,
  {
    submitForm: (data) => {
      api.postCard(data)
        .then((data) => {
          const cardElement = createCard(data)
          cardsSection.prependItem(cardElement)
          popupWithCard.closePopup()
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`)
        });
    }
  })

const popupWithProfile = new PopupWithForm(profilePopup,
  {
    submitForm: (data) => {
      api.setInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data)
      })
    }
  })

//PopupWithImage
const popupWithImage = new PopupWithImage(imagesPopup)
popupWithImage.setEventListeners()

//UserInfo
const userInfo = new UserInfo(profileName, profileAbout)

//Section
const cardsSection = new Section({
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
  profileFormValidation.resetValidation()
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

//Начальная информация о пользователе и Карточки с сервера
Promise.all([api.getInfo(), api.getStartCards()])
  .then(([userData, cards]) => {
    const userId = userData._id
    userInfo.setUserInfo(userData)
    cardsSection.renderItems(cards)
  })
  .catch((err) => {
    console.log(`Ошибка: ${err.status}`)
  });

//
profileEditButton.addEventListener('click', openProfilePopup)
popupWithProfile.setEventListeners()

cardCreateButton.addEventListener('click', openCardPopup)
popupWithCard.setEventListeners()

cardsSection.renderItems()