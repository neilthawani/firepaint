// https://codepen.io/yananas/pen/rwvZvY

document.addEventListener("DOMContentLoaded", function(event) {
    // initalize
    var body = document.getElementsByTagName("body")[0];
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var linesArray = [];

    var isMouseDown = false;

    currentSize = 1;

    var currentColor = "red";
    var currentBg = "white";

    // create canvas
    ctx.fillStyle = currentBg;
    console.log("create canvas, ctx.fillStyle", ctx.fillStyle);
    canvas.width = 800;
    canvas.height = 600;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // redraw();
    document.getElementsByClassName("canvas-container")[0].appendChild(canvas);

    // drawing event handlers
    canvas.addEventListener("mousedown", function(event) {
        // console.log("mousedown", this, event);
        isMouseDown = true;

        var currentPosition = getMouseCoords(this, event);
        ctx.moveTo(currentPosition.x, currentPosition.y)
        ctx.beginPath();
        ctx.lineWidth = currentSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = currentColor;
    });

    canvas.addEventListener("mousemove", function(event) {
        console.log("isMouseDown", isMouseDown);
        if (isMouseDown) {
            var currentPosition = getMouseCoords(canvas, event);
            // console.log("currentPosition", currentPosition);
            ctx.lineTo(currentPosition.x, currentPosition.y)
            ctx.stroke();
            storeData(currentPosition.x, currentPosition.y, currentSize, currentColor);
        }
    });

    function storeData(x, y, size, color) {
        var line = {
            "x": x,
            "y": y,
            "size": size,
            "color": color
        }
        linesArray.push(line);
    }

    function getMouseCoords(canvas, event) {
        var rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    canvas.addEventListener("mouseup", function(event) {
        isMouseDown = false;
    });

    // eraser event handler
    document.getElementById("eraser").addEventListener("click", function(event) {
        currentSize = 50;
        currentColor = ctx.fillStyle
        console.log("eraser currentColor", currentColor);
    });

    // change draw color
    document.getElementById("draw-colorpicker").addEventListener("change", function() {
        currentColor = this.value;
    });

    // change background color
    document.getElementById("background-colorpicker").addEventListener("change", function() {
        ctx.fillStyle = this.value;
        console.log("background-colorpicker ctx.fillStyle", ctx.fillStyle);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // redraw();
        currentBg = ctx.fillStyle;
    });
});

    // BUTTON EVENT HANDLERS

    // document.getElementById("canvasUpdate").addEventListener("click", function() {
    //     createCanvas();
    //     redraw();
    // });

    // document.getElementById("controlSize").addEventListener("change", function() {
    //     currentSize = this.value;
    //     document.getElementById("showSize").innerHTML = this.value;
    // });

    // document.getElementById("saveToImage").addEventListener("click", function() {
    //     downloadCanvas(this, "canvas", "masterpiece.png");
    // }, false);

    // document.getElementById("clear").addEventListener("click", createCanvas);
    // document.getElementById("save").addEventListener("click", save);
    // document.getElementById("load").addEventListener("click", load);
    // document.getElementById("clearCache").addEventListener("click", function() {
    //     localStorage.removeItem("savedCanvas");
    //     linesArray = [];
    //     console.log("Cache cleared!");
    // });

    // REDRAW
    function redraw() {
        for (var i = 1; i < linesArray.length; i++) {
            ctx.beginPath();
            ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
            ctx.lineWidth = linesArray[i].size;
            ctx.lineCap = "round";
            ctx.strokeStyle = linesArray[i].color;
            ctx.lineTo(linesArray[i].x, linesArray[i].y);
            ctx.stroke();
        }
    }

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

    // ERASER HANDLING

    // GET MOUSE POSITION



    // STORE DATA



    // ON MOUSE UP

    // function mouseup() {
    //     isMouseDown = false;
        // storeData()
    // }
// });

// display the lines/drawing - DONE
// add an eraser:
  // The eraser acts like a smudge eraser.
  // When a user smudges over a line in eraser mode, that erases the entire line.
  // When a user points and clicks a line, it erases.
// bonus: sync with firebase for CRDT functionality
// bonus: Add other tools like colors, highlighting, photos, or something else!
// bonus: draw bezier curves
// share the repo with jobs@classkick.com and pro@classkick.com
// email this doc to jobs@classkick.com
// https://docs.google.com/document/d/1oZMvdSoxhI4Ui_xGcbve5qKTcMTdor159stq_Rt9_ZY/edit#heading=h.jd7duor6jz70
