class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._processResponse = this._processResponse.bind(this);
    }

    signUp(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            })
        })
            .then(this._processResponse);
    }

    signIn(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email,
            })
        })
            .then(this._processResponse);
    }

    getMyUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeadersWithAuthorization(),
        })
            .then(this._processResponse);
    }

    updateMyUser({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeadersWithAuthorization(),
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then(this._processResponse);
    }

    updateAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeadersWithAuthorization(),
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._processResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getHeadersWithAuthorization(),
        })
            .then(this._processResponse);
    }

    createCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeadersWithAuthorization(),
            body: JSON.stringify(card)
        }).then(this._processResponse);
    }

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._getHeadersWithAuthorization()
        }).then(this._processResponse);
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._getHeadersWithAuthorization()
        }).then(this._processResponse);
    }

    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._getHeadersWithAuthorization()
        }).then(this._processResponse);
    }

    _processResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
    }

    _getHeadersWithAuthorization() {
        const jwt = localStorage.getItem('jwt');
        return {...this._headers, 'Authorization': `Bearer ${jwt}`}
    }
}

export const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});
