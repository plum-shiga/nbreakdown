(function() {

var Animal = function(name, sex) {
  this.name = name;
  this.sex = sex;
  var num = 3;

  this.toString = function() {
    window.alert(num);
  }
}

var anim = new Animal("トクジロウ", "オス");
anim.toString(); // 「トクジロウ オス」

var anim2  = new Animal("くっく");
anim2.toString();

})();
