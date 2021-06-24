import '../pages/index.css';

//Import
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/Userinfo.js';
import { validationConfig, FormValidator } from '../components/FormValidator.js';
import { jsStartCards } from '../utils/jsStartCard.js';
import {
  profileInputName,
  profileInputHobby,
  cardsInputName,
  cardsInputLink,
  profileEditButton,
  cardsEditButton,
  cardsSubmitButton,
  cardsList,
  cardsForm,
  cardsTemplate,
  profileName,
  profileHobby,
  profilePopSelector,
  imagesPopSelector,
  cardsPopSelector
} from '../utils/constants.js'


//Функции\\

//Функция открытия Popup для изображений
function handleCardClick(name, alt, element) {
  const image = element.querySelector('.elements__image')
  image.addEventListener('click', (evt) => {
    popupImage.open(name, alt, evt)
  })
}

//Функции Открытия Popup для Профиля и Карточек
function openEditProfilePopup() {
  const userData = userInfo.getUserInfo()
  profileInputName.value = userData.name
  profileInputHobby.value = userData.hobby
  profileFormPop.open()
  profileFormValid.resetValidation()
}

function openAddCardPopup() {

  popupAddCard.open()
  cardsFormValid.resetValidation()
}
//Функции Создания Классов\\

//class PopupWithImage
function createImagePopup(popupSelector) {
  const popup = new PopupWithImage(popupSelector)
  popup.setEventListeners()
  return popup
}

//Создание классов\\
//Class UserInfo
const userInfo = new UserInfo(profileName, profileHobby)

//Class PopupWithForm для профиля
const profileFormPop = new PopupWithForm(profilePopSelector,
  {
    submitForm: (data) => {
      userInfo.setUserInfo(data)
    }
  })

//class PopupWithImage
const popupImage = createImagePopup(imagesPopSelector)



//class Section/Card
const cardsSection = new Section({data: jsStartCards,
  renderer: (item) =>{
    const card = new Card(item.name, item.link, item.alt, handleCardClick, cardsTemplate)
    const cardElement = card.generateCard()
    cardsSection.appendItem(cardElement)
  }
  }, cardsList)



//class FormValidator
const profileFormValid = new FormValidator(profileForm, validationConfig)
profileFormValid.enableValidation()
const cardsFormValid = new FormValidator(cardsForm, validationConfig)
cardsFormValid.enableValidation()


//Навешивание слушателей\\

//Создание Карточек и Добавление класса PopupWithForm

const popupAddCard = new PopupWithForm(cardsPopSelector, {
  submitForm: (data) => {
    const card = new Card(data.place, data.link, data.place, handleCardClick, cardsTemplate)
    const cardElement = card.generateCard()
    cardsSection.prependItem(cardElement)

    cardsSubmitButton.setAttribute('disabled', true)
    cardsSubmitButton.classList.add(validationConfig.inactiveButtonClass)
    popupAddCard.close()
  }
})


//Открытие Popup
profileEditButton.addEventListener('click', openEditProfilePopup)
cardsEditButton.addEventListener('click', openAddCardPopup)


cardsSection.renderItems()


popupAddCard.setEventListeners()
profileFormPop.setEventListeners()



