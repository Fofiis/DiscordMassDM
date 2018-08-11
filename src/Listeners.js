var Enmap = require("enmap")
var db = new Enmap()
var fs = require('fs')
var config = require('../config.json')
class Listeners {
  constructor () {}
  declare(client) {
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
        membro.send(config.msg).then(o => {
          guild++
          db.set(membro.guild.id, guild)
          console.log("Success!")
          console.log("Usuários que já receberam dm nessa guild: "+ guild) 
        }).catch(e => {
          if (e.code == "40002") console.log("A conta foi bloqueada."), client.destroy()
          else { 
            console.log("erro desconhecido: "+ e.stack)
            console.log("Deu erro, provavelmente estava com a dm desativada.")
            console.log("Usuários que já receberam dm nessa guild: "+ guild)
          }
        });
      } catch (e) {
        console.log("Erro desconhecido...")
      }
    });
    client.on('disconnect', () => {
      console.log("Rip instancia numero "+ client.n +"("+ client.user.tag +")\nRemovendo conta.")
      var index = config.tokens.search(client.token)
        var tokens = config.tokens
        tokens.splice(index, 1)
        config.tokens = tokens
        var path = __dirname +"/../config.json"
        fs.writeFileSync(path, JSON.stringify(config), "utf8")
        console.log(client.user.tag +" foi removido e não será mais conectado.")
      
    });
    client.on('ready', () => console.log("Bot ligado!\nConta: "+ client.user.tag +"\nServidores: "+ client.guilds.map(g => g.name).join(', ') +"\nEmail: "+ client.user.email +"\n--------------"))
    client.on('guildCreate', (g) => {
      console.log("Entrei na guild "+ g.name +"! ("+ client.user.tag +")")
    });
    client.on("rateLimit", () => console.log("Rate limit! Aguardando o fim do rate limit. ("+ client.user.tag+")"))
    client.on('guildDelete', (g) => {
      console.log("Sai da guild "+ g.name +" #rip ("+ client.user.tag +")")
    });
  }
}
module.exports = Listeners