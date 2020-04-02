// https://kylemcdonald.github.io/cv-examples/

const FlowCalculator = require("./flow");
const Graph = require("./Graph");
const p5 = require("p5");
const Particle = require("./particle")

var capture; 
var previousPixels;
var flow;
var w = 640,
    h = 480;
var step = 8;
let particles =[];

var uMotionGraph, vMotionGraph;

const p5flow = (p) => {

    p.setup = () => {
        p.createCanvas(w, h);
        capture = p.createCapture({
            audio: false,
            video: {
                width: w,
                height: h
            }
        }, function() {
            console.log('capture ready.')
        });
        capture.elt.setAttribute('playsinline', '');
        capture.hide();
        flow = new FlowCalculator(step);
        uMotionGraph = new Graph(100, -step / 2, +step / 2);
        vMotionGraph = new Graph(100, -step / 2, +step / 2);
    }

    function copyImage(src, dst) {
        var n = src.length;
        if (!dst || dst.length != n) dst = new src.constructor(n);
        while (n--) dst[n] = src[n];
        return dst;
    }

    function same(a1, a2, stride, n) {
        for (var i = 0; i < n; i += stride) {
            if (a1[i] != a2[i]) {
                return false;
            }
        }
        return true;
    }

    p.draw = () => {
        const width = p.width; 
        const height = p.height; 

        capture.loadPixels();
        if (capture.pixels.length > 0) {
            if (previousPixels) {

                // cheap way to ignore duplicate frames
                if (same(previousPixels, capture.pixels, 4, width)) {
                    return;
                }

                flow.calculate(previousPixels, capture.pixels, capture.width, capture.height);
            }
            previousPixels = copyImage(capture.pixels, previousPixels);
            p.image(capture, 0, 0, w, h);

            if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
                uMotionGraph.addSample(flow.flow.u);
                vMotionGraph.addSample(flow.flow.v);

                p.strokeWeight(2);
                flow.flow.zones.forEach(function(zone) {
                    p.stroke(p.map(zone.u, -step, +step, 0, 255),
                        p.map(zone.v, -step, +step, 0, 255), 128);
                    // p.line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v);

                    const speed = Math.sqrt(zone.u * zone.u * zone.v * zone.v);
                    if (speed > 10) {
                        particles.push( new Particle (zone.x, zone.y, zone.u, zone.v));
                    }
                })
            }
            particles.forEach(part => {
                part.draw(p);
            });
            particles.forEach(part => {
                part.update();
            });
            particles = particles.filter(part => {
                return !part.isOutOfBounds(p.width, p.height);
            });

            //return not in bounds only
    
            p.noFill();
            p.stroke(255);

            // ADDED THE P ARGUMENT
            
            // draw left-right motion
            // uMotionGraph.draw(p, width, height / 2);
            // p.line(0, height / 4, width, height / 4);

            // // draw up-down motion
            // p.translate(0, height / 2);
            // vMotionGraph.draw(p, width, height / 2);
            // p.line(0, height / 4, width, height / 4);
        }
    }
}

const myp5 = new p5(p5flow, "main")