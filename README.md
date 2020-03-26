# Pro-Ductivity
A productivity addon for Firefox.
Once you install the extension in your browser, you'll notice it's icon in the toolbar. On clicking this, it opens a small window where you can set the time that you want to spend on the tab. Once this time is over,  the extension notifies you, tilts the page and effectively prevents you from spending further time on it.
Built with JavaScript, HTML and CSS.

### The Extension
Consists of:
- A background script "timer.js"
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

### Challenges
This was my first browser extension and it took me a while to get the hang of it. 
 
### The Road Ahead
I plan on putting it on https://addons.mozilla.org/ and making it compatible with Chrome.

### Helpful Links
These links are quite useful if you want to build your own extensions:

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension
This link is especially useful if you want your extension to have a browser popup or a content script.

This is the documentation for Firefox JavaScript APIs:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions

Mozilla example extensions:
https://github.com/mdn/webextensions-examples