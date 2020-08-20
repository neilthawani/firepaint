// https://codepen.io/yananas/pen/rwvZvY
// display the lines/drawing - DONE
// add an eraser: - DONE
  // Different-sized erasers - DONE
// bonus: sync with firebase for CRDT functionality
// bonus: Add other tools like colors, highlighting, photos, or something else! - DONE
// bonus: draw bezier curves
// share the repo with jobs@classkick.com and pro@classkick.com
// email this doc to jobs@classkick.com
// https://docs.google.com/document/d/1oZMvdSoxhI4Ui_xGcbve5qKTcMTdor159stq_Rt9_ZY/edit#heading=h.jd7duor6jz70

var currentSize = 24;

document.addEventListener("DOMContentLoaded", function() {
    // initialization
    var isMouseDown = false;

    var body = document.getElementsByTagName("body")[0];

    var pencilButton = document.getElementById("pencil");
    var eraserButton = document.getElementById("eraser");

    var canvas = document.getElementById('canvas');
    var canvasContainer = document.getElementsByClassName("canvas-container")[0];
    var ctx = canvas.getContext('2d');

    var linesArray = [];
    var currentColor = "black";
    var currentBg = "white";

    createCanvas();

    // pencil button selection event handler
    pencilButton.addEventListener("click", function() {
        currentColor = document.getElementById('draw-colorpicker').value;
        eraserButton.classList.remove("active");
        canvas.classList.remove("eraser");
        this.classList.add("active");
        canvas.classList.add("pencil");
    });

    // eraser button selection event handler
    eraserButton.addEventListener("click", function() {
        currentColor = currentBg;
        pencilButton.classList.remove("active");
        canvas.classList.remove("pencil");
        this.classList.add("active");
        canvas.classList.add("eraser");
    });

    // drawing/erasing event handlers
    canvas.addEventListener('mousedown', function(evt) {
        var mousePos = getMouseCoords(canvas, evt);
        isMouseDown = true
        var currentPosition = getMouseCoords(canvas, evt);
        ctx.moveTo(currentPosition.x, currentPosition.y)
        ctx.beginPath();
        ctx.lineWidth = currentSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = this.classList.contains("eraser") ? currentBg : currentColor;
    });

    canvas.addEventListener('mousemove', function(evt) {
        if (isMouseDown) {
            var currentPosition = getMouseCoords(canvas, evt);
            ctx.lineTo(currentPosition.x, currentPosition.y)
            ctx.stroke();

            storeDrawData(currentPosition.x, currentPosition.y, currentSize, currentColor, this.classList.contains("eraser"));
        }
    });

    canvas.addEventListener('mouseup', function(evt) {
        isMouseDown = false
        storeDrawData();
    });

    // foreground color change event handler
    document.getElementById('draw-colorpicker').addEventListener('change', function() {
        currentColor = this.value;
    });

    // background color change event handler
    document.getElementById('background-colorpicker').addEventListener('change', function() {
        ctx.fillStyle = this.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        currentBg = this.value;
        redraw();
    });

    function createCanvas() {
        ctx.fillStyle = currentBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvasContainer.appendChild(canvas);
    }

    function redraw() {
        for (var i = 1; i < linesArray.length; i++) {
            ctx.beginPath();
            ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
            ctx.lineWidth = linesArray[i].size;
            ctx.lineCap = "round";
            ctx.strokeStyle = linesArray[i].isErasing ? currentBg : linesArray[i].color;
            ctx.lineTo(linesArray[i].x, linesArray[i].y);
            ctx.stroke();
        }
    }

    function getMouseCoords(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }


    function storeDrawData(x, y, size, color, isErasing) {
        var line = {
            "id": new Date().getTime(),
            "x": x,
            "y": y,
            "size": size,
            "color": color,
            "isErasing": isErasing
        }
        linesArray.push(line);
    }
});

function changeSize(context, size) {
    var changeSizeButtons = document.getElementsByClassName("change-size");

    for (var i = 0; i < changeSizeButtons.length; i++) {
        var button = changeSizeButtons[i];

        if (button.classList.contains("active")) {
             button.classList.remove("active");
             break;
        }
    }

    context.classList.add("active");
    currentSize = size;
}

// this might go in an app.js file
function init() {
      // Initialize the Firebase SDK.
      firebase.initializeApp({
        apiKey: '<API_KEY>',
        authDomain: '<PROJECT_ID>.firebaseapp.com',
        databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
        projectId: '<PROJECT_ID>',
        storageBucket: '<PROJECT_ID>.appspot.com',
        messagingSenderId: '<MESSAGING_SENDER_ID>'
      });

      // schema:
      // {
      //   "lines": [
      //     {
      //       "id": number,
      //       "x": number,
      //       "y": number,
      //       "size": number,
      //       "color": string,
      //       "isErasing": boolean
      //     }
      //   ]
      // }

      // get Firebase database reference
      var firebaseDbRef = firebase.database().ref();

      // get all the values of lines stored in the database
      var linesRef = firebaseDbRef.child('lines');
}

// Persistence layer scaffold

// accepts an array
function save(lines) {
    for (var line of lines) {
        firebase.storage()
          .ref('lines')
          .child(line.id)
          .put(line);
    }
}

function load(id) {
    firebase.storage()
      .ref(`lines/${id}`)
      .getDownloadURL()
      .then((res) => {
          console.log("data", res);
      });
}

function loadAll() {
    firebase.storage()
      .ref('lines')
      .listAll()
      .then((res) => {
          res.items.forEach((item) => {
              item.getDownloadURL().then((url) => {
                  console.log("url", url);
              });
          })
      });
}


// BUTTON EVENT HANDLERS

// document.getElementById('canvasUpdate').addEventListener('click', function() {
//     createCanvas();
//     redraw();
// });

// document.getElementById('controlSize').addEventListener('change', function() {
//     currentSize = this.value;
//     document.getElementById("showSize").innerHTML = this.value;
// });
// document.getElementById('saveToImage').addEventListener('click', function() {
//     downloadCanvas(this, 'canvas', 'masterpiece.png');
// }, false);

// document.getElementById('clear').addEventListener('click', createCanvas);
// document.getElementById('save').addEventListener('click', save);
// document.getElementById('load').addEventListener('click', load);
// document.getElementById('clearCache').addEventListener('click', function() {
//     localStorage.removeItem("savedCanvas");
//     linesArray = [];
//     console.log("Cache cleared!");
// });



// DOWNLOAD CANVAS
// function downloadCanvas(link, canvas, filename) {
//     link.href = document.getElementById(canvas).toDataURL();
//     link.download = filename;
// }

// SAVE FUNCTION
// function save() {
//     localStorage.removeItem("savedCanvas");
//     localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
//     console.log("Saved canvas!");
// }

// LOAD FUNCTION
// function load() {
//     if (localStorage.getItem("savedCanvas") != null) {
//         linesArray = JSON.parse(localStorage.savedCanvas);
//         var lines = JSON.parse(localStorage.getItem("savedCanvas"));
//         for (var i = 1; i < lines.length; i++) {
//             ctx.beginPath();
//             ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
//             ctx.lineWidth = linesArray[i].size;
//             ctx.lineCap = "round";
//             ctx.strokeStyle = linesArray[i].color;
//             ctx.lineTo(linesArray[i].x, linesArray[i].y);
//             ctx.stroke();
//         }
//         console.log("Canvas loaded.");
//     } else {
//         console.log("No canvas in memory!");
//     }
// }
