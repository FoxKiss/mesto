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

//POPUP BUTTON
const profileCloseButton = profilePopup.querySelector('#profileCloseButton')
const cardPopCloseButton = cardPopup.querySelector('#cardPopCloseButton')

//Открытие/Закрытие PopUp
function openPopup(popup) {
  popup.classList.add('popup_open')
}

function closePopup(popup) {
  popup.classList.remove('popup_open')
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

cardPopCloseButton.addEventListener('click', () =>{
  closePopup(cardPopup)
})

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
  const cardElement = cardTemplate.querySelector('.cards__list-element').cloneNode(true)
  cardElement.querySelector('.cards__image').src = link
  cardElement.querySelector('.cards__image').alt = name
  cardElement.querySelector('.cards__name').textContent = name
  const cardLikeButton = cardElement.querySelector('.cards__like-button')
  cardLikeButton.addEventListener('click', ()=> {
    cardLikeButton.classList.toggle('cards__like-button_active')
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