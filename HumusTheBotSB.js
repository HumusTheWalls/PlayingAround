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
 
document.botHasPermission = function(userTag) {
	if(userTag.text().toLowerCase() == 'humusthewalls') return true;
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
			if(toks.length > 1) var t = toks[2] + ': ';
			document.sendMessage(t + 'Talking about ban appeals in chat upsets our overlords. Please don\'t incur their firey wrath. Read this to discover how to avoid their wrath: http://shotbow.net/forum/threads/23560/');
			break;
		case "reddit":
			didCommand = true;
			document.sendMessage('Have you seen [url=http://reddit.com/r/minez]our awesome subreddit at http://reddit.com/r/minez[/url]?');
			break;
		case "&about":
			didCommand = true;
			document.sendMessage('Hello! I\'m a sassy scriptbot written by Navarr and given attitude by HumusTheWalls with the intention of brightening this shoutbox. You can read Navarr\'s sourcecode at [url=https://gist.github.com/4528369]github[/url]!');
			break;
		case "&email":
			didCommand = true;
			var t = '';
			if(toks.length > 1) var t = toks[2] + ': ';
			document.sendMessage(t + 'I and my colleagues here are just too lame to help you directly. You\'ll need to email a mod to get further help. [noparse]minezmod@gmail.com[/noparse]');
			break;
		case "&time":
			didCommand = true;
			var d = new Date;
			document.sendMessage(user + ': It\'s ' + d.getHours() + ':' + d.getMinutes() + '.');
			break;
		case "&commands":
			didCommand = true;
			document.sendMessage(user + ': I\'m fluent in the following phrases: &about, &appeal, &email, &reddit, &ping, &mute, &unmute, &ban, &unban');
			break;
		case "&ping":
			didCommand = true;
			document.sendMessage('!pong');
			break;
		case "&mute":
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
		case "&unmute":
			didCommand = true;
			if(!document.botMuted) {
			document.sendMessage('Hey! I\'m right here!');
			} else if(document.botHasPermission(userTag)) {
			document.botMuted = false;
			document.sendMessage('/me wakes from his slumber.');
			}
			break;
		case "&ban":
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
			var u = nToks.join(" ");
			document.banned[u.toLowerCase()] = true;
			document.sendMessage(u + ' is a ninny-maumfer and I don\'t listen to them anymore.');
			break;
		case "&unban":
			didCommand = true;
			if(!document.botHasPermission(userTag)) {
			document.sendMessage(user + ': You\'re not important enough to do this.T');
			break;
			}
			if(toks.length < 3) {
			document.sendMessage(user + ': I don\'t know who you\'re talking about. Please include the user\'s name.');
			break;
			}
			var nToks = toks;
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
