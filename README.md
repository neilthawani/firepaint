# Firepaint

This a painting app built using HTML, CSS, and JavaScript.

To run in development, clone this repository and run:

```
npm install
npm start
```

`scripts.js` has the base logic for the app's painting functionality - drawing, erasing, choosing foreground and background colors and paintbrush/eraser sizes.

At the bottom of the file is scaffold code for integrating a persistence layer into the app using Firebase or another BaaS. To make this work, you'll need to create a Firebase account, configure the `<KEY>`s at the bottom of `scripts.js`, and add HTML template code to connect to the saving and loading methods in `scripts.js`.
