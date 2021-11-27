var TxtRotate = function(el, toRotate, period) 
{
    this.toRotate = toRotate; //data-rotate
    this.el = el; //txt-rotate
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};
//creating tick function
TxtRotate.prototype.tick = function() {
    var i = this.loopNum % //dont know why i have this
this.toRotate.length;
    var fullTxt = this.toRotate[i]; //fullTxt is the word that is printing on screen in a loop

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);//this is subtracting a single letter of data-rotate
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);//this is adding a single letter of data-rotate via next line of text "this.txt/toRotate"
    }

    this.el.innerHTML = '<span class="wrap">' +this.txt+'</span>';

    var that = this;//so this.tick doesnt fuck up the main var of tick()
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }
    //next if statement makes it so that the whole txt is deleted and not just a single letter
    if(!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);

};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
      document.body.appendChild(css);
  
};