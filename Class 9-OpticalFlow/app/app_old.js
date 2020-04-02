// Your program here
const p5 = require("p5");
const p5flow = (p) => {

    let video; 

    p.setup = () => {
        p.createCanvas(600,400);
        p.background(0);
        video = p.createCapture({
            video: {
                width: p.width,
                height: p.height
            }
        });
        video.hide();
    }

    p.draw = () => {
        p.image(video, 0, 0);
    }
}

const myp5 = new p5(p5flow, "main")