var NONE = 0;
var BLOCK = 1;
var PLAYER = 2;

var Logger = function(textareaId) {
    this.textarea = document.getElementById(textareaId);
};

Logger.prototype.write = function(str) {
    this.textarea.value += str + "\n";
    this.textarea.scrollTop = this.textarea.scrollHeight;
};

var Player = function(field, logger, startX, startY) {
    this.field = field;
    this.logger = logger;

    this.x = startX;
    this.y = startY;

    this.field.set(PLAYER, this.x, this.y);
};

Player.prototype.move = function(dir) {
    if (dir === "up" && this.field.get(this.x, this.y - 1) === NONE) {
        this.logger.write("ザッザッザッ…北へ向かった");
        this.field.swap(this.x, this.y, this.x, this.y - 1);
        this.y -= 1;
    }
    if (dir === "down" && this.field.get(this.x, this.y + 1) === NONE) {
        this.logger.write("ザッザッザッ…南へ向かった");
        this.field.swap(this.x, this.y, this.x, this.y + 1);
        this.y += 1;
    }
    if (dir === "left" && this.field.get(this.x - 1, this.y) === NONE) {
        this.logger.write("ザッザッザッ…東へ向かった");
        this.field.swap(this.x, this.y, this.x - 1, this.y);
        this.x -= 1;
    }
    if (dir === "right" && this.field.get(this.x + 1, this.y) === NONE) {
        this.logger.write("ザッザッザッ…西へ向かった");
        this.field.swap(this.x, this.y, this.x + 1, this.y);
        this.x += 1;
    }
};

var Field = function(canvasId, fieldWidth, fieldHeight) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.field = [];
    this.initField(fieldWidth, fieldHeight);
};

Field.prototype.initField = function(fieldWidth, fieldHeight) {
    this.width = fieldWidth;
    this.height = fieldHeight;

    for (var i = 0; i < fieldHeight; i++) {
        var row = [];
        for (var j = 0; j < fieldWidth; j++) {
            row[j] = ((j > 0 && j < fieldWidth - 1) && (i > 0 && i < fieldHeight - 1)) ? NONE : BLOCK;
        }
        this.field[i] = row;
    }
};

Field.prototype.draw = function() {
    var BLOCK_WIDTH = this.canvas.width / this.width;
    var BLOCK_HEIGHT = this.canvas.height / this.height;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.field.length; i++) {
        for (var j = 0; j < this.field[i].length; j++) {
            var dx = i * BLOCK_WIDTH;
            var dy = j * BLOCK_HEIGHT;
            if (this.field[j][i] === PLAYER) {
                var before = this.ctx.fillStyle;
                this.ctx.fillStyle = 'rgb(192, 80, 77)';
                this.ctx.fillRect(dx, dy, BLOCK_WIDTH, BLOCK_HEIGHT);
                this.ctx.fillStyle = before;
            }
            else if (this.field[j][i] === BLOCK) {
                this.ctx.fillRect(dx, dy, BLOCK_WIDTH, BLOCK_HEIGHT);
            }
            else {
                this.ctx.strokeRect(dx, dy, BLOCK_WIDTH, BLOCK_HEIGHT);
            }
        }
    }
};

Field.prototype.get = function(x, y) {
    return this.field[y][x];
};

Field.prototype.set = function(id, x, y) {
    this.field[y][x] = id;
    this.draw();
}

Field.prototype.swap = function(x1, y1, x2, y2) {
    var memory = this.field[y1][x1];
    this.field[y1][x1] = this.field[y2][x2];
    this.field[y2][x2] = memory;
    this.draw();
};
