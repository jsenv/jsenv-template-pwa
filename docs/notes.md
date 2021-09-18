## An old explanation about splashscreen

Explanation of this HTML file and why it's the way it is

First thing user sees is the HTML in this file. If HTML was empty,
user would see a blank page. To have something better to show, there is
inline HTML, CSS and JS to immediatly display something called "splashscreen".

splashscreen has several reponsabilities:

1. Be the first thing a user see
2. Load the main js file from network (boot/boot.js)
3. When loading main js takes times, invite user to wait
4. When loading fails (due to a network error), display an error message
5. When main js file throws, display an error message

As splashscreen is inline it is displayed instantly to the user.
As it is inlined, splashscreen should be small and simple.
This project enrich the splashscreen inside boot/boot.js to provide a
better loading experience.

From user point of view it goes like this:

1. splashscreen is immediatly displayed
2. Very shortly after JS and CSS improves the loading experience (when app_loader.js executes)
3. splashscreen fades away and website is displayed (when app.js is executed by app_loader.js)
