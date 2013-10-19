var NONE = 0;
var BLOCK = 1;
var PLAYER = 2;

var Field = function(canvasId, fieldWidth, fieldHeight) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.field = [];
    this.initField(fieldWidth, fieldHeight);

    this.character = [];
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
            
            if (this.field[j][i] === BLOCK) {
                this.ctx.fillRect(dx, dy, BLOCK_WIDTH, BLOCK_HEIGHT);
            }
            else {
                this.ctx.strokeRect(dx, dy, BLOCK_WIDTH, BLOCK_HEIGHT);
            }
            
            if (this.isCharacter(i, j) === PLAYER) {
                var before = this.ctx.fillStyle;
                this.ctx.fillStyle = 'rgb(192, 80, 77)';
                this.ctx.fillRect(dx, dy, BLOCK_WIDTH, BLOCK_HEIGHT);
                this.ctx.fillStyle = before;
            }
        }
    }
};

Field.prototype.isCharacter = function(x, y) {
    for (var i = 0; i < this.character.length; i++) {
        var ch = this.character[i];
        if (ch.x === x && ch.y === y) return ch.id;
    }

    return -1;
};

Field.prototype.add = function(character) {
    this.character[this.character.length] = character;
};

Field.prototype.get = function(x, y) {
    return this.field[y][x];
};

Field.prototype.callEvent = function(event) {
    for (var i = 0; i < this.character.length; i++) {
        if (typeof(this.character[i].move) === 'function') {
            this.character[i].move(event, this);
        }
    }
};
