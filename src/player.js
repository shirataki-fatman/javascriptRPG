var Player = function(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.id = PLAYER;
};

Player.prototype.move = function(dir, field) {
    if (dir === "up" && field.get(this.x, this.y - 1) === NONE) {
        this.y -= 1;
    }
    if (dir === "down" && field.get(this.x, this.y + 1) === NONE) {
        this.y += 1;
    }
    if (dir === "left" && field.get(this.x - 1, this.y) === NONE) {
        this.x -= 1;
    }
    if (dir === "right" && field.get(this.x + 1, this.y) === NONE) {
        this.x += 1;
    }
};
