document.sendMessage = function(msg) {
	var e = $('#taigachat_message');
	var t = e.val();
	e.val(msg);
	$('#taigachat_send').click();
	e.val(t);
	// Clear Variables?
	e = t = null;
};
 
document.meowInt = setInterval(function() { document.sendMessage('I\'m so lonely.'); },1000 * 60 * 60);
 
taigaBox = $('#taigachat_box');
taigaBox.find('li[data-read!=1]').attr('data-read',1);
document.testInt = setInterval(function() {
	var e = taigaBox.find('li[data-read!=1]');
	e.attr('data-read',1);
	e.each(function() { document.parseCommands($(this)); });
	e = null;
},1000);
 
document.botMuted = false;

document.botSleeping = false;
 
document.banned = {};
 
document.abuse = {};

document.antiWall = {};

document.pingMessages = new Array('!meow', '!pong', '!mrowr', '!politics', '!moo', '!xyzzy', '!cookie');
 
document.botHasPermission = function(userTag) {
	if(document.userIsOwner(userTag)) return true;
	if(document.userIsAdmin(userTag)) return true;
	if(document.userIsHCFAdmin(userTag)) return true;
	return false;
};

document.userIsOwner = function(userTag) {
	if(userTag.text().toLowerCase() == 'humusthewalls' ||
	userTag.text().toLowerCase() == 'eefuh') return true;
	return false;
};

document.userIsAdmin = function(userTag) {
	var span = userTag.find('span');
	if(span.attr('class') == 'style3') return true;
	return false;
};

document.userIsHCFAdmin = function(userTag) {
	var span = userTag.find('span');
	if(span.attr('class') == 'style43') return true;
	return false;
};

document.sayBanAppeal = function(userName) {
	document.sendMessage(userName + 'Talking about ban appeals in chat upsets our overlords. Please don\'t incur their firey wrath. Read this to discover how to avoid their wrath: [URL=http://shotbow.net/forum/threads/23560/]Guide to Avoid Admin Wrath[/URL]');

};

document.sayHackerReport = function(userName) {
	document.sendMessage(userName + 'If you need to report a player for hacking, use [URL=http://shotbow.net/forum/threads/23572/]this sketchy umbrella![/URL] If it is not raining in the shoutbox, please refrain from advertising hacusations here.');
};

document.sayBugReport = function(userName) {
	document.sendMessage(userName + 'If you need to report a bug or exploit, use [URL=http://shotbow.net/forum/threads/2137/]this wonderful hand gadget![/URL] *Hand gadget now available in hot pink!');
};

document.sayReddit = function() {
	document.sendMessage('Have you seen [URL=http://reddit.com/r/minez]the MineZ subbreddit[/URL] recently?');
};

document.sayEmail = function(userName) {
	document.sendMessage(userName + 'I and my colleagues here are just too lame to help you directly. You\'ll need to email a mod to get further help. minezmod@gmail.com');
};

document.sayColor = function(userName) {
	document.sendMessage(userName + 'The colors of usernames in chat denote the donor/rank of the user. Light Orange = default user, Grey = silver member, Yellow = gold member, Cyan = platinum member, Green = emerald member, Purple = obsidian member, Red = website staff, and Dark Orange = admins.')
};

document.sayStuck = function(userName) {
	document.sendMessage(userName + 'If you\'re stuck in a block and need an admin to TP you out, just post in [URL=http://shotbow.net/forum/threads/15016/]the Stuck Thread[/URL]. An admin will unstuck you soon!');
};

document.sayPlugDj = function() {
	document.sendMessage('Check out the [URL=http://plug.dj/shotbow-network-official-party/]Shotbow Network plug.dj Party[URL]!')
};

document.sayPing = function() {
	document.sendMessage(document.pingMessages[Math.floor(Math.random()*7)]);
};
 
