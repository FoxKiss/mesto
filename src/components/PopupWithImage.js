import  Popup  from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageProp, imageName) {
    super(popupSelector)
    this._imageProp = imageProp
    this._imageName = imageName
  }


  openPopup(name, alt, element) {
    this._imageElement = element.querySelector('.elements__image')
    this._imageElement.addEventListener('click', (evt) => {
      this._imageProp.src = evt.target.src
      this._imageName.textContent = name
      this._imageProp.alt = alt
      super.openPopup()
    })


  }
}
