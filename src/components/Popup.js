export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  openPopup() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    })
    this._popup.classList.add('popup_opened')
  }

  closePopup() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._popup.classList.remove('popup_opened')
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup()
    }

  }

  _handleOverlayClose() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup()
      }
    })
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.closePopup()
      })
    this._handleOverlayClose()
  }
}
