# Firepaint

This a painting app built using HTML, CSS, and JavaScript.

## Installation

To run in development, clone this repository and run:

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

### Future Directions

#### Future directions can include:

- a "slider" for selecting paintbrush/eraser sizes
- an improved eraser icon which shows the user what specifically is being erased

#### Persistence

At the bottom of the file is scaffold code for integrating a persistence layer into the app using Firebase or another BaaS. To make this work, you'll need to create a Firebase account, configure the `<KEY>`s at the bottom of `scripts.js`, and add HTML template code to connect to the saving and loading methods in `scripts.js`.
