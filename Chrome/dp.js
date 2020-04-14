
const pattern1 = "https://www.youtube.com/*";

const filter = {
    urls: [pattern1]
}
var x1="";
var x2="";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.local.get('polymer', function (settings) {
        console.log('22');
        if(settings.polymer===false){
            if(!changeInfo.url){
                return;
            }
            x=tab.url;
            if(x!=x1 && x.includes("watch") && !x.includes("disable_polymer") && x!=x2){
                chrome.tabs.update(null, {url: x+"&disable_polymer=true"});
                x1=x+"&disable_polymer=true";
                x2=x;
            }
        }
    });
},filter);     
