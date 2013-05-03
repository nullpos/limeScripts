//////////////////////////////////////////////////////////////////
/*																*/
/*																*/
/*						麻雀格闘倶楽部  tools					*/
/*																*/
/*																*/
//////////////////////////////////////////////////////////////////



var useChannel = "";//使うチャンネル
var url = "";
var randnum = 0;

function event::onChannelText(prefix, channel, text) {
	if(channel != useChannel){return;}
	
	if(channel == useChannel) {
		if(text.match(/^開$/i)) {
			open(prefix, channel, text);
			return;
		}
		if(text.match(/^閉$/i)) {
			close(prefix, channel, text);
			return;
		}
	}
}

function open(prefix, channel, text) {
	randnum = 1 + Math.floor( Math.random() * 9999 );
	url = "http://tenhou.net/0/?L" + randnum + "";
	topic(useChannel ,"ポン！チー！カン！<color red>"+ url);
	return;
}

function close(prefix, channel, text) {
	topic(useChannel ,"【本日閉店】");
	return;
}