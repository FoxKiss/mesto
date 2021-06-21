const validationConfig = ({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});

class FormValidator {
    constructor(validateForm, validationConfig) {
        this._validateForm = validateForm
        this._inputSelector = validationConfig.inputSelector
        this._submitButtonSelector = validationConfig.submitButtonSelector
        this._inactiveButtonClass = validationConfig.inactiveButtonClass
        this._inputErrorClass = validationConfig.inputErrorClass
        this._errorClass = validationConfig.errorClass
        this._inputList = Array.from(this._validateForm.querySelectorAll(this._inputSelector))
    }

    enableValidation() {
        this._validateForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setEventListeners()
    }

    resetValidation() {
      this._inputList.forEach((inputElement) => {
        if(inputElement.classList.contains(this._inputErrorClass)) {
          this._hideError(inputElement)
        }
      });
    }



    _setEventListeners() {
        this._buttonElement = this._validateForm.querySelector(this._submitButtonSelector)
        this._deactiveButton()
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._deactiveButton()
            })
        })

    }

    _checkInputValidity(inputElement) {
        this._inputElement = inputElement
        if (!this._inputElement.validity.valid) {
            this._showError()
        }
        else {
            this._hideError()
        }
    }

    _showError() {
        this._inputElement.classList.add(this._inputErrorClass)
        this._errorElement = this._validateForm.querySelector(`.${this._inputElement.id}-error`)
        this._errorElement.textContent = this._inputElement.validationMessage
        this._errorElement.classList.add(this._errorClass)
    }

    _hideError() {
        this._inputElement.classList.remove(this._inputErrorClass)
        this._errorElement = this._validateForm.querySelector(`.${this._inputElement.id}-error`)
        this._errorElement.textContent = ''
        this._errorElement.classList.remove(this._errorClass)
    }

    _deactiveButton() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.setAttribute('disabled', true)
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.removeAttribute('disabled')
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }
    //Хотел реализовать совет по функции для очищения, но столкнулся с проблемой что при первом открытие PopUp Появляется ошибка в консоли
    //Потому что Class List не может найти класс ошибки
    /*resetValidation() {
        this._hideError()
        this._deactiveButton();
    }*/
}
//Export
export { validationConfig, FormValidator }
