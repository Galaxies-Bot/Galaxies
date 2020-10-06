const discordScript = require("discordbot-script")

const bot = new discordScript({
 token: process.env.TOKEN,
 prefix: [process.env.PREFIX]
});

bot.Status({
        0: {
            description: `for ${process.env.PREFIX}help`, 
            type: "WATCHING" 
        },

        1: {
          description: "$allMembersCount members and $serverCount servers!",
          type: "LISTENING"
        },
    }, 13000)
 

bot.Variables({
  warns: "0",
  
  snipes: "",
  user: "",

  bot_version: "1.1.2",

  nm: "0",
  msg: "",
})


bot.MessageEvent()

bot.Command({
  name: "ping",
  code: `$description[Pinging...] $editIn[10ms;{description:**Pong**! \`$ping\` ms}]
  `
})
// Executable commands
bot.ExecutableCommand({
  name: "kick-desc",
  code: `$author[Kick usage]
  $description[Description: Kicks the mentioned member]
   $addField[Aliases:;\`kick\`;no]
  $addField[Example:;>kick @Weeb No anime allowed;no]
  $addField[Usage:;>kick (user) (reason);no]
  $footer[() is required | <> is optional]
  `
})

bot.ExecutableCommand({
  name: "ban-desc",
  code: `$author[Ban usage]
  $description[Description: Ban the mentioned member]
   $addField[Aliases:;\`ban\`;no]
  $addField[Example:;>ban @Raider123 No raiding allowed;no]
  $addField[Usage:;>ban (user) (reason);no]
  $footer[() is required | <> is optional]
  `
})

bot.ExecutableCommand({
  name: "purge-desc",
  code: `$author[Purge usage]
  $description[Description: Removes a certain amount of messages.]
  $addField[Aliases:;\`purge\`;no]
  $addField[Example:;>purge 100;no]
  $addField[Usage:;>purge (amount);no]

  $footer[() is required | <> is optional]
  `
})

bot.ExecutableCommand({
  name: "warn-desc",
  code: `$author[Warn usage]
  $description[Description: Warns mentioned member.]
  $addField[Aliases:;\`warn\`;no]
  $addField[Example:;>warn @BadGuy No swearing!]
  $addField[Usage:;>warn (user);no]
  $footer[() is required | <> is optional]
  `
})

bot.ExecutableCommand({
  name: "unwarn-desc",
  code: `$author[Unwarn usage]
  $description[Description: Unwarns mentioned member.]
  $addField[Aliases:;\`unwarn\`;no]
  $addField[Example:;>unwarn @Weeb;no]
  $addField[Usage:;>unwarn (user);no]
  $footer[() is required | <> is optional]
  `
})

bot.ExecutableCommand({
  name: "poll-desc",
  code: `$author[Poll usage]
  $description[Description: Creates a poll.]
  $addField[Aliases:;\`poll\`;no]
  $addField[Example:;>poll Cats or dogs? Upvote for cat, downvote for dogs!]
  $addField[Usage:;>poll (content)]
  $footer[() is required | <> is optional]
  `
})



// Normal Commands
bot.Command({
  name: "kick",
  code: `
  
  $kick[$mentioned[1];$noMentionMessage[]]
  $description[<:check:754415967563415572> Kicked **$username[$mentioned[1]]#$discriminator[$mentioned[1]]**. Reason: $noMentionMessage[]]
  
  $onlyIf[$noMentionMessage[]!=;{execute:kick-desc}]
  $onlyIf[$mentioned[1]!=;{execute:kick-desc}]

  $onlyIf[$ownerID!=$mentioned[1];{description:<:cross:754416026078150748> You cannot kick the server owner}]
  $onlyIf[$mentioned[1]!=$authorID;{description:<:cross:754416026078150748> I'm not sure you wanna kick yourself.}]

  
  $onlyPerms[kick;<:cross:754416026078150748> You need more permissions to use this command!]
  $onlyBotPerms[kick;<:cross:754416026078150748> I don't have permission to use this command! Do I have kick permission?]
 
 $onlyIf[$guildID!=754728689870307430;Moderation commands are disabled on this server]
  `
})

