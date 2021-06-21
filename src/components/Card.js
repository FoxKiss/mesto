export default class Card {
    constructor(name, link, alt,handleCardClick, cardTemplate) {
        this._name = name
        this._link = link
        this._alt = alt
        this._cardTemplate = cardTemplate
        this._cardElement = this._getTemplate()
        this._handleCardClick = handleCardClick
    }
    _getTemplate() {
        const cardElement = this._cardTemplate
            .content
            .querySelector('#cardsElement')
            .cloneNode(true)
        return cardElement
    }

    _deleteCard() {
        this._deleteButton = this._cardElement.querySelector('.elements__delete')
        this._deleteButton.addEventListener('click', () => {
            this._cardElement = this._deleteButton.closest('.elements__cards')
            this._cardElement.remove()
        })
    }

    _likeCard() {
        this._likeButton = this._cardElement.querySelector('.elements__like-button')
        this._likeButton.addEventListener('click', () => { this._likeButton.classList.toggle('elements__like-active') })
    }

    _imageCard() {
        this._handleCardClick(this._name, this._alt, this._cardElement)
    }

    _setEventListeners() {
        this._deleteCard()
        this._likeCard()
        this._imageCard()
    }

    generateCard() {
        this._cardElementImage = this._cardElement.querySelector('.elements__image')
        this._cardElementImage.src = this._link
        this._cardElementImage.alt = this._alt
        this._cardElement.querySelector('.elements__name')
        this._cardElement.querySelector('.elements__name-text').textContent = this._name
        this._setEventListeners()
        return this._cardElement
    }
}
