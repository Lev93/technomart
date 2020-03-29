const keys = require('../keys')

module.exports = function(name, email, text) {
  return {
    to: 'levriabov12345@mail.ru',
    from: keys.EMAIL_FROM,
    subject: 'Запрос от посетителя',
    html: `
      <p>Пользователь по имени - ${name} c email - ${email} прислал следующее письмо:</p>
      <hr />
      <p>${text}</p>
      <a href="${keys.BASE_URL}">Магазин курсов</a>
    `
  }
}