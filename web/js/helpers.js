/* Helpers */
/**
 * Add class to the Element if it not exists
 */
Element.prototype.addClass = function(className) {
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
    if (re.test(this.className)) {
        return this;
    }
    this.className = (this.className + " " + className).
    replace(/\s+/g, " ").replace(/(^ | $)/g, "");
    return this;
};

Element.prototype.delClass = function(className) {
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
    this.className = this.className.
    replace(re, "$1").
    replace(/\s+/g, " ").
    replace(/(^ | $)/g, "");
    return this;
};

Element.prototype.hasClass = function(className) {
    var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
    return re.test(this.className);
};