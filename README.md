# Firepaint

This a painting app built using HTML, CSS, and JavaScript.

## Installation

You should have [git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/) installed before installing this app.

To run in development, [download](https://github.com/neilthawani/firepaint/archive/master.zip) or clone this repository and run the following in Powershell x86 (Windows) or Terminal (Mac/Unix):

```
npm install
npm start
```

## Documentation

`scripts.js` has the base logic for the app's painting functionality:

- choosing paintbrush/eraser sizes
- drawing
- erasing
- choosing foreground and background colors

### Future directions can include:

- a "slider" for selecting paintbrush/eraser sizes
- an improved eraser icon which shows the user what specifically is being erased
- the ability to draw straight and [curved (bezier) lines](https://www.w3schools.com/tags/canvas_beziercurveto.asp)
- undo/redo buttons
- copy or cut and paste within the canvas
- export to file formats: png, pdf

### Persistence

At the bottom of the file is scaffold code for integrating a persistence layer into the app using Firebase. To make this work, you'll need to create a Firebase account, configure the `<KEY>`s in `init()` near the bottom of `scripts.js`, and add HTML template code to `index.html` to connect to the saving and loading methods in `scripts.js`.
