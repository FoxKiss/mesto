import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement)
    this._imageProp = this._popup.querySelector('.popup__images-properties')
    this._imageName = this._popup.querySelector('.popup__images-text')
  }


  open(name, alt, evt) {
    this._imageProp.src = evt.target.src
    this._imageName.textContent = name
    this._imageProp.alt = alt
    super.open()
  }
}