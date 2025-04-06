// Set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const para = document.querySelector("p");
const timerDiv = document.getElementById("timer");
const winMessage = document.getElementById("win-message");

// Helper functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Shape base class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    if (!this.exists) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (!this.exists) return;

    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 5, 5);
    this.color = "white";
    this.size = 15;
    this.controls = { w: false, a: false, s: false, d: false };

    window.addEventListener("keydown", (e) => {
      if (this.controls.hasOwnProperty(e.key)) this.controls[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      if (this.controls.hasOwnProperty(e.key)) this.controls[e.key] = false;
    });
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  move() {
    if (this.controls.w) this.y -= this.velY;
    if (this.controls.s) this.y += this.velY;
    if (this.controls.a) this.x -= this.velX;
    if (this.controls.d) this.x += this.velX;
  }

  checkBounds() {
    if (this.x + this.size > width) this.x = width - this.size;
    if (this.x - this.size < 0) this.x = this.size;
    if (this.y + this.size > height) this.y = height - this.size;
    if (this.y - this.size < 0) this.y = this.size;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          ballCount--;
          para.textContent = `Ball count: ${ballCount}`;
        }
      }
    }
  }
}

// Game variables
let balls = [];
let ballCount = 0;
let startTime = Date.now();
let timerId;
const evilCircle = new EvilCircle(width / 2, height / 2);

// Initialize balls
function initBalls() {
  balls = [];
  ballCount = 25;
  for (let i = 0; i < ballCount; i++) {
    const size = random(10, 20);
    balls.push(
      new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
      )
    );
  }
  para.textContent = `Ball count: ${ballCount}`;
  startTime = Date.now();
  winMessage.style.display = "none"; // Hide win message on reset
}

// Update HTML-based timer
function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  timerDiv.textContent = `Time: ${hours}:${minutes}:${seconds}`;
}

// Show "You Win!" using HTML
function showWinMessage() {
  winMessage.style.display = "block";
}

// Main game loop
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.move();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  updateTimer();

  if (ballCount === 0) {
    showWinMessage();
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      initBalls();
    }, 5000);
  }

  requestAnimationFrame(loop);
}

// Start game
initBalls();
loop();