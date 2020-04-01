const Meyda = require("meyda");
const p5 = require("p5");
const dat = require("dat.gui");

let lastFeatures; 
let theShader;
let cam;


function prepareMicrophone(callback) {
    navigator.mediaDevices.getUserMedia({audio:true, video:false}).then((stream) => {

        const context = new AudioContext();

        const source = context.createMediaStreamSource(stream);

        callback(context, source);
    });
}

prepareMicrophone((context, source) => {
    // let newBlock = document.createElement("h1");
    // newBlock.innerHTML = "Microphone on!";
    // document.body.appendChild(newBlock);   

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
const GLDrawing = (p) => {

        //object that dat.gui refers to 
        const params = {
            scale: 90,
            background: 0,
        };
        const gui = new dat.GUI();
        gui.add(params, "scale", 0, 500);
        gui.add(params, "background", 0, 255);

    p.preload = () => {
            // load the shader
            theShader = loadShader('assets/webcam.vert', 'assets/webcam.frag');
    };

    p.setup = () => {
        p.createCanvas(p.displayWidth, p.displayHeight, p.WEBGL);
        p.background(10, 255, 10);
        p.directionalLight(125, 125, 125, 0, 5, 8);

        cam = p.createCapture(p.VIDEO);
        cam.size(710, 400);
     
        cam.hide();
    };
    
    p.draw = () => {
        p.colorMode(p.HSB, 255);
        p.background(params.background, 255, params.background);
        shader(theShader);
              
        if (lastFeatures){

        lastFeatures.loudness.specific.forEach((loudness, i) =>{

            const radius = loudness * params.scale;

            p.rotateX(p.frameCount * 0.01);
            p.rotateY(p.frameCount * 0.01);
            // p.rotateY(p.mouseY * 0.01);

            p.sphere(radius, 5, 100);
            // p.normalMaterial();     

        });


        

        }
    }
};

const myp5 = new p5(GLDrawing, "main");