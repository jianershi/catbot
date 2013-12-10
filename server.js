// Get the lib
var irc = require("irc")
  , request = require("request")
  , http = require("http")
  , fs = require("fs")
  , mychannel = require ("./config").mychannel //should be an array
  , StringDecoder = require('string_decoder').StringDecoder;
// Create the configuration

var config = {
    channels: mychannel, //specify the channel you want to join in here
    server: "irc.freenode.net",
    botName: "catbot"
};



// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});


emojis = [];
stream = fs.createReadStream('meow_emoji.dict')
stream.on('data', function(chunk) {
  // console.log('got %d bytes of data', chunk.length);
  var decoder = new StringDecoder('utf8');

  var str = decoder.write(chunk);
  emojis = str.split("\n");  
  
  // console.log(emojis);
  // console.log(emojis.length);
})

Object.prototype.keys = function ()
{
  var keys = [];
  for(var i in this) if (this.hasOwnProperty(i))
  {
    keys.push(i);
  }
  return keys;
}


// Listen for any message, say to him/her in the room
bot.addListener('message', function (from, to, message) {
  if (message.indexOf("cat")!=-1)
  {
      var randomnumber = (Math.floor(Math.random()*20))
      // console.log(randomnumber);
      if (randomnumber == 2) { 
        bot.say(config.channels[0],'meow '+emojis[Math.floor(Math.random()*emojis.length)]);
      } 
  }	
});
