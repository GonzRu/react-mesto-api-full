class WrongLoginOrPasswordError extends Error {
  constructor(message = 'Неправильные почта или пароль') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = WrongLoginOrPasswordError;
