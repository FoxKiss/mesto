export default class Card {
  constructor(link, name, template, handleCardClick) {
    this._cardLink = link
    this._cardName = name
    this._cardTemplate = template
    this._cardElement = this._getTemplate()
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content
      .querySelector('.cards__list_element')
      .cloneNode(true)
    return cardElement
  }

  generateCard() {
    this._cardElement.querySelector('.cards__image').src = this._cardLink
    this._cardElement.querySelector('.cards__image').alt = this._cardName
    this._cardElement.querySelector('.cards__name').textContent = this._cardName
    this._setEventListeners()
    return this._cardElement
  }

  _likeCard() {
    this._cardLikeButton = this._cardElement.querySelector('.cards__like-button')
    this._cardLikeButton.addEventListener('click', () => {
      this._cardLikeButton.classList.toggle('cards__like-button_active')
    })
  }

  _deleteCard() {
    this._cardDeleteButton = this._cardElement.querySelector('.cards__delete-button')
    this._cardDeleteButton.addEventListener('click', (evt) => {
      const element = evt.target.closest('.cards__list_element')
      element.remove()
    })
  }

  _openImageCard() {
    this._cardElement.querySelector('.cards__image')
      .addEventListener('click', (evt) => {
        this._handleCardClick(evt)
      })
  }

  _setEventListeners() {
    this._likeCard()
    this._deleteCard()
    this._openImageCard()
  }
}

export { Card }