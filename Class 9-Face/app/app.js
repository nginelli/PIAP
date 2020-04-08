const p5 = require("p5");
const Tone = require("tone");
const StartAudioContext = require("startaudiocontext");

// const synth = new Tone.Synth().toMaster();
const synth = new Tone.FMSynth().toMaster();

StartAudioContext(Tone.context);

let faceapi;
let detections;
let width = 400;
let height = 300;
let mouthWasOpen = false;
//previous state of mouth 

const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
    Mobilenetv1Model: 'models',
    FaceLandmarkModel: 'models',
    FaceRecognitionModel: 'models',
    FaceExpressionModel: 'models',
};

const p5draw = (p) => {

    let p5video;

    function drawBox(detections) {
        detections.forEach((detection) => {
            const alignedRect = detection.alignedRect;

            p.noFill();
            p.stroke(255, 255, 255);
            p.strokeWeight(2);
            p.rect(
                alignedRect._box._x,
                alignedRect._box._y,
                alignedRect._box._width,
                alignedRect._box._height,
            );
        });
    }

    function drawLandmarks(detections) {
        p.noFill();
        p.stroke(161, 95, 251)
        p.strokeWeight(2)

        for(let i = 0; i < detections.length; i++){
            const mouth = detections[i].parts.mouth; 
            const nose = detections[i].parts.nose;
            const leftEye = detections[i].parts.leftEye;
            const rightEye = detections[i].parts.rightEye;
            const rightEyeBrow = detections[i].parts.rightEyeBrow;
            const leftEyeBrow = detections[i].parts.leftEyeBrow;

            drawPart(mouth, true);
            drawPart(nose, false);
            drawPart(leftEye, true);
            drawPart(leftEyeBrow, false);
            drawPart(rightEye, true);
            drawPart(rightEyeBrow, false);

            drawLabel(mouth);

        }
    }

    function drawPart(feature, closed) {
        p.beginShape();
        for(let i = 0; i < feature.length; i++){
            const x = feature[i]._x
            const y = feature[i]._y
            p.vertex(x, y)
        }
        
        if(closed === true){
            p.endShape(p.CLOSE);
        } else {
            p.endShape();
        }
    }
    function drawLabel(feature){
        for (let i = 0; i < feature.length; i++) {
            const x = feature[i]._x
            const y = feature[i]._y

            p.textSize(9);
            p.strokeWeight(0);
            p.fill(255);
            p.text(`${i}`, x + 3, y - 3);
        }

    }

    function distance(p1, p2) {
        const dx = p1._x - p2._x;
        const dy = p1._y - p2._y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(255);

        p5video = p.createCapture(p.VIDEO);
        p5video.size(width, height);
        p5video.hide();

        faceapi = ml5.faceApi(p5video, detection_options, modelReady);
    }

    p.draw = () => {
        p.image(p5video, 0, 0, p.width, p.height);

        if (detections) {
            drawBox(detections);
            drawLandmarks(detections);

            // get the mouth feature
            // get points 14 and 18 
            // see how far apart they are

            if (detections.length > 0) {
                //first face
                const detection = detections[0];
                const mouth = detection.parts.mouth;
                const topLip = mouth[14];
                const bottomLip = mouth[18];
                const d = distance(topLip, bottomLip);
                const headWidth = detection.alignedRect._box._width;
                const normalizedDistance =  d/ headWidth;
                const threshold = 0.031;
                const isOpen = normalizedDistance > threshold;

                // if mouth was closed and is open play a note
                // if the mouth was open and is closed stop
                if (isOpen !== mouthWasOpen) {

                    if (isOpen) {
                        //play a note
                        synth.triggerAttack("C4");
                    } else {
                        //stop
                        synth.triggerRelease();
                    }
                    mouthWasOpen = isOpen;
                }
                const mouthLeft = mouth[0];
                const mouthRight = mouth[6];
                const mouthWidth = distance(mouthLeft, mouthRight);
                // mouth goes from 36 to 55
                const normalizedMouthWidth = p.map(
                    mouthWidth,
                    36,55,
                    0,1);
                    //takes range from 36 to 55 from 0 to 1
                
                synth.modulationIndex.rampTo(normalizedMouthWidth * 15);
                //specific to FMsynth

                p.textSize(14);
                p.strokeWeight(0);
                p.fill(255);
                p.textAlign(p.CENTER);
                // p.text(`Mouth is ${isOpen ? "open" : "closed"}`, p.width/ 2, p.height -10);
                p.text(`Mouth is ${mouthWidth} wide`, p.width/ 2, p.height -10);

            }
        }
    }
}

function setup() {
    const myp5 = new p5(p5draw, "main");
}

function modelReady() {
    console.log("model ready!");
    faceapi.detect(gotResults);
}

function gotResults(err, results) {
    if (err) {
        console.log(err);
        return;
    }

    detections = results;
    faceapi.detect(gotResults);
}

// Calls the setup function when the page is loaded
window.addEventListener("DOMContentLoaded", setup);
