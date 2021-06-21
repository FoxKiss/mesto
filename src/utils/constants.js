//Переменные
//Profile
const profileInputName = profileForm.querySelector('.popup__input_type_name')
const profileInputHobby = profileForm.querySelector('.popup__input_type_hobby')
//Cards
const cardsInputName = document.querySelector('.popup__input_cards-name')
const cardsInputLink = document.querySelector('.popup__input_cards-link')
//Popup Button
const profileEditButton = document.querySelector('#profileEditButton')
const cardsEditButton = document.querySelector('#cardsEditButton')
const profileSubmitButton = document.querySelector('#profileSubmitButton')
const cardsSubmitButton = document.querySelector('#cardsSubmitButton')
//Card Element
const cardsList = document.querySelector('.elements__list')
const cardsForm = document.querySelector('#cardsForm')
// Template для карточек
const cardsTemplate = document.querySelector('#cardsTemplate')
//Images Popup
const imagesProperties = document.querySelector('.popup__images-properties')
const imagesName = document.querySelector('.popup__images-text')


//Export
export {
  profileInputName,
  profileInputHobby,
  cardsInputName,
  cardsInputLink,
  profileEditButton,
  cardsEditButton,
  profileSubmitButton,
  cardsSubmitButton,
  cardsList,
  cardsForm,
  cardsTemplate,
  imagesProperties,
  imagesName,
}
