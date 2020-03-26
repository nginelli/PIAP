const Meyda = require("meyda");
const p5 = require("p5");
const dat = require("dat.gui");

let lastFeatures; 

function prepareMicrophone(callback) {
    navigator.mediaDevices.getUserMedia({audio:true, video:false}).then((stream) => {

        const context = new AudioContext();

        const source = context.createMediaStreamSource(stream);

        callback(context, source);
    });
}

prepareMicrophone((context, source) => {
    let newBlock = document.createElement("h1");
    newBlock.innerHTML = "Microphone on!";
    document.body.appendChild(newBlock);   

    const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: context, 
        source: source,
        bufferSize: 2048,
        featureExtractors: ["loudness", "chroma"],
        callback: (features) => {
            lastFeatures = features;
            //passes features to lastFeatures which is global
        }
    });
    analyzer.start();
});

// p5
const basicDrawing = (p) => {


    p.setup = () => {
        p.createCanvas(700, 400);
        p.background(10, 255, 10);
    };
    p.draw = () => {
        p.colorMode(p.RGB, 255);
        p.background(255, 255, 255);
        if (lastFeatures){
        
        p.noFill();
        // specific will be an array of 24 values 
        lastFeatures.loudness.specific.forEach((loudness, i) =>{
            const radius = loudness * 100;
            p.colorMode(p.HSB, 255);
            p.strokeWeight(6);
            const hue = 255 * i / lastFeatures.loudness.specific.length;
            p.stroke(hue, 255, 255, 100);
            p.ellipse(p.width / 2, p.height / 2, radius, radius);
        }); 

        }
    }
};

const chromaDrawing = (p) => {
        //object that dat.gui refers to 
        const params = {
            scale: 200
        };
        const gui = new dat.GUI();
        gui.add(params, "scale", 0, 400);

    p.setup = () => {
        p.createCanvas(700, 400);
        p.background(10, 255, 10);
    };
    p.draw = () => {
        p.colorMode(p.RGB, 255);
        p.background(255, 255, 255);
        if (lastFeatures){
            
            lastFeatures.chroma.forEach((c, i) => {
                const angle = Math.PI * 2 * i / lastFeatures.chroma.length;
                const angleWidth = (2 * Math.PI) / lastFeatures.chroma.length;
                const radius = c * params.scale;
                // const radius = c * 200;
                const hue = 255 * i / lastFeatures.chroma.length;
                // const hue = 255 * c / lastFeatures.chroma.length;
                p.colorMode(p.HSB, 255);
                p.fill(hue, 255, 255);
                p.arc(p.width / 2, p.height / 2, radius, radius, angle, angle + angleWidth);
            });


        }
    }
};

// const myp5 = new p5(basicDrawing, "main");
const myp5 = new p5(chromaDrawing, "main");