bot.Command({
  name: "ban",
  code: `
  $ban[$mentioned[1];$noMentionMessage[]]
  $description[<:check:754415967563415572> Banned **$username[$mentioned[1]]#$discriminator[$mentioned[1]]**. Reason: $noMentionMessage[]]
  
  $onlyIf[$noMentionMessage[]!=;{execute:ban-desc}]
  $onlyIf[$mentioned[1]!=;{execute:ban-desc}]

  $onlyIf[$mentioned[1]!=$client[id];{description:I can't ban myself!}]
  $onlyIf[$ownerID!=$mentioned[1];{description:<:cross:754416026078150748> You cannot ban the server owner}]
  $onlyIf[$mentioned[1]!=$authorID;{description:<:cross:754416026078150748> I'm not sure you wanna ban yourself.}]

   $onlyIf[$hasPerm[$client[id];ban]==true;<:cross:754416026078150748> I don't have permission to use this command! Do I have ban permission?]
  $onlyPerms[ban;<:cross:754416026078150748> You need more permissions to use this command!]
  
  $onlyIf[$guildID!=754728689870307430;Moderation commands are disabled on this server]`
})

bot.Command({
  name: "purge",
  code: `$clear[$message[]]
 $description[<:check:754415967563415572> Purged \`$message[1]\` messages.]
  $deletecommand[1ms]
  $deleteIn[2s]

  $onlyIf[$message[1]<=100;{description:<:cross:754416026078150748> You cannot remove more than 100 messages.}]


  $onlyIf[$isNumber[$message[1]]==true;{description:<:cross:754416026078150748> Your argument should be a number!}]
  $onlyIf[$message[]!=;{execute:purge-desc}]

   $onlyIf[$hasPerm[$client[id];managemessages]==true;<:cross:754416026078150748> I don't have permission to use this command! Do I have manage messages permission?]
  $onlyPerms[managemessages;<:cross:754416026078150748> You need more permissions to use this command!]

  `
})

bot.Command({
  name: "help",
  aliases: ["h", "commands", "cmds"],
  code: `$author[Galaxies' Help]
  $description[Hello, I'm Galaxies. My prefix is \`>\`. I'm a multi-purpose moderation bot built by **Irian3x3#0001**.]
  $addField[Image / Gif:;\`avatar\`, \`scroll\`, \`dog\`, \`cat\`, \`wink\`;no]
  $addField[Fun:;\`say\`, \`simp\`, \`fml\`, \`reddit\`, \`8ball\`;no]
  $addField[Utility:;\`snipe\`, \`userinfo\`, \`poll\`, \`youtube\`, \`covid\`;no]
  $addField[Moderation:;\`ban\`, \`kick\`, \`purge\`, \`warn\`, \`unwarn\`, \`warns\`;no]
  $addField[Bot:;\`ping\`, \`help\`, \`suggest\`, \`botinfo\`, \`partners\`, \`vote\`, \`changelog\`;no]
  $addField[Tip:;Wanna support the bot? You can do so with the \`>vote\` command!]

  $footer[Requested by $username[]#$discriminator[]]
  $addTimestamp

  $cooldown[5s;{description:Please wait \`{time}\` before using this again!}]
  `
})

bot.Command({
  name: "suggest",
  aliases: ["sugg"],
  code: `$dm[720021153594343526]
  $author[$username[]#$discriminator[];$userAvatar[]]
  $description[$message[]]
  $footer[Server: $serverName[]]

  $channelSendMessage[$channelID[];<:check:754415967563415572> **Suggestion sent!**]
  $onlyIf[$message[]!=;{description:<:cross:754416026078150748> Please also include your suggestion.}]
  `
})

bot.Command({
  name: "warn",
  code: `
  
  $description[<:check:754415967563415572> Warned **$username[$mentioned[1]]#$discriminator[$mentioned[1]]**.]
  
  
  $setUserVar[warns;$sum[$getUserVar[warns];1]]

  $onlyPerms[managemessages;{description:<:cross:754416026078150748> You do not have enough permissions to use this command!}]  
  $onlyIf[$mentioned[1]!=$authorID;{description:<:cross:754416026078150748> I'm not sure you wanna warn yourself.}]
  $onlyIf[$hasPerm[$mentioned[1];admin]!=true;{description:<:cross:754416026078150748> You can't warn a mod/admin.}]
  $onlyIf[$mentioned[1]!=$ownerID;{description:<:cross:754416026078150748> You cannot warn the server owner!}]
  $onlyIf[$mentioned[1]!=;{execute:warn-desc}]

  $onlyIf[$guildID!=754728689870307430;Moderation commands are disabled on this server]
  `
})

