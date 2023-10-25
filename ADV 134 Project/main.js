HEIGHT = 500
WIDTH = 500

data = []
miniData = []
detectObj = 'No'
started = false

function modelLoaded(){console.log('Model Loaded')}

function setup(){
    canvas = createCanvas(WIDTH, HEIGHT)
    canvas.center('horizontal')
    
    video = createCapture(VIDEO)
    video.hide()
}

function start(){
    cocossd = ml5.objectDetector('cocossd', modelLoaded)
    cocossd.detect(video, gotResult)

    started = true
}
function gotResult(error, results){
    if (error){
        console.log(error)
    } 
    console.log(results)
    data = results
}

function draw(){
    image(video, 0, 0, WIDTH, HEIGHT)
    detectObj = 'Yes'
    if (started){
        detectObj = 'No'
        for (i = 0; i < data.length; i++){
            x = data[i].x - 60
            y = data[i].y
            w = data[i].width
            h = data[i].height * 0.9
            c = data[i].confidence
            l = data[i].label
            
            stroke('#3333bb')
            noFill()
            
            if (l == 'person'){
                detectObj = 'Yes'
            }

            rect(x, y, w, h)
            text(l + ' (' + (floor(c * 100)) + '%)', x + 15, y + 20)
        }
    }

    document.getElementById('detectObj').innerText = detectObj
}