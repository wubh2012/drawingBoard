var log = console.log.bind(console)

var mycanvas = document.querySelector('#mycanvas')
var ctx = mycanvas.getContext('2d')
var earserEnable = false
var currenPenColor = 'black'

var drawLine = function (x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = 5
    ctx.strokeStyle = currenPenColor
    // 先 closePath 方法闭合，然后调用 stroke, 这样画出的线就不会有很多的毛边
    ctx.closePath()
    ctx.stroke()
}

var eraserArea = function (x, y) {
    var rectregion = 10
    var halfregion = rectregion / 2
    ctx.clearRect(x - halfregion, y - halfregion, rectregion, rectregion)
}

var listenerCanvas = function (canvas) {
    var isMoveing = false
    var lastPoint = {
        x: undefined,
        y: undefined,
    }
    var headY = 110
    var handlestart = function (x, y) {

        isMoveing = true
        lastPoint = {
            x: x,
            y: y,
        }
    }
    var handlemove = function (newPoint) {
        if (!isMoveing) {
            return
        }
        if (earserEnable) {
            // 擦除
            eraserArea(lastPoint.x, lastPoint.y)
        } else {
            // 画线
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        }
        lastPoint = newPoint
    }
    var handleend = function () {
        isMoveing = false
    }
    if (document.ontouchstart === undefined) {
        log('当前是PC端模式')
        canvas.onmousedown = function (event) {
            var x = event.clientX
            var y = event.clientY - headY
            log('mousedown', x, y, event)
            handlestart(x, y)
        }

        canvas.onmousemove = function (event) {
            var x = event.clientX
            var y = event.clientY - headY
            var newPoint = {
                x: x,
                y: y,
            }
            handlemove(newPoint)
        }

        canvas.onmouseup = handleend
    } else {
        log('当前是移动端模式')
        canvas.ontouchstart = function (touchevent) {
            var x = touchevent.touches[0].clientX
            var y = touchevent.touches[0].clientY
            handlestart(x, y)
        }
        canvas.ontouchmove = function (touchevent) {
            var x = touchevent.touches[0].clientX
            var y = touchevent.touches[0].clientY
            var newPoint = {
                x: x,
                y: y,
            }
            handlemove(newPoint)
        }
        canvas.ontouchend = handleend
    }

}

var listenerActions = function () {
    var earserButton = document.querySelector('.eraser')
    var brushButton = document.querySelector('.brush')
    earserButton.addEventListener('click', function () {
        earserEnable = true
    })
    brushButton.addEventListener('click', function () {
        earserEnable = false
    })

    var clearButton = document.querySelector('.clearCanvas')
    clearButton.addEventListener('click', function(){
        ctx.clearRect(0, 0, mycanvas.width, mycanvas.height)
    })

    var saveButton = document.querySelector('.saveCanvas')
    saveButton.addEventListener('click', function(){
        
    })

    var penColors = document.querySelector('.colors')
    penColors.addEventListener('click', function(event){
        // log('colors', event)
        var target = event.target
        var color = target.dataset.color
        // log('target color', color)
        currenPenColor = color

        var targetChild = target.parentElement.children
        log('父节点的所有子节点', targetChild)
        for (var i = 0; i < targetChild.length; i++) {
            targetChild[i].classList.remove('selected')
        }
        target.classList.add('selected')


    })



}

var autoSetCanvasSize = function (canvas) {
    var setCanvasSize = function () {
        var width = document.documentElement.clientWidth
        var height = document.documentElement.clientHeight
        log(`当前页面 width: ${width}, height: ${height}`)
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