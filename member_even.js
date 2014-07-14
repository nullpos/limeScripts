/////////////////////////////////////////////////////////////////////

var interval = 5 * 60 * 1000;	//何分間隔で実行するか
var cha1 = "";	//使うチャンネル1
var cha2 = "";	//使うチャンネル2
var memb1 = 0;
var memb2 = 0;

/////////////////////////////////////////////////////////////////////

function setNextTimer(){
	var now = new Date().getTime();
	var next = (Math.floor(now / interval) +1) * interval;
	setTimeout(maxmen, next - now);
}

function getmen(){
	memb1 = findChannel(cha1).members.length;
	memb2 = findChannel(cha2).members.length;
	main_memb = Math.floor((memb1 + memb2)/2+50);
}

function maxmen(){
	getmen();
	if (main_memb<=1499) mode(cha1, "+l "+main_memb);
	setNextTimer();
}

function getstatus(){
	
}
/////////////////////////////////////////////////////////////////////

function event::onLoad(){
	setNextTimer();
}

function event::onModeChange(prefix, channel, mode, param){
	if (mode == "+l" && channel == cha1){
		maxmen();
	}
}

/////////////////////////////////////////////////////////////////////
