var Game = function(canvasId, loggerId) {
    this.field = new Field(canvasId, 20, 20);
    this.logger = new Logger(loggerId);
    var player = new Player(1, 1);

    this.field.add(player);
};

Game.prototype.draw = function() {
    this.field.draw();
};

Game.prototype.moveUp = function() {
    this.field.callEvent('up');
    this.draw();
};

Game.prototype.moveDown = function() {
    this.field.callEvent('down');
    this.draw();
};

Game.prototype.moveLeft = function() {
    this.field.callEvent('left');
    this.draw();
};

Game.prototype.moveRight = function() {
    this.field.callEvent('right');
    this.draw();
};
