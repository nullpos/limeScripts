//////////////////////////////////////////////////////////////////
/*                                                              */
/*                                                              */
/*                      voting tools                            */
/*                                                              */
/*                                                              */
//////////////////////////////////////////////////////////////////

var useChannel = "";    // input the channel
var usern = ""          // input the nickName who can start voting
var vinfo = [];         // [vote] [質問] [選択肢1] [選択肢2]...
var result = [];
var resultop = [];
var topics = "";
var flag = 0;
var frag = false;
var voting = "";
var userlist = [];
var sel = [];



/*topic保存用NumericReply
function event::onNumericReply(number, msg ,topics) {
    if(number == 332|number == 331) {
        topics = msg.match(/\s.* /);
        log(topics);
    }
}
*/

function event::onChannelText(prefix, channel, text) {
    //使うチャンネル以外制限
    if(channel != useChannel){return;}
    //投票中フラグ判別
    if(flag == 1){
        votesys(prefix, channel, text);
        if(channel == useChannel && prefix.nick == usern) {
            if(text.match(/^stop/i)) {
                stopMethod(prefix, channel, text);
                return;
            }
        }
    } else {
        if(channel == useChannel && prefix.nick == usern) {
            if(text.match(/^vote/i)) {
                voteMethod(prefix, channel, text);
                return;
            }
        }
    }
    //多重アンケ回避
    if(channel == useChannel && prefix.nick == usern) {
        if(text.match(/^vote/i)) {
            send(channel,"同時に複数のアンケートは出来ません。");
            return;
        }
    }
}

//投票開始関数
function voteMethod(prefix, channel, text) {
    for(i=0;i<12;i++){
        sel[i] = 0;
    }
    vinfo = text.split(/[　\s]/);
    if(vinfo.length < 3 | vinfo.length > 11) {
        send(channel,"<color fuchsia>問か選択肢の数が不適です。アンケートを開始できませんでした。");
    } else {
        for(i=0;i<12;i++) {
        if (vinfo[i]){} else {
            delete vinfo[i];
            }
        }

        vsend(prefix, channel, text);
    }
}

//投票開始メッセージ通知関数
function vsend(prefix, channel, text) {
    i = 4
    while(i<12) {
    if (vinfo[i]) {
        vinfo[i] = ' ,'+ [i-1] +':'+ vinfo[i] + '';
        }
    i++
    }

    for(i=0;i<12;i++) {
    if (vinfo[i]){} else {
        vinfo[i] = "";
        }
    }

    send(channel,"<color blue>アンケートを開始しました。【問】" + vinfo[1] + "");
    send(channel,"<color red>【選択肢】1:" + vinfo[2] + ", 2:" + vinfo[3] + "" + vinfo[4] + "" + vinfo[5] + "" + vinfo[6] + "" + vinfo[7] + "" + vinfo[8] + "" + vinfo[9] + "" + vinfo[10] + "");
    flag = 1;
//  mode(channel, "+Z 10");
    topic(channel,"【問】" + vinfo[1] + "【選択肢】1:" + vinfo[2] + ", 2:" + vinfo[3] + "" + vinfo[4] + "" + vinfo[5] + "" + vinfo[6] + "" + vinfo[7] + "" + vinfo[8] + "" + vinfo[9] + "" + vinfo[10] + "");
    log("アンケートを開始しました。【問】" + vinfo[1] + "");
    log("【選択肢】1:" + vinfo[2] + ", 2:" + vinfo[3] + "" + vinfo[4] + "" + vinfo[5] + "" + vinfo[6] + "" + vinfo[7] + "" + vinfo[8] + "" + vinfo[9] + "" + vinfo[10] + "");
}

//集計関数
function votesys(prefix, channel, text){
    frag = true;
    frag = checklist(prefix);
    if (frag == true) {
        voting = text.match(/^[0-9]|^[０-９]/);
        voting = String(voting);
        if (voting) {
            switch (voting){
                case '1':
                case "１":
                    sel[1]++ ;
                    break;
                case '2':
                case "２":
                    sel[2]++ ;
                    break;
                case '3':
                case "３":
                    sel[3]++ ;
                    break;
                case '4':
                case "４":
                    sel[4]++ ;
                    break;
                case '5':
                case "５":
                    sel[5]++ ;
                    break;
                case '6':
                case "６":
                    sel[6]++ ;
                    break;
                case '7':
                case "７":
                    sel[7]++ ;
                    break;
                case '8':
                case "８":
                    sel[8]++ ;
                    break;
                case '9':
                case "９":
                    sel[9]++ ;
                    break;
                default:
                    break;
            }
        }
    }
}
//投票終了関数
function stopMethod(prefix, channel, text) {
    var i = 2;
    while(i<15){
        if(!vinfo[i]){} else {
            result[i-1] = ""+[i-1]+":"+sel[i-1]+", ";
        }
        i++
    }
    for(i=0;i<12;i++) {
        if (result[i]){} else {
            result[i]="";
        }
    }

    var i = 2;
    while(i<15){
        if(!vinfo[i]){} else {
            resultop[i-1] = ""+vinfo[i]+"－" +sel[i-1]+ "";
        }
        i++
    }
    for(i=0;i<12;i++) {
        if (resultop[i]){} else {
            resultop[i]="";
        }
    }

//  mode(channel, "-Z");
    send(channel,"アンケートを終了しました。");
    send(channel,"<color red>【選択肢】1:" + vinfo[2] + ", 2:" + vinfo[3] + "" + vinfo[4] + "" + vinfo[5] + "" + vinfo[6] + "" + vinfo[7] + "" + vinfo[8] + "" + vinfo[9] + "");
    send(channel,"<color blue>【結果】"+result[1]+""+result[2]+""+result[3]+""+result[4]+""+result[5]+""+result[6]+""+result[7]+""+result[8]+""+result[9]+"");
    log("【結果】"+result[1]+""+result[2]+""+result[3]+""+result[4]+""+result[5]+""+result[6]+""+result[7]+""+result[8]+""+result[9]+"");
    topic(channel,"【結果】1:"+resultop[1]+", 2:"+resultop[2]+""+resultop[3]+""+resultop[4]+""+resultop[5]+""+resultop[6]+""+resultop[7]+""+resultop[8]+""+resultop[9]+"");

    for (key in result) {
        delete result[key];
    }
    sel = new Array();
    userlist = new Array();
    flag = 0;

}

function checklist(prefix) {
    if (userlist.contains(prefix.address) == false) {
        userlist.push(prefix.address);
        return true;
    } else {
        return false;
    }
}

if( ! Array.prototype.contains ){
        Array.prototype.contains = function( value ){
            for(var i in this){
                if( this.hasOwnProperty(i) && this[i] === value){
                    return true;
                }
            }
            return false;
        }
}
