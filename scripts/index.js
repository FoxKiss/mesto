//PROFILE
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
const profileEditButton = document.querySelector('.profile__edit-button');
const profileInputName = profilePopup.querySelector('#profileName');
const profileInputAbout = profilePopup.querySelector('#profileAbout');
const profilePopup = document.querySelector('.popup__edit-profile');
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