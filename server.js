var { tokens } = require('./config.json')
var Listeners = require('./src/Listeners')
var ola = new Listeners()
Array.prototype.search = function (elemento) {
  var array = this
  array.forEach((ele, i) => {
    if (ele == elemento) return i
    else if (parseInt(i) + 1 == array.length) return undefined
  });
}
var instancias = []
var x = 0
if (tokens.length == 0) console.log("Nenhum token foi inserido. Saindo"), process.exit()
tokens.forEach(token => {
  x++
  var { Client } = require('discord.js')
  var bot = new Client()
  bot.n = x
  ola.declare(bot)
  bot.login(token)
  instancias.push(bot)
});