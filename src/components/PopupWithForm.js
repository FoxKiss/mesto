import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector)
    this._submitForm = submitForm
    this._form = this._popup.querySelector('.popup__form')
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input')
    const value = {}
    this._inputList.forEach((input) => {
      value[input.name] = input.value
    })

    return value
  }

  close() {
    super.close()
    this._form.reset()
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitForm(this._getInputValues())
      this.close()
    })
  }
}