bot.Command({
  name: "unwarn",
  code: `
  $description[<:check:754415967563415572> Unwarned <@$mentioned[1]>.]
  $setUserVar[warns;$sub[$getUserVar[warns;$mentioned[1]];1]]

  $onlyIf[$mentioned[1]!=;{execute:unwarn-desc}]
  $onlyIf[$mentioned[1]!=$ownerID;{description:<:cross:754416026078150748> You can't unwarn an owner because an owner can't have warns}]
  $onlyIf[$mentioned[1]!=$authorID;{description:<:cross:754416026078150748> You can't unwarn yourself.}]

  $onlyPerms[managemessages;{description:<:cross:754416026078150748> You do not have enough permissions to use this command!}]

  $onlyIf[$guildID!=754728689870307430;Moderation commands are disabled on this server]
  `
})

bot.Command({
  name: "warns",
  code: `$description[**$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]** has **$getUserVar[warns;$mentioned[1;yes]]** warns.]
  $onlyIf[$guildID!=754728689870307430;Moderation commands are disabled on this server]
  `
})

bot.Command({
  name: "avatar",
  aliases: ["av", "profile", "pfp"],
  code: `$author[$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]'s avatar]
  $description[_ _]
  $image[$userAvatar[$mentioned[1;yes]]]
  $addTimestamp

  `
})

bot.Command({
  name: "botinfo",
  aliases: ["bi", "bot-info", "info", "bot", "about", "invite"],
  code: `$author[Galaxies Info]
  $description[Hello, I'm Galaxies! I'm a multi-purpose moderation bot built by **Irian3x3#0001**. Here are my stats: \n {hyper:Invite me:https://discord.com/api/oauth2/authorize?client_id=754403987100270682&permissions=470150358&scope=bot} | {hyper:Support Server:https://discord.gg/gyHE56y} | {hyper:Twitter Account:https://twitter.com/Galaxie86167716}]
  $addField[Other;CPU Usage: $cpu \n Memory Usage: $memory MB \n Device: Windows 10 ;yes]
  $addField[Versions;DB-Script: 1.7.0 \n Node.js: 12.16.1 \n Bot: 1.1.2 ;yes]
  $addField[Basic;Servers: $serverCount \n Total Users: $allMembersCount \n Created: $creationDate[$client[id];user] \n Uptime: $uptime ;yes]
  `
})

bot.Command({
  name: "poll",
  code: `$author[New poll!]
  $description[$message[]]
  $footer[Poll by: $username[]#$discriminator[]]

  $deletecommand[1ms]
  $addReactions[754771873677705217;754771895051747476]
  
  $onlyIf[$message[]!=;{execute:poll-desc}]
  `
})


bot.MessageDeleteCommand({
  name: "754847911052836864",
  code: `

$setChannelVar[snipes;$message[]]
$setChannelVar[user;$authorID]

$onlyIf[$message[]!=;]
`
})
bot.onMessageDelete()

bot.Command({
 name: "snipe",
 code: `$author[$username[$getChannelVar[user]]#$discriminator[$getChannelVar[user]]]
$description[$getChannelVar[snipes]]
$addTimestamp
$color[RANDOM]

$onlyIf[$getChannelVar[snipes]!=;{description:There's nothing to snipe!}]
  `})


bot.Command({
  name: "userinfo",
  aliases: ["user", "user-info", "whois", "ui"],
  code: `$author[$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
  $description[_ _]
  $addField[Highest Role:;<@&$highestRole[$mentioned[1;yes]]>]

  $addField[Joined:;$creationDate[$mentioned[1;yes]];member]
  $addField[Created:;$creationDate[$mentioned[1;yes]];user]
  
  $addField[Device:;$platform[$mentioned[1;yes]]]

  $addField[Nickname:;$nickname[$mentioned[1;yes]]]
  $addField[ID:;\`$mentioned[1;yes]\`]
  $addField[Tag/Discriminator:;\`#$discriminator[$mentioned[1;yes]]\`]
  $addField[Name:;$username[$mentioned[1;yes]]]

  $thumbnail[$userAvatar[$mentioned[1;yes]]]
  `
})

