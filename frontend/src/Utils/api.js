import { apiOptions, getTokenHeader } from "./constants";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, headers) {
    return fetch(url, headers).then((res) => this._checkResponse(res));
  }

  getUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: getTokenHeader(),
      },
    });
  }

  editUser(userData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: getTokenHeader(),
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        authorization: getTokenHeader(),
      },
    });
  }

  postCard(card) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        authorization: getTokenHeader(),
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: getTokenHeader(),
      },
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: getTokenHeader(),
      },
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: getTokenHeader(),
      },
    });
  }

  updateProfilePicture(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: getTokenHeader(),
      },
      body: JSON.stringify({ avatar }),
    });
  }
}

const api = new Api(apiOptions);
export default api;
