var Logger = function(textareaId) {
    this.textarea = document.getElementById(textareaId);
};

Logger.prototype.write = function(str) {
    this.textarea.value += str + "\n";
    this.textarea.scrollTop = this.textarea.scrollHeight;
};
