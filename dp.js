
const pattern1 = "https://www.youtube.com/*";

const filter = {
    urls: [pattern1]
}
var x1="";
var x2="";
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then(checktilt);
    function checktilt(settings) {
        if(settings.polymer==false){
            if(!changeInfo.url){
                return;
            }
            x=tab.url;
        
            if(x!=x1 && x.includes("watch") && !x.includes("disable_polymer") && x!=x2){
                browser.tabs.update({url: x+"&disable_polymer=true"});
                x1=x+"&disable_polymer=true";
                x2=x;
            }
        }
    }
}, filter);