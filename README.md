# Technologies
This is an app that uses HTML5, CSS3, and AngularJS. NodeJS was also used to help manage NPM modules and facilitate the use of Gulp as a build tool.

# Helpful Info
For quick reference, all of the application's code is conveniently located inside of the client folder. The app's `index.html` is located at the root of the client folder. 

The fully concatenated `main.js` file is located within the dist folder. All css and scss can be found within their appropriately named folders inside of the styles folder.

Due to privacy issues Chrome will disallow the tracking of user location when the request is not being made by a website so I had to run a Node server. There are two versions of the `index.html`: The `index.html` that works when a Node server is running and a `index_nonode.html` that is slightly adjusted to load the right files when Node is not being used. 

The `index_nonode.html` has its default location set to some place in Australia.