bot.Command({
  name: "say",
  code: `$replaceText[$replaceText[$message[];@everyone;**@**everyone];@here;**@**here]


  $onlyIf[$message[]!=;{description:I can't say nothing!}]
  `
})

bot.Command({
  name: "simp",
  code: `$author[Simp rate]
  $description[$username[], you are **$random[0;100]**% simp!]
  $thumbnail[$userAvatar[]]
  $color[RANDOM]

  $onlyIf[$authorID!=720021153594343526;{description:Irian you are 101% simp you already know that lol} {color:RANDOM}]

  $onlyIf[$authorID!=601004288835190795;{description:You have been blacklisted from the command: \`>simp\`}]
  `
})

bot.Command({
  name: "serverinfo",
  aliases: ["server", "srv", "infoserver", "server-info", "info-server", "guild", "guildinfo", "si"],
  code: `$author[$serverName[]]
  $thumbnail[$serverIcon]
  $description[ ]
  $addField[Avatar URL:;{hyper:Click Here:$serverIcon};yes]
  $addField[Region:;$region;yes]
  $addField[Verification Level:;$toLowercase[$serverVerificationLvl];yes]
  $addField[Categories:;$categoryCount;yes]
  $addField[Channels:;$channelCount;yes]
  $addField[Created On:;$creationDate[$guildID];yes]
  $addField[Owner:;<@$ownerID> (\`$ownerID\`);yes]
  $addField[Members:;$membersCount[];yes]
  $addField[ID:;\`$guildID\`;yes]
  $addField[Name:;$serverName[];yes]
  `
})

bot.Command({
  name: "partners",
  code: `$author[Partners]
  $description[These mentioned below are Galaxies' official partners:]
  $addField[Paradise Bot List;{hyper:Website:https://paradisebots.net} \n {hyper:Discord Server:https://discord.gg/H4eNd34} \n {hyper:Twitter:https://twitter.com/ParadiseBotList};yes]
  `
})

bot.Command({
  name: "clyde",
  code: `
  $description[_ _]
  $image[https://ctk-api.herokuapp.com/clyde/$replaceText[$message[]; ;%20]]
  $onlyIf[$message[]!=;{execute:clydeundefined}]
  `
})

bot.ExecutableCommand({
  name: "clydeundefined",
  code: `
  $description[_ _]
  $image[https://ctk-api.herokuapp.com/clyde/undefined%20%2D_%2D]
  `
})

bot.Command({
  name: "ph",
  code: `
  $description[_ _]
  $image[https://api.alexflipnote.dev/pornhub?text=$splitText[1]&text2=$splitText[2]]

  $onlyIf[$splitText[2]!=;{description:Usage: \`>ph <TEXT-1>/<TEXT-2>\`}]
  $onlyIf[$splitText[1]!=;{description:Usage: \`>ph <TEXT-1>/<TEXT-2>\`}]
  $textSplit[$message[];/]
  `
})

bot.Command({
  name: "fml",
  code: `
  $author[$username[]#$discriminator[];$userAvatar[]]
  $title[FML]
  $description[$api[https://api.alexflipnote.dev/fml;text]]
  `
})

bot.Command({
  name: "scroll",
  aliases: ["scrolloftruth", "truth"],
  code: `
  $description[_ _]
  $image[https://api.alexflipnote.dev/scroll?text=$replaceText[$message[]; ;%20]]

  $onlyIf[$message[]!=;{description:I need more text to do this!}]
  `
})

bot.Command({
  name: "reddit",
  code: `
  $author[u/$api[https://meme-api.herokuapp.com/gimme/$message[];author]]
  $title[$api[https://meme-api.herokuapp.com/gimme/$message[];title]]
  $description[{hyper:URL:$api[https://meme-api.herokuapp.com/gimme/$message[];postLink]}]
  $image[$api[https://meme-api.herokuapp.com/gimme/$message[];url]]
  $footer[Upvotes: $api[https://meme-api.herokuapp.com/gimme/$message[];ups]]

  $onlyIf[$api[https://meme-api.herokuapp.com/gimme/$message[];nsfw]!=true;{description:Content blocked: May contain Adult Content.}]
  $onlyIf[$api[https://meme-api.herokuapp.com/gimme/$message[];message]!=This subreddit has no posts or doesn't exist.;{description:Subreddit does not exist!}]
  $onlyIf[$message[]!=;{description:Please also provide a subreddit.}]
  `
})

