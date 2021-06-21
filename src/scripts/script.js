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
  imagesProperties,
  imagesName,
} from '../utils/constants.js'


//Функции\\

//Функция открытия Popup для изображений
function handleCardClick(name, alt, element) {
  imagesPopClass.openPopup(name, alt, element)
}

//Функции Открытия Popup для Профиля и Карточек
function popupEditProfile() {
  const userData = userInfo.getUserInfo()
  profileInputName.value = userData.name
  profileInputHobby.value = userData.hobby
  profileFormPop.openPopup()
  profileFormValid.resetValidation()
}

function popupEditCards() {

  cardsFormPop.openPopup()
  cardsFormValid.resetValidation()
}
//Функции Создания Классов\\

//class PopupWithImage
function createImagePopup(popupSelector, imageProp, imageName) {
  const popup = new PopupWithImage(popupSelector, imageProp, imageName)
  popup.setEventListeners()
  return popup
}

//Создание классов\\

//Class UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__profesion')

//Class PopupWithForm для профиля
const profileFormPop = new PopupWithForm('#profileEdit',
  {
    submitForm: (data) => {
      userInfo.setUserInfo(data)
    }
  })

//class PopupWithImage
const imagesPopClass = createImagePopup('#imagesPop', imagesProperties, imagesName)

//class Section/Card
const startCards = new Section({
  data: jsStartCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, item.alt, handleCardClick, cardsTemplate)
    const cardElement = card.generateCard()
    startCards.addItemApp(cardElement)
  }
}, cardsList)

//class FormValidator
const profileFormValid = new FormValidator(profileForm, validationConfig)
profileFormValid.enableValidation()
const cardsFormValid = new FormValidator(cardsForm, validationConfig)
cardsFormValid.enableValidation()


//Навешивание слушателей\\

//Создание Карточек и Добавление класса PopupWithForm

const cardsFormPop = new PopupWithForm('#cardsEdit', {
  submitForm: () => {
    const formAddCards = new Section({
      data: [
        {
          name: cardsInputName.value,
          link: cardsInputLink.value,
          alt: cardsInputName.value,
        }
      ],
      renderer: (item) => {
        const card = new Card(item.name, item.link, item.alt, handleCardClick, cardsTemplate)
        const cardElement = card.generateCard()
        formAddCards.addItemPrep(cardElement)
      }
    }, cardsList)

    cardsSubmitButton.setAttribute('disabled', true)
    cardsSubmitButton.classList.add(validationConfig.inactiveButtonClass)
    cardsFormPop.closePopup()
    formAddCards.renderItems()
  }
})


//Открытие Popup
profileEditButton.addEventListener('click', popupEditProfile)
cardsEditButton.addEventListener('click', popupEditCards)


startCards.renderItems()


cardsFormPop.setEventListeners()
profileFormPop.setEventListeners()



