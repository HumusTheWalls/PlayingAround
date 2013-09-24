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
 
document.banned = {};
 
document.abuse = {};

document.pingMessages = new Array('!meow', '!pong', '!mrowr', '!politics', '!moo', '!xyzzy', '!cookie');
 
document.botHasPermission = function(userTag) {
	if(userTag.text().toLowerCase() == 'humusthewalls' ||
	userTag.text().toLowerCase() == 'eefuh') return true;
	var span = userTag.find('span');
	switch (span.attr('class')) {
	case 'style3': // admin
	//case 'style22': // emerald
	//case 'style25': // obsidian
	case 'style43': // HCF Admin
	return true;
	default:
	return false;
	};
};

document.sayBanAppeal = function(userName) {
	document.sendMessage(userName + 'Talking about ban appeals in chat upsets our overlords. Please don\'t incur their firey wrath. Read this to discover how to avoid their wrath: [URL=http://shotbow.net/forum/threads/23560/]Guide to Avoid Admin Wrath[/URL]');

};

document.sayReddit = function() {
	document.sendMessage('Have you seen [URL=http://reddit.com/r/minez]the MineZ subbreddit[/URL] recently?');
};

document.sayEmail = function(userName) {
	document.sendMessage(userName + 'I and my colleagues here are just too lame to help you directly. You\'ll need to email a mod to get further help. minezmod@gmail.com');
};

document.sayColor = function(userName) {
	document.sendMessage(userName + 'The colors of usernames in chat denote the donor/rank of the user. Light Orange = default user, Grey = silver member, Yellow = gold member, Cyan = platinum member, Green = emerald member, Purple = obsidian member, Red = website staff, and Dark Orange = admins.')
}

document.sayStuck = function(userName) {
	document.sendMessage(userName + 'If you\'re stuck in a block and need an admin to TP you out, just post in [URL=http://shotbow.net/forum/threads/15016/]the Stuck Thread[/URL]. An admin will unstuck you soon!');
}

document.sayPlugDj = function() {
	document.sendMessage('Check out the [URL=http://plug.dj/shotbow-network-official-party/]Shotbow Network plug.dj Party[URL]!')
};

document.sayPing = function() {
	document.sendMessage(document.pingMessages[Math.floor(Math.random()*7)]);
}
 
document.parseCommands = function(e) {
	var userTag = e.find('.username').clone();
	var user = userTag.text().trim();
	var type = 's'; //user.find('span').text().trim().toLowerCase().substr(1);
	var lUser = user.toLowerCase();
	var msg = e.find('.taigachat_messagetext').text().trim();
	var toks = msg.split(" ");
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
			document.sendMessage(user + ': I\'m fluent in the following phrases: about, appeal, email, stuck, color, reddit, plugdj, ping, mute, unmute, ban, unban');
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
			if(user != 'HumusTheWalls' &&
			user != 'Eefuh') {
				var nToks = toks;
				nToks.shift();
				nToks.shift();
				var u = nToks.join(" ");
				document.banned[u.toLowerCase()] = true;
				document.sendMessage(u + ' is a ninny-maumfer and I don\'t listen to them anymore.');
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
	
	 
	// Clear Variables
	nToks = toks = u = d = msg = lUser = user = type = null;
	};
alert('HumusTheBot is awake and bored.');
