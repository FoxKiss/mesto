export default class UserInfo {
  constructor(nameSelector, hobbySelector) {
    this._name = nameSelector
    this._hobby = hobbySelector
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
