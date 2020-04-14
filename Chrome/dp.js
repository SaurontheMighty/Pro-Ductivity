var x1="";
var x2="";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(tab.url.includes("youtube.com")){
        chrome.storage.local.get('polymer', function (settings) {
            console.log('22');
            if(settings.polymer===false){
                x=tab.url;
                if(x!=x1 && x.includes("v") && !x.includes("disable_polymer") && x!=x2){
                    chrome.tabs.update(null, {url: x+"&disable_polymer=true"});
                    x1=x+"&disable_polymer=true";
                    x2=x;
                }else if(x!=x1 && x!=x2 && !x.includes("v")){
                    chrome.tabs.update(null, {url: x+"?disable_polymer=true"});
                    x1=x+"?disable_polymer=true";
                    x2=x;
                }
            }
        });
    }
}); 