var log = console.log.bind(console)

var mycanvas = document.querySelector('#mycanvas')
var ctx = mycanvas.getContext('2d')

var isMoveing = false
var lastPoint = {
    x: undefined,
    y: undefined
}

mycanvas.onmousedown = function (event) {
    log('mouse down', event)
    isMoveing = true
    var x = event.x
    var y = event.y
    lastPoint = {
        x: x,
        y: y
    }
}

mycanvas.onmousemove = function (event) {
    if (isMoveing) {
        log('mouse move', event)
        var x = event.x
        var y = event.y
        var newPoint = {
            x: x,
            y: y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
    }
}

mycanvas.onmouseup = function (event) {
    isMoveing = false
    log('mouse up', event)
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.lineWidth = 5
    ctx.closePath()
}