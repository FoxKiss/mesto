


class аApi {
  constructor(token, baseUrl) {
    this._token = token
    this._baseUrl = baseUrl
  }

  _analysisResponse(res) {
    if (res.ok) {
      return res.json()
    } return Promise.reject(`Ошибка: ${res.status}`)
  }

  getStartCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        this._analysisResponse(res)
      })
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        this._analysisResponse(res)
      })
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      }
    })
      .then((res) => {
        this._analysisResponse(res)
      })
  }

  setInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.link
      }),
    })
      .then((res) => {
        this._analysisResponse(res)
      })
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then((res) => {
        this._analysisResponse(res)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        this._parseResponse(res)
      })
  }

  activeLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data.cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        this._parseResponse(res)
      })
  }

  deactiveLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data.cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        this._parseResponse(res)
      })
  }
}