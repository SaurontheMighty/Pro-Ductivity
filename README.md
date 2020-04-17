# Pro-Ductivity
A productivity extension for Firefox and Chrome. In order to fully utilize the features of this extension, open up the options menu(click on the settings icon on the top right of the popup) and customize it to your needs.

What does it do?
This extension increases your productivity by allowing you to set a timer for the amount of time you want to spend on a tab, once this time is up, the page will be "warped"- tilted by default at 20 degrees with a default border of 5px. The amount of tilt and the border on the page is completely customizable and can be set to zero if you just want to use it as a timer. If you decide that you need to spend more time on the page, you can press the "u" in the title of the popup(ductivityPRO) and it will restore the page without losing any progress.

If you're using this to time the amount of time on a site you know you find hard to close, and the temptation to undo the tilt will be too great you can always go into the preferences menu and check "Close tab on alarm ring". This will automatically close the tab once the alarm rings.

If you plan on using this for YouTube you can choose to enable the "disable polymer" from the options menu. This feature will revert all YouTube video pages to the old design(for the video pages the difference in design is minimal). This allows you to still be able to go into fullscreen mode once the alarm has rung. With YouTube's new(relatively) polymer design this is not possible. The disable polymer feature only disables the polymer for the page with the YouTube video and not the home page. This is because its purpose is to allow you to go into fullscreen mode once the alarm has rung. There is no point in reverting the main page to the old design. However, if you are trying to curb your YouTube binge watching tendencies maybe you should leave polymer on and maybe even enable close tab on alarm ring.


### Features
1. There are no preset times, you can set any time >= 0 minutes.
2. If you're in full screen mode on YouTube or elsewhere it will automatically bring you out of it.
3. The amount of tilt of the webpage is fully customizable and can be changed from the preferences settings.
4. The width of the border is also fully customizable and can be changed from the preferences settings.
5. Even if you move between different websites in a tab the alarm will still ring and the page will still be warped.
6. You can see the amount of time left in your timer in the toolbar popup.
7. If something changes and you need to spend more time on the page, clicking the "u" in the d(u)ctivityPRO popup will undo the warp.
8. You can clear alarms after they are set from the popup.
9. Tabs can be closed on alarm ring(if you enable it from the settings).
10. The extension can disable the polymer version of YouTube for videos. This is because with the new polymer version of youtube you can't go into full screen mode once the alarm rings. So if you're using this to curb your binge watching tendencies you can just leave polymer mode on. Otherwise you can disable it in the options menu. It doesn’t disable it for the main menu because it’s easier to navigate with the new polymer design and looks much better, it only disables polymer for the actual page with the video.


### The Extension
Consists of:
- A background script "timer.js"
- A second background script "dp.js"
- A content script "ringring.js"
- Another content script "undo.js"
- A popup
  - The HTML of the popup "pro.html"
  - The CSS of the popup "pro.css"
  - The JavaScript of the popup "pro.js"
- An options page
  - The HTML of the options page "options.js"
  - The CSS of the options page "options.css"
  - The JavaScript of the options page "options.js"
  

### How it works
When you click "Set Timer" the extension calls a function in the background script "timer.js" and passes the time set by the user into it. Once this time is up timer.js sends a message to the content script "ringring.js" and asks it to warp the page. If the user presses the "u" in d-->u<--ctivityPRO the extension calls the undo content script and returns the page to normal. The options page is activated by the settings icon in the top right of the popup. This page allows the user to customize the amount of tilt and the width of the border when the alarm rings and the page is warped.

In the options page, the user can also diable polymer, this means that the extension will now run dp.js everytime it encounters you watching a video on YouTube. The reason is that with the polymer design of YouTube, you can no longer watch videos in full screen mode once the alarm has rung. This is useful for those who are using this extension to curb their binge watching tendencies but not necessarily for others. Initially once this mode was activated in the preferences the extension also reverted YouTube's main page to the old design but I thought that this was unnecessary and the difference in design is also much more apparent in the home page. 

### Challenges
This was my first browser extension and it took me a while to get the hang of it. 
 

### The Road Ahead
It's on AMO: https://addons.mozilla.org/en-US/firefox/addon/ductivitypro/

It's on the Chrome Web Store: https://chrome.google.com/webstore/detail/ductivitypro/ldmdmicajobgfjllgmmcifkmgpohkpji