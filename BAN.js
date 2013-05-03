
var useChannel = "";	//使うチャンネル


function event::onChannelText(prefix, channel, text) {
	if(channel != useChannel){return;}
	
	if(channel == useChannel) {
		if(text.match(/^!911$/i)) {
			BAN(prefix, channel, text);
			return;
		}
	}
}

function BAN(prefix, channel, text) {
	var reg;
	
	prefix.address.match(/^(.*)$/i);
	var userinfo = RegExp.$1;
	log(userinfo);
	var usernick = prefix.nick;
	userinfo = "+b *!*@" + userinfo;
	mode(channel, userinfo);
	userinfo = "+k " + usernick;
	mode(channel, userinfo);
	return;
}