import "src/pwa/pwa.js"
import { greet } from "src/greet.js"

const faviconUrl = new URL("../icons/favicon.png", import.meta.url)

document.querySelector("#app").innerHTML = `

<img src=${faviconUrl} width="64" />

<p>${greet()}</p>`

// <div id="app"> now has some content to show, hide splashscreen to let user see the app
window.splashscreen.remove()

/*

In a big project, being ready to display the page can take time. During that time user
sees the splashcreen. But, because splashscreen is inlined in the HTML it must remain
simple and should not try to provide a fancy user experience. Otherwise the code related
to splashscreen would grow a lot while being inlined.

In such project I would create a loading screen where I can provide the fancy
user experience. What would happen for a user looks like this:

1. main.html loading -> user see a blank page
2. main.html loaded -> user see splashscreen
3. browser loads main.js -> user see splashscreen
4. main.js loaded -> splashscreen replaced by loadingscreen
5. main.js loads the app -> user see loadingscreen
6. app files are loaded -> loadingscreen replaced by app ui

To make this happen, app.js should contain code that will:
1. display a loading screen
2. remove splashscreen (so that user sees the loading screen instead of splashscreen)
3. starts to load files used to display the actual application ui
4. Eventually inform user of load progression
5. display the actual ui into the page
6. remove loading screen (to let user see the actual ui)

*/