bot.Command({
  name: "servers",
  code: `$guildNames[]
  $onlyForUsers[720021153594343526;{description:This is an owner-only command}]`
})

bot.Command({
  name: "infs",
  code: `$description[$infoFromServers[]]
  $onlyForUsers[720021153594343526;{description:This is an owner-only command.}]`
})

bot.Command({
  name: "meme",
  code: `
  $author[u/$api[https://meme-api.herokuapp.com/gimme/dankmemes;author]]
  $title[$api[https://meme-api.herokuapp.com/gimme/dankmemes;title]]
  $description[{hyper:URL:$api[https://meme-api.herokuapp.com/gimme/dankmemes;postLink]}]
  $image[$api[https://meme-api.herokuapp.com/gimme/dankmemes;url]]
  $footer[Upvotes: $api[https://meme-api.herokuapp.com/gimme/dankmemes;ups]]`
})

bot.BotJoinCommand({
  name: "757716751885664347",
  code: `$author[Added!]
  $description[I have just been added to a new guild, stats:]
  $addField[I am now in:; $serverCount servers]
  $addField[Main;Name: $serverName[] \n ID: $guildID \n Human Members: $membersCount[human];no]
  `
})
bot.onBotJoin()

bot.BotLeaveCommand({
  name: "757716751885664347",
  code: `
  $author[Removed :(]
  $description[I was just removed from a server :cry: here are server stats:]
  $addField[I am now in:; $serverCount servers]
  $addField[Main;Name: $serverName[] \n ID: $guildID \n Human Members: $membersCount[human];no]
  `
})

bot.onBotLeave()

bot.Command({
  name: "leave",
  code: `
  $botLeave[$replaceText[$message[];;$guildID]]
  $onlyForUsers[720021153594343526;{description:This is an owner-only command!}]
  `
})

bot.Command({
  name: "urban",
  aliases: ["urbandictionary", "urban-dictionary", "urban-dict"],
  code: `$author[Author: $api[https://urbanscraper.herokuapp.com/define/$message[];author] | ID: $api[https://urbanscraper.herokuapp.com/define/$message[];id]]
  $description[**Word**: \n $message[]]
  $addField[Definition:;$api[https://urbanscraper.herokuapp.com/define/$message[];definition]]
  $addField[Example:;$api[https://urbanscraper.herokuapp.com/define/$message[];example]]

  $onlyIf[$api[https://urbanscraper.herokuapp.com/define/$message[];message]!=No definitions could be found for: $message[];{description:Try a different search query?} {author:Not found}]
  $onlyIf[$message[]!=;{description:Please also define what you are searching.}]

  $onlyNSFW[This command is only allowed in a NSFW channel!]
  `
})

bot.Command({
  name: "dog",
  aliases: ["puppy"],
  code: `
  $author[$randomText[Cute puppy!🐶;Doggo!🐶;Dog🐶]]
  $description[_ _]
  $image[$api[https://some-random-api.ml/img/dog;link]]
  `
})

bot.Command({
  name: "cat",
  aliases: ["kitty", "kitten", "kat"],
  code: `
  $author[$randomText[Cute kitty!;Kitty!!;Meow!]]
  $description[_ _]
  $image[$api[https://some-random-api.ml/img/cat;link]]
  `
})

bot.Command({
  name: "vote",
  code: `$author[Vote for galaxies]
  $description[:heart: Aww, you wanna vote for Galaxies? Thank you for your support!]
  $addField[PBL;{hyper:Click here to vote:https://paradisebots.net/bots/754403987100270682}]
  `
})

bot.Command({
  name: "sepia",
  code: `
  $author[Sepia Tinting]
  $description[_ _]
  $image[https://some-random-api.ml/canvas/sepia?avatar=$replaceText[$userAvatar[$mentioned[1;yes]];.webp;.png]]
  `
})

bot.Command({
  name: "birb",
  code: `$author[Birb]
  $description[_ _]
  $image[$api[https://some-random-api.ml/img/birb;link]]
  $addTimestamp
  $color[RANDOM]
  `
})

bot.Command({
  name: "wink",
  code: `
  $description[**$username[]#$discriminator[] winked**]
  $image[$api[https://some-random-api.ml/animu/wink;link]]
  $addTimestamp
  `
})

