//PROFILE
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup__edit-profile');
const profileInputName = profilePopup.querySelector('#profileName');
const profileInputAbout = profilePopup.querySelector('#profileAbout');
const profileForm = profilePopup.querySelector('#profileForm')

//CARD
const cardsList = document.querySelector('.cards__list')
//POPUP BUTTON
const profileCloseButton = profilePopup.querySelector('#profileCloseButton')

//Открытие/Закрытие PopUp
function openPopup (popup) {
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

//Сохранение данных профиля
function handleEditProfile (evt) {
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
  cardElement.querySelector('.cards__image').src= link
  cardElement.querySelector('.cards__image').alt = name
  cardElement.querySelector('.cards__name').textContent = name

  cardsList.append(cardElement)
  
  
}
jsStartCards.forEach((item)=> {
  createCard(item.link, item.name)
})