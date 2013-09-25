document.sendMessage = function(msg) {
	var e = $('#taigachat_message');
	var t = e.val();
	e.val('/me ' + msg);
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

document.lastPinged = 0;
 
document.ignored = {};
 
document.abuse = {};

document.manualPermission = {};

document.antiWall = {};

document.msgsBanAppeal = new Array(	'Talking about ban appeals in chat upsets our overlords. Please don\'t incur their firey wrath. Read this to discover how to avoid their wrath: [URL=http://shotbow.net/forum/threads/23560/]Guide to Avoid Admin Wrath[/URL]',
					'Disscusing bans in chat is the leading cause of kitten deaths each year. Have a heart, save a kitten, keep ban talk out of chat. If you need to appeal, use [URL=http://shotbow.net/forum/threads/23560/]this handy guide[/URL] made by the admins.',
					'I used to discuss bans in chat like you. Then I took a chat-ban to the knee. Learn from my mistakes, and keep ban talk in [URL=http://shotbow.net/forum/threads/23560/]the appropriate forum.[/URL]');

document.msgsHackerReport = new Array(	'If you need to report a player for hacking, use [URL=http://shotbow.net/forum/threads/23572/]this sketchy umbrella![/URL] If it is not raining in the shoutbox, please refrain from advertising hacusations here.',
					'Feel free to [URL=http://shotbow.net/forum/threads/23572/]report someone who might be hacking[/URL], but leave it to the admins to determine guilt. They have black magic and voodoo to help them see the truth. What do you have, eyes? Pffft.',
					'Hackers ruin everyones\' days. [URL=http://shotbow.net/forum/threads/23572/]Report them here[/URL] to earn a free non-existant plushy! *Note: non-existant plushy not guaranteed to exist.');

document.msgsBugReport = new Array(	'If you need to report a bug or exploit, use [URL=http://shotbow.net/forum/threads/2137/]this wonderful hand gadget![/URL] *Hand gadget now available in hot pink!',
					'Ju1cY_0n3 is trying to complete his collection of bug reports. Help him out by [URL=http://shotbow.net/forum/threads/2137/]submitting a report[/URL] of your own! Now only ' + Math.floor(Math.random()*10000) + ' reports left!',
					'Bugs are disgusting little things that are known to carry Mad Player Disease. Do your part to help vaccinate players by [URL=http://shotbow.net/forum/threads/2137/]reporting bugs[/URL] that you find while playing.');

document.msgsReddit = new Array(	'Have you seen [URL=http://reddit.com/r/minez]the MineZ subreddit[/URL] recently?',
					'Tune in to [URL=http://reddit.com/r/minez]the MineZ subreddit[/URL] to find out the latest MineZ and Shotbow news!',
					'[URL=http://reddit.com/r/minez]The MineZ subreddit[/URL] is having a sale today on Karma: Twice the karma for twice the comments!');

document.msgsEmail = new Array(		'I and my colleagues here are just too lame to help you directly. You\'ll need to email a mod to get further help. mineZmod@gmail.com',
					'Sometimes just asking your question to the deep void that is the shoutbox isn\'t enough. In those situations, look to mineZmod@gmail.com for help!',
					'The shoutbox isn\'t a one-stop shop. For some questions, only an admin can help. In those cases, you can reach one by emailing mineZmod@gmail.com!');

document.msgsColor = new Array(		'The colors of usernames in chat denote the donor/rank of the user. Light Orange = default user, Grey = silver member, Yellow = gold member, Cyan = platinum member, Green = emerald member, Purple = obsidian member, Red = website staff, and Dark Orange = admins.');

document.msgsStuck = new Array(		'If you\'re stuck in a block and need an admin to TP you out, just post in [URL=http://shotbow.net/forum/threads/15016/]the Stuck Thread[/URL]. An admin will unstuck you soon!',
					'Being stuck in a block sucks. Try our new 3-step program to get unstuck! Step 1: post in [URL=http://shotbow.net/forum/threads/15016/]the Stuck Thread[/URL]. Step 2: play some Annihilation. Step 3: Sleep off your day\'s achievements.',
					'If you\'re stuck and you know it, post right [URL=http://shotbow.net/forum/threads/15016/]here![/URL] If you\'re stuck and you know it, post right [URL=http://shotbow.net/forum/threads/15016/]here![/URL] If you\'re stuck and you know it, and you really want to show it, if you\'re stuck and you know it, post right [URL=http://shotbow.net/forum/threads/15016/]here![/URL]');

document.msgsPlugDj = new Array(	'Check out the [URL=http://plug.dj/shotbow-network-official-party/]Shotbow Network Plug.dj Party[/URL]!',
					'Ravin\' all night at the [URL=http://plug.dj/shotbow-network-official-party/]Shotbow Network Plug.dj Party[/URL]!',
					'The [URL=http://plug.dj/shotbow-network-official-party/]Shotbow Network plug.dj Party[/URL]: Home of the imfamous Poor-Taste Panda!');

document.pingMessages = new Array(	'!meow', '!pong', '!mrowr', '!politics', '!moo', '!xyzzy', '!cookie');
 
document.botHasPermission = function(userTag) {
	if(document.userIsOwner(userTag)) return true;
	if(document.userIsAdmin(userTag)) return true;
	if(document.userIsBuilder(userTag)) return true;
	if(document.userIsHCFAdmin(userTag)) return true;
	if(document.userIsManuallyApproved(userTag)) return true;
	return false;
};

document.userIsOwner = function(userTag) {
	if(userTag.text().toLowerCase() == 'humusthewalls') return true;
	if(userTag.text().toLowerCase() == 'eefuh') return true;
	return false;
};

document.userIsAdmin = function(userTag) {
	var span = userTag.find('span');
	if(span.attr('class') == 'style3') return true;
	return false;
};

document.userIsBuilder = function(userTag) {
	var span = userTag.find('span');
	if(span.attr('class') == 'style28') return true;
	return false;
}

document.userIsHCFAdmin = function(userTag) {
	var span = userTag.find('span');
	if(span.attr('class') == 'style43') return true;
	return false;
};

document.userIsManuallyApproved = function(userTag) {
	if(userTag.text().toLowerCase() == '1285done') return true;
	return document.manualPermission[userTag.text().toLowerCase()];
};

document.sayBanAppeal = function(userName) {
	document.sendMessage(userName + document.msgsBanAppeal[Math.floor(Math.random()*document.msgsBanAppeal.length)]);
};

document.sayHackerReport = function(userName) {
	document.sendMessage(userName + document.msgsHackerReport[Math.floor(Math.random()*document.msgsHackerReport.length)]);
};

document.sayBugReport = function(userName) {
	document.sendMessage(userName + document.msgsBugReport[Math.floor(Math.random()*document.msgsBugReport.length)]);
};

document.sayReddit = function() {
	document.sendMessage(document.msgsReddit[Math.floor(Math.random()*document.msgsReddit.length)]);
};

document.sayEmail = function(userName) {
	document.sendMessage(userName + document.msgsEmail[Math.floor(Math.random()*document.msgsEmail.length)]);
};

document.sayColor = function(userName) {
	document.sendMessage(userName + document.msgsColor[Math.floor(Math.random()*document.msgsColor.length)]);
};

document.sayStuck = function(userName) {
	document.sendMessage(userName + document.msgsStuck[Math.floor(Math.random()*document.msgsStuck.length)]);
};

document.sayPlugDj = function() {
	document.sendMessage(document.msgsPlugDj[Math.floor(Math.random()*document.msgsPlugDj.length)]);
};

document.sayPing = function() {
	var d = new Date();
	var curTime = Math.floor(d.getTime()/1000);
	if(curTime < document.lastPinged + 30) return;
	document.lastPinged = curTime;
	document.sendMessage(document.pingMessages[Math.floor(Math.random()*document.pingMessages.length)]);
};
 
document.parseCommands = function(e) {
	var userTag = e.find('.username').clone();
	var user = userTag.text().trim();
	var type = 's'; //user.find('span').text().trim().toLowerCase().substr(1);
	var lUser = user.toLowerCase();
	var msg = e.find('.taigachat_messagetext').text().trim();
	var toks = msg.split(" ");
	if(document.botSleeping && !document.userIsOwner(userTag)) return;
	if(document.botMuted && !document.botHasPermission(userTag)) return;
	if(document.ignored[lUser] && !document.userIsOwner(userTag)) return;
	var didCommand = false;
	if(toks[0]=="HTB")
	switch(toks[1].toLowerCase()) {
		case "wassup":
		case "hiya":
		case "hello":
		case "yo":
		case "sup":
		case "hi":
			didCommand = true;
			document.sendMessage('Hi ' + user + '!');
			break;
		case "appeal":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[2] + ': ';
			document.sayBanAppeal(t);
			break;
		case "hacker":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[2] + ': ';
			document.sayHackerReport(t);
			break;
		case "bug":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[2] + ': ';
			document.sayBugReport(t);
			break;
		case "reddit":
			didCommand = true;
			document.sayReddit();
			break;
		case "?":
		case "help":
		case "about":
			didCommand = true;
			document.sendMessage('Hello! I\'m a sassy scriptbot written by Navarr and given attitude by HumusTheWalls with the intention of brightening this shoutbox. You can read Navarr\'s sourcecode at [url=https://gist.github.com/4528369]github[/url]!');
		case "commands":
			didCommand = true;
			document.sendMessage(user + ': I\'m fluent in the following phrases: about, commands, appeal, hacker, bug, email, stuck, color, reddit, plugdj');
			break;
		case "email":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[2] + ': ';
			document.sayEmail(t);
			break;
		case "color":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[2] + ': ';
			document.sayColor(t);
			break;
		case "stuck":
			didCommand = true;
			var t = '';
			if(toks.length > 2) var t = toks[2] + ': ';
			document.sayStuck(t);
			break;
		case "time":
			didCommand = true;
			var d = new Date;
			document.sendMessage(user + ': It\'s ' + d.getHours() + ':' + d.getMinutes() + '.');
			break;
		case "plugdj":
			didCommand = true;
			document.sayPlugDj();
			break;
		case "ping":
			didCommand = true;
			document.sayPing();
			break;
		case "silence":
		case "shutup":
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
			document.sendMessage('wakes from his slumber.');
			}
			break;
		case "sleep":
			if(document.userIsOwner(userTag)) {
				document.botSleeping = true;
				document.sendMessage('is entering a deep sleep. zZzZz');
			}
			break;
		case "wake":
			if(document.userIsOwner(userTag)) {
				document.botSleeping = false;
				document.sendMessage('wakes groggily from his slumber.');
			}
			break;
		case "ignore":
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
				document.ignored[u.toLowerCase()] = true;
				document.sendMessage(u + ' is a ninny-maumfer and I don\'t listen to them anymore.');
			} else {
				document.sendMessage('No. No, no, no. You can\'t go banning me all willy-nilly.');
			}
			break;
		case "unignore":
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
			document.ignored[u.toLowerCase()] = false;
			document.sendMessage(u + ' may be more interesting than I thought, and I will be listening to them again.');
			break;
		case "permission":
			didCommand = true;
			if(!document.userIsOwner()) {
			document.sendMessage('I\'m sorry, ' + user + ', I can\'t let you do that.');
			break;
			}
			if(toks.length < 3) {
			document.sendMessage('Silly man, I need a name to work with here.');
			break;
			}
			if(toks.length < 4) {
			document.sendMessage('What do you want me to do about ' + toks[2] + '?');
			break;
			}
			if(toks[3] == 'false' && manualPermission[toks[2]] == true) {
			document.manualPermission[toks[2].toLowerCase()] = false;
			document.sendMessage(toks[2] + ' has been removed from my trusted circle.');
			}
			if(toks[3] == 'true' /*&& manualPermission[toks[2]] != true*/) {
			document.manualPermission[toks[2].toLowerCase()] = true;
			document.sendMessage(toks[2] + ' may now speak to me as an equal.');
			}
			
		case "love":
		case "heart":
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
	
	if(msg.search(/thanks HTB/i) != -1)
	document.sendMessage('You\'re very welcome, ' + user + '.');
	 
	// Clear Variables
	nToks = toks = u = d = msg = lUser = user = type = null;
	};
alert('HumusTheBot is awake and bored.');
