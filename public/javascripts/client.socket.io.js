//Client
var server_name = "http://127.0.0.1:3000/";
var socket = io.connect(server_name);

(jQuery) (function($) {
    jQuery(function ($) {
    //on reception of message from 'server'
    socket.on('ss-tweet', function (data) {
    	
    var element1 = document.getElementById("total");		//front-end element for total tweets
    element1.innerHTML = data.total;
    var element2 = document.getElementById("love");			//front-end element for love %
    element2.innerHTML = data.love;
    var element3 = document.getElementById("hate");			//front-end element for hate %
    element3.innerHTML = data.hate;    
    var element4 = document.getElementById("lovetweets");	//front-end element for love tweetlist
 	var lovelist = document.createElement("lovelist");		//front-end element for first child tweet in lovelist
 	var element5 = document.getElementById("hatetweets");	//front-end element for hate tweetlist
	var hatelist = document.createElement("hatelist");		//front-end element for first child tweet in hatelist
	var element6 = document.getElementById("verdict");		//front-end element for final verdict
	
	//love % is more than hate %---> Love Wins
	if(data.love > data.hate) {
		element6.innerHTML = 'Love Wins';
	}
	//hate % is more than love %---> Love Lost
	else if(data.love < data.hate) {
		element6.innerHTML = 'Love Lost';
	}
	else {
		element6.innerHTML = 'It is a tie!';
	}
	
	//create the tweetlist for tweets containing love/hate words
    if(data.text.indexOf('love') > -1) {
    	
        lovelist.innerHTML = '<li>' + data.user.bold() + ': ' + data.text + '</li>';
        element4.insertBefore(lovelist, element4.firstChild);
    }
    else if(data.text.indexOf('hate') > -1) {
    	
        hatelist.innerHTML = '<li>' + data.user.bold() + ': ' + data.text + '</li>';	
        element5.insertBefore(hatelist, element5.firstChild);
    }
});
});
});