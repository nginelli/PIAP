import netP5.*;
import oscP5.*;

OscP5 oscP5;
//giving us a new array list of float rectangles 
ArrayList<float []> rectangles = new ArrayList<float[]>();

synchronized void setup() {
  size(1080, 720);
  
  oscP5 = new OscP5(this, 9001);
  
  // plugs this function to the address
  oscP5.plug(this, "createRectangle", "/createRectangle");
  
  createRectangle(100.1, 100.2, 100.3, 100.3);
}

void createRectangle(float x, float y, float w, float h) {
println("we got " + x + " " + y + " " + w + " " + h);

  float[] rectangle = {x, y, w, h};
  rectangles.add(rectangle); 
}

synchronized void draw() {
  background(51);
  strokeWeight(2);
  stroke(0);
  fill(255);
  
  for (float[] rectangle: rectangles) {
    rect(rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
  }
}
