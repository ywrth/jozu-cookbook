class Sparkles {
  constructor(canvas) {
    this.colors = ["purple", "red", "yellow", "green"];
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.intensity = 30;
    this.sparkles = [];

    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let sparkleAmount = this.sparkles.length;
    while (sparkleAmount--) {
      const sparkle = this.sparkles[sparkleAmount];
      if (sparkle.opacity <= 0) {
        this.sparkles.splice(sparkleAmount, 1);
      } else {
        sparkle.yPos++;
        sparkle.xPos += sparkle.dispersingDirection;
        sparkle.opacity -= sparkle.dispersingSpeed;

        this.ctx.globalAlpha = sparkle.opacity;
        this.ctx.beginPath();
        this.ctx.arc(
          sparkle.xPos,
          sparkle.yPos,
          sparkle.radius,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = sparkle.color;
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
      }
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  onResize() {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
  }

  onMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    for (let i = 0; i <= 20; i++) {
      this.addSparkle(
        mouseX + (Math.random() * this.intensity - this.intensity * 0.5),
        mouseY + (Math.random() * this.intensity - this.intensity * 0.5)
      );
    }
  }

  addSparkle(xPos, yPos) {
    const radius = Math.random() * 2;
    const opacity = 1;
    const dispersingSpeed = Math.random();
    const dispersingDirection =
      Math.random() < 0.5 ? -Math.random() : Math.random();
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.sparkles.push({
      xPos,
      yPos,
      radius,
      opacity,
      dispersingSpeed,
      dispersingDirection,
      color,
    });
  }
}

new Sparkles(document.getElementById("sparkles"));
