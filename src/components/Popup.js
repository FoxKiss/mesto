export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement
  }

  open() {
    document.addEventListener('keydown',  this._handleEscClose())
    this._popup.classList.add('popup_opened')
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._popup.classList.remove('popup_opened')
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close()
      }
    })
  }

  _handleOverlayClose() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    })
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.close()
      })
    this._handleOverlayClose()
  }
}
