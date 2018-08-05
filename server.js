var { Client } = require('discord.js')
var Enmap = require("enmap")
var db = new Enmap()
var config = require("./config.json")
var client = new Client()

client.on('guildMemberAdd', membro => {
  var guild = db.has(membro.guild.id)
  if (guild) {
    guild = db.get(membro.guild.id)
  } else {
    db.set(membro.guild.id, 0)
    guild = db.get(membro.guild.id)
  }
  console.log(membro.user.tag +" entrou na guild "+ membro.guild.name +" hehe")
  try {
    membro.send(config.msg)
    console.log("Sucesso, ele levou dm.")
    guild++
    db.set(membro.guild.id, guild)
    console.log("Usuários que já receberam dm nessa guild: "+ guild)
  } catch (e) {
    console.log("Deu erro, provavelmente estava com a dm desativada.")
    console.log("Usuários que já receberam dm nessa guild: "+ guild)
  }
});
client.on('ready', () => console.log("Bot ligado."))
client.on('guildCreate', (g) => {
  console.log("Entrei na guild "+ g.name +"!")
});
client.on('guildDelete', (g) => {
  console.log("Sai da guild "+ g.name +" #rip")
});
client.login(config.token)