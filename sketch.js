const scl = 20;

let snake;
let foodLoc;

function pickNewFoodLoc() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  foodLoc = createVector(floor(random(cols)), floor(random(rows)));
  foodLoc.mult(scl);
}

function setup() {
  createCanvas(600, 600);
  frameRate(10);
  pickNewFoodLoc();
  snake = new Snake();
}

function draw() {
  background(51);

  snake.update();
  snake.show();

  if (snake.eat(foodLoc)) {
    pickNewFoodLoc();
  }

  fill(255, 0, 100);
  rect(foodLoc.x, foodLoc.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  }
}



class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;

    this.total = 0;
    this.tail = [];
  }

  update() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }

    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xSpeed * scl;
    this.y += this.ySpeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);

    this.destroy();
  }

  show() {
    fill(255);
    rect(this.x, this.y, scl, scl);

    this.tail.forEach(t => rect(t.x, t.y, scl, scl));
  }

  eat(foodLoc) {
    let d = dist(this.x, this.y, foodLoc.x, foodLoc.y);
    
    if (d < 1) {
      this.total++;
      return true;
    }

    return false;
  }

  dir(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }
  
  destroy() {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        this.x = 0;
        this.y = 0;
      }
    }
  }
}