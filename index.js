var log = console.log.bind(console)

var mycanvas = document.querySelector('#mycanvas')
var ctx = mycanvas.getContext('2d')

var isMoveing = false
var earserEnable = false
var lastPoint = {
    x: undefined,
    y: undefined,
}

setCanvasSize()

window.onresize = function(){
    setCanvasSize()
}

mycanvas.onmousedown = function (event) {
    log('mouse down', event)
    isMoveing = true
    var x = event.x
    var y = event.y
    lastPoint = {
        x: x,
        y: y,
    }
}

mycanvas.onmousemove = function (event) {
    if (isMoveing) {
        log('mouse move', event)
        var x = event.x
        var y = event.y
        var newPoint = {
            x: x,
            y: y,
        }
        if(earserEnable){
            // 擦除
            ctx.clearRect(lastPoint.x, lastPoint.y, 50, 50);
        }else{
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        }
        lastPoint = newPoint
        
    }
}

mycanvas.onmouseup = function (event) {
    isMoveing = false
    log('mouse up', event)
}


var earserButton = document.querySelector('.eraser')
var brushButton = document.querySelector('.brush')
var actionsContainer = document.querySelector('.actions')
earserButton.addEventListener('click', function(){
    earserEnable = true
    actionsContainer.classList.add('x')
})
brushButton.addEventListener('click', function(){
    earserEnable = false
    actionsContainer.classList.remove('x')

})

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.lineWidth = 5
    ctx.closePath()
}


function setCanvasSize(){
    
    var width = document.documentElement.clientWidth
    var height = document.documentElement.clientHeight
    log(`width: ${width}, height: ${height}`)
    mycanvas.width = width
    mycanvas.height = height
}