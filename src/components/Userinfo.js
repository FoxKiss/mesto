export default class UserInfo {
  constructor(nameSelector, hobbySelector) {
    this._name = document.querySelector(nameSelector)
    this._hobby = document.querySelector(hobbySelector)
  }

  getUserInfo() {
    const user = {
      name: this._name.textContent,
      hobby: this._hobby.textContent,
    }
    return user
  }

  setUserInfo({name, hobby}) {
    this._name.textContent = name
    this._hobby.textContent = hobby
  }
}
