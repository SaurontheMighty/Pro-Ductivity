# Pro-Ductivity
A productivity addon for Firefox.
Once you install the extension in your browser, you'll notice it's icon in the toolbar. On clicking this, it opens a small window where you can set the time that you want to spend on the tab. Once this time is over,  the extension notifies you, tilts the page and effectively prevents you from spending further time on it.
Built with JavaScript, HTML and CSS.

### The Extension
Consists of:
- A background script "other.js"
- A content script "ringring.js"
- A popup
  - The HTML of the popup "pro.html"
  - The CSS of the popup "pro.css"
  - The JavaScript of the popup "pro.js"
  
### How it works
When you click "Set Timer" the extension injects ringring.js into the page and passes the time you've set to other.js. Other.js runs the timer and when the times up it sends a message to ringring asking it to warp the page.

### Challenges
Building an extension for Firefox was challenging because I found that there were very few tutorials on how to build extensions for Firefox. This was also my first extension which definitely made it more challenging. It took a lot of time to build this especially because I had to learn how to build extensions on my own with no tutorials.
 
### The Road Ahead
I plan on putting it on https://addons.mozilla.org/ and making a version for Chrome.