document.parseCommands = function(e) {
	var userTag = e.find('.username').clone();
	var user = userTag.text().trim();
	var type = 's'; //user.find('span').text().trim().toLowerCase().substr(1);
	var lUser = user.toLowerCase();
	var msg = e.find('.taigachat_messagetext').text().trim();
	var toks = msg.split(" ");
	if(document.botSleeping && user != 'HumusTheWalls' && user != 'Eefuh') return;
	if(document.botMuted && !document.botHasPermission(userTag)) return;
	if(document.banned[lUser] && lUser != 'humusthewalls') return;
	var didCommand = false;
	if(toks[0]=="HTB")
	switch(toks[1].toLowerCase()) {
		case "hi":
			didCommand = true;
			document.sendMessage('Hi ' + user + '!');
			break;
		case "appeal":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[3] + ': ';
			document.sayBanAppeal(t);
			break;
		case "hacker":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[3] + ': ';
			document.sayHackerReport(t);
			break;
		case "bug":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[3] + ': ';
			document.sayBugReport(t);
			break;
		case "reddit":
			didCommand = true;
			document.sayReddit();
			break;
		case "about":
			didCommand = true;
			document.sendMessage('Hello! I\'m a sassy scriptbot written by Navarr and given attitude by HumusTheWalls with the intention of brightening this shoutbox. You can read Navarr\'s sourcecode at [url=https://gist.github.com/4528369]github[/url]!');
			break;
		case "email":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[3] + ': ';
			document.sayEmail(t);
			break;
		case "color":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[3] + ': ';
			document.sayColor(t);
			break;
		case "stuck":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[3] + ': ';
			document.sayStuck(t);
			break;
		case "time":
			didCommand = true;
			var d = new Date;
			document.sendMessage(user + ': It\'s ' + d.getHours() + ':' + d.getMinutes() + '.');
			break;
		case "commands":
			didCommand = true;
			document.sendMessage(user + ': I\'m fluent in the following phrases: about, commands, appeal, hacker, bug, email, stuck, color, reddit, plugdj');
			break;
		case "plugdj":
			didCommand = true;
			document.sayPlugDj();
			break;
		case "ping":
			didCommand = true;
			document.sayPing();
			break;
		case "mute":
			didCommand = true;
			if(document.botMuted) {
			document.sendMessage('HumusTheBot isn\'t here right now. Please leave a message after the ADJESKVE.');
			} else if(document.botHasPermission(userTag)) {
			document.botMuted = true;
			document.sendMessage('Ok. I\'ll shut up now.');
			} else {
			document.sendMessage('You have no power here, ' + user + ' Stormcrow!');
			}
			break;
		case "unmute":
			didCommand = true;
			if(!document.botMuted) {
			document.sendMessage('Hey! I\'m right here!');
			} else if(document.botHasPermission(userTag)) {
			document.botMuted = false;
			document.sendMessage('/me wakes from his slumber.');
			}
			break;
		case "sleep":
			if(document.userIsOwner(userTag)) {
				document.botSleeping = true;
				document.sendMessage('/me is entering a deep sleep. zZzZz');
			}
			break;
		case "wake":
			if(document.userIsOwner(userTag)) {
				document.botSleeping = false;
				document.sendMessage('/me wakes groggily from his slumber.');
			}
			break;
		case "ban":
			didCommand = true;
			if(!document.botHasPermission(userTag)) {
			document.sendMessage(user + ': You\'re not important enough to do this.');
			break;
			}
			if(toks.length < 3) {
			document.sendMessage(user + ': I don\'t know who you\'re talking about. Please include the user\'s name.');
			break;
			}
			var nToks = toks;
			nToks.shift();
			nToks.shift();
			var u = nToks.join(" ");
			if(u != 'HumusTheWalls' &&
			u != 'Eefuh') {
				document.banned[u.toLowerCase()] = true;
				document.sendMessage(u + ' is a ninny-maumfer and I don\'t listen to them anymore.');
			} else {
				document.sendMessage('No. No, no, no. You can\'t go banning me all willy-nilly.');
			}
			break;
		case "unban":
			didCommand = true;
			if(!document.botHasPermission(userTag)) {
			document.sendMessage(user + ': You\'re not important enough to do this.');
			break;
			}
			if(toks.length < 3) {
			document.sendMessage(user + ': I don\'t know who you\'re talking about. Please include the user\'s name.');
			break;
			}
			var nToks = toks;
			nToks.shift();
			nToks.shift();
			var u = nToks.join(" ");
			document.banned[u.toLowerCase()] = false;
			document.sendMessage(u + ' may be more interesting than I thought, and I will be listening to them again.');
			break;
			
		case "<3":
			didCommand = true;
			document.sendMessage('<3 you ' + toks[2] + '!');
			break;
		default:
			break;
	};
 
	if(didCommand) {
		if(document.abuse[lUser] === undefined) document.abuse[lUser] = {time:0,count:0};
		var d = new Date();
		var t = Math.floor(d.getTime() / 60000);
		if(document.abuse[lUser].time == t) document.abuse[lUser].count++;
		else document.abuse[lUser] = {time:t,count:1};
		if(document.abuse[lUser].count == 3) {
			document.sendMessage(user + ' is a little too attached to me. I think it\'s better if we see other people for a while.');
			document.banned[lUser] = true;
		};
		t = d = null;
	}
	
	var wallType = userTag.find('span').attr('class');
	if(document.antiWall[wallType] != 0) {
		if(document.antiWall[wallType] < 20) {
			document.sendMessage('C-C-C-Combo Breaker!');
			document.antiWall = {};
		}
		document.antiWall[wallType]++;
	} else {
		document.antiWall = {};
		document.antiWall[wallType] = 1;
	}
	 
	// Clear Variables
	nToks = toks = u = d = msg = lUser = user = type = null;
	};
alert('HumusTheBot is awake and bored.');
