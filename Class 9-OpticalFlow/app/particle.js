//classes are a convenient way to bundle together a state and options on top of that

module.exports = class Particle {
    constructor(x, y, vx, vy){
        //always points back to object that called that function
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 1;
        //adds gravity
    }

    draw(p) {
        //push and pop makes it so these dont effect the rest of the draws
        p.push();
        p.strokeWeight(0);
        p.fill(255);
        p.ellipse(this.x, this.y, 2, 2);
        p.pop();
    }

    isOutOfBounds(width, height) {
        return this.x < 0 ||
            this.x > width ||
            this.y < 0 ||
            this.y > height;
    }
}

// const p = new Particle (0, 0, 1, 1);
// p.x // will be 0 
// p.vx // will be 1 