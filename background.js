const REQUEST_TITLE = 'copy-title-url-to-clipboard';
//const REQUEST_SELECTION = 'copy-selection-url-to-clipboard';

/* This extension creates two context menu items: one for the default case,
    and one to use when some text is selected on a web page. Only one of the
    two items is shown at a time, otherwise Firefox puts them in a submenu,
    which requires additional clicks to navigate.
*/

// support Firefox and Chrome
if (!browser) {
  var browser = chrome;
}

chrome.contextMenus.create({
    id: REQUEST_TITLE,
    title: "複製本書資料",
    contexts: ["page"],
    onclick: handleCopyRequest,
	documentUrlPatterns: ["*://www.books.com.tw/*","*://www.amazon.cn/*","*://www.amazon.com/*","*://item.jd.com/*"]
});

chrome.contextMenus.create({
    title: '在博客來搜索：%s', 
    contexts: ['selection'], 
    onclick: function(params)
    {
        chrome.tabs.create({url: 'http://search.books.com.tw/search/query/key/' + encodeURI(params.selectionText)});
    }
});

chrome.contextMenus.create({
    title: '在京東搜索：%s', 
    contexts: ['selection'],
    onclick: function(params)
    {
        chrome.tabs.create({url: 'https://search.jd.com/Search?keyword=' + encodeURI(params.selectionText)+'&enc=utf-8'});
    }
});

chrome.contextMenus.create({
    title: '在亞馬遜搜索：%s', 
    contexts: ['selection'],
    onclick: function(params)
    {
        chrome.tabs.create({url: 'https://www.amazon.cn/s/ref=nb_sb_noss_2?__mk_zh_CN=亚马逊网站&url=search-alias%3Daps&field-keywords=' + encodeURI(params.selectionText)});
    }
});

chrome.contextMenus.create({
    title: '在Amazon搜索：%s', 
    contexts: ['selection'],
    onclick: function(params)
    {
        chrome.tabs.create({url: 'https://www.amazon.com/s/ref=nb_sb_ss_c_1_5?url=search-alias%3Daps&field-keywords=' + encodeURI(params.selectionText)});
    }
});

var msg=0;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    sendResponse(JSON.stringify(request));
    msg=JSON.stringify(request);
});

function handleCopyRequest(info, tab) {
   copyToClipboard(msg);
   // var notification = new Notification("本書已複製");
   browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/book_info.png"),
    "title": "購書助手",
    "message": "本書已複制"
  });
}

function copyToClipboard(data) {
    // https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
    const copySource = document.createElement('textarea');
    copySource.textContent = data;
    document.body.appendChild(copySource);
    copySource.select();
    document.execCommand('copy');
    document.body.removeChild(copySource);
}
