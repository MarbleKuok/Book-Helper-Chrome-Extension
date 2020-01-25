if (document.URL.includes("books.com.tw")){
	if (document.head.querySelector("[name~=description][content]")){
		var ttt=document.head.querySelector("[name~=description][content]").content.split("，");
		for (var i=0;i<ttt.length;i++){
			if(ttt[i].match("ISBN")){			
				var isbn=(ttt[i]);
			}
		}
	}else{
		isbn="null";
	}
	if (document.querySelector('h1')){
		var title = document.querySelector('h1').textContent;
	}else{
		title="null";
	}
	var msg="書名: "+title+";"+isbn+"; 網址: "+document.URL;
	console.log("BOOKTW");
	chrome.runtime.sendMessage(msg);
}else if  (document.URL.includes("amazon.cn")){
	if (document.getElementById('productTitle')) {
		var title=document.getElementById('productTitle').innerHTML;
	}else{
		title="null";
	}
	if (document.querySelector('[class=content]')) {
		var info=document.querySelector('[class=content]').innerText.split('\n');
    	for(var i=0;i<info.length;i++){
       	if (info[i].includes("ISBN")){
         	var isbn=info[i].split('ISBN:')[1];
       }
    }
	} else {
		isbn="null"
	}
	var msg="書名: "+title+"; ISBN: "+isbn+"; 網址: "+document.URL.split('/ref=')[0];
	chrome.runtime.sendMessage(msg);
}else if  (document.URL.includes("amazon.com")){
	if (document.getElementById('productTitle')) {
		var title=document.getElementById('productTitle').innerHTML;
	} else {
		title="null";
	}
	if (document.querySelector('[class=content]')) {
		var info=document.querySelector('[class=content]').innerText.split('\n');
    	for(var i=0;i<info.length;i++){
      	if (info[i].includes("ISBN-13")){
         	var isbn=info[i].split('ISBN-13:')[1];
       }
    }
	} else {
		isbn="null";
	}
	var msg="書名: "+title+"; ISBN: "+isbn+"; 網址: "+document.URL.split('/ref=')[0];
	chrome.runtime.sendMessage(msg);
	console.log(msg)
}else if (document.URL.includes("item.jd.com")){
	var msg=document.head.querySelector("[name~=keywords][content]").content;
	msg=msg+"網址:"+document.URL.split('#')[0];
	chrome.runtime.sendMessage(msg);
	console.log(msg)
}else {
	chrome.runtime.sendMessage("Copy Failed");
}






