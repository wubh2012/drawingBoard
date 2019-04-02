var log = console.log.bind(console)

var mycanvas = document.querySelector('#mycanvas')
var ctx = mycanvas.getContext('2d')
var earserEnable = false

var drawLine = function (x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.lineWidth = 5
    ctx.closePath()
}

var clearArea = function (x, y) {
    ctx.clearRect(x, y, 20, 20);
}

var listenerCanvas = function (canvas) {
    var isMoveing = false
    var lastPoint = {
        x: undefined,
        y: undefined,
    }
    canvas.onmousedown = function (event) {
        log('mouse down', event)
        isMoveing = true
        var x = event.x
        var y = event.y
        lastPoint = {
            x: x,
            y: y,
        }
    }

    canvas.onmousemove = function (event) {
        if (!isMoveing) {
            return
        }
        var x = event.x
        var y = event.y
        var newPoint = {
            x: x,
            y: y,
        }
        if (earserEnable) {
            // 擦除
            clearArea(lastPoint.x, lastPoint.y)
        } else {
            // 画线
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        }
        lastPoint = newPoint

    }

    canvas.onmouseup = function (event) {
        isMoveing = false
    }

}

var listenerActions = function () {
    var earserButton = document.querySelector('.eraser')
    var brushButton = document.querySelector('.brush')
    var actionsContainer = document.querySelector('.actions')
    earserButton.addEventListener('click', function () {
        earserEnable = true
        actionsContainer.classList.add('x')
    })
    brushButton.addEventListener('click', function () {
        earserEnable = false
        actionsContainer.classList.remove('x')
    })
}

var autoSetCanvasSize = function (canvas) {
    var setCanvasSize = function () {
        var width = document.documentElement.clientWidth
        var height = document.documentElement.clientHeight
        log(`width: ${width}, height: ${height}`)
        canvas.width = width
        canvas.height = height
    }
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }
}

var __main = function () {
    autoSetCanvasSize(mycanvas)
    listenerCanvas(mycanvas)
    listenerActions()
}

__main()