//PROFILE
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup__edit-profile');
const profileForm = profilePopup.querySelector('#profileForm')
const profileInputName = profileForm.querySelector('#profileName');
const profileInputAbout = profileForm.querySelector('#profileAbout');

//CARD
const cardsList = document.querySelector('.cards__list')
const cardCreateButton = document.querySelector('.profile__add-button')
const cardPopup = document.querySelector('.popup__create-cards')
const cardForm = cardPopup.querySelector('#cardForm')
const cardInputName = cardForm.querySelector('#cardName')
const cardInputLink = cardForm.querySelector('#cardLink')

//IMAGE POPUP
const imagesPopup = document.querySelector('.popup__images')
const cardPopImage = imagesPopup.querySelector('.popup__image')
const cardPopImageName = imagesPopup.querySelector('.popup__image-name')

//POPUP BUTTON
const profileCloseButton = profilePopup.querySelector('#profileCloseButton')
const cardPopCloseButton = cardPopup.querySelector('#cardPopCloseButton')
const imagesCloseButton = imagesPopup.querySelector('#imagePopCloseButton')