bot.Command({
  name: "joke",
  code: `
  $author[Joke:]
  $description[$api[https://some-random-api.ml/joke;joke]]
  $addTimestamp
  `
})

bot.SpaceCommand({
  name: "afk-ping",
  code: `
  $getVar[msg;$mentioned[1]]

  $onlyIf[$authorID!=$mentioned[1];]
  $onlyIf[$getVar[nm;$mentioned[1]]!=0;]
  `
})

bot.SpaceCommand({
  name: "disable-afk",
  code: `
  <@$authorID>, you are not AFK anymore.
  $setVar[nm;0;$authorID]

  $onlyIf[$getVar[nm;$mentioned[1]]!=0;]
  `
})

bot.Command({
  name: "afk",
  code: `
  $description[**You're now AFK**: $message[]]

  $setVar[nm;1;$authorID]
  $setVar[msg;**$username[]** is AFK: $message[];$authorID]

  $onlyIf[$message[]!=;{description:**Please provide the afk's message**}]
  `
})

bot.Command({
  name: "8ball",
  code: `
  $description[ ]
  $addField[**Response**:;$api[https://8ball.delegator.com/magic/JSON/$message[];magic;answer];yes]
  $addField[**Question**:;$message[];yes]

  $onlyIf[$message[]!=;{description:**8ball says**: You asked no question.}]
  `
})

bot.Command({
  name: "changelog",
  aliases: ["cl", "update"],
  code: `
  $author[Galaxies Change-Log]
  $description[Most recent update: **1.1.2**]
  $addField[What's new in 1.1.2;Fixed \`say\`: You cannot mention everyone or here \n Added \`covid\` command]
  `
})

bot.Command({
  name: "youtube",
  aliases: ["yt"],
  code: `
  $author[YouTube Search]
  $description[ ]
  $addField[Results:;{hyper:Click To View Results:https://youtube.com/results?search_query=$message[]};yes]
  $addField[Query:;$message[];yes]

  $onlyIf[$message[]!=;{description:What are you searching?}]
  `
})

bot.BotJoinCommand({
  name: "$randomChannelID",
  code: `
  $description[Hello! Thanks for adding Galaxies! I'm a multi-purpose bot with moderation and fun!]
  $addField[Important Links:;{hyper:Support Server:https://discord.gg/gyHE56y} \n {hyper:Invite Link:https://discord.com/api/oauth2/authorize?client_id=754403987100270682&permissions=470150358&scope=bot} \n {hyper:Vote:https://paradisebots.net/bots/754403987100270682};no]
  $addTimestamp
  
  `
})

bot.Command({
  name: "sadcat",
  code: `
  $description[**Sad Cat** :cry:]
  $image[$api[https://api.alexflipnote.dev/sadcat;file]]
  `
})

bot.Command({
  name: "hug",
  code: `
  $description[**$username[]** hugs **$username[$mentioned[1]]**]
  $image[$api[https://some-random-api.ml/animu/hug;link]]
  
  $onlyIf[$mentioned[1]!=$authorID;{description:**You can't hug yourself**}]
  $onlyIf[$mentioned[1]!=;{description:**Please mention someone to hug.**}]
  `
})

bot.Command({
  name: "gay",
  code: `
  $description[ ]
  $image[https://some-random-api.ml/canvas/gay?avatar=$userAvatar[$mentioned[1;yes]]]
  $color[RANDOM]
  `
})

bot.Command({
 name: "covid",
 aliases: ["covid19", "covid-19"],
 api: { link: "https://api.covid19api.com/summary", headers: { 'Content-Type': 'application/json' } },

 code: `
 $title[Covid 19 | Global]
 $color[#ff2050]
 $description[There cases are fetched from API - https://api.covid19api.com/summary]
 $addField[New Confirmed;$api[Global;NewConfirmed];yes]
 $addField[New Deaths;$api[Global;NewDeaths];yes]
 $addField[New Recovered;$api[Global;NewRecovered];yes]
 $addField[Total Confirmed;$api[Global;TotalConfirmed];yes]
 $addField[Total Deaths;$api[Global;TotalDeaths];yes]
 $addField[Total Recovered;$api[Global;TotalRecovered];yes]


 `
});
