class AuthApi {
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

    currentUser(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._getHeadersWithAuthorization(token)
        })
            .then(this._processResponse);
    }

    _getHeadersWithAuthorization(token) {
        return {...this._headers, 'Authorization': `Bearer ${token}`}
    }

    _processResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
    }
}

export const authApi = new AuthApi({
    baseUrl: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    }
});
