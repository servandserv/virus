/* View */
function ConsoleView(elId) {
    this.el = document.getElementById(elId);
    this.write = function(str) 
    {
        this.el.innerHTML += str;
    }
    this.clear = function() {
        this.el.innerHTML = '';
    }
}