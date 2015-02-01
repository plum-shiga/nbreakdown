(function() {
  var Card = function() {
    var game = new Game();
  };
  Card.prototype.openedCard;
  Card.prototype.currentNum;  //今開けたカードに何の数字が書かれていたか

  /*
   * flip();
   * カードをめくった時のメソッド
   */
  Card.prototype.flip = function(cardElements) {   
    var enableFlip = true;
    if (!enableFlip) {
      //flip()中に連打させない
      return;
    }
    if (cardElements.value != '?') {
      //数字が表示されているときに連打されない
      return;
    }
    cardElements.value = cardElements.dataset.num;
    
    if (typeof this.currentNum === 'undefined') {
      // 上で開けたカードが1枚目のカードかを判定する
      this.openedCard = cardElements; 
      this.currentNum = cardElements.dataset.num;
    } else {
      //2枚目をめくっているときの動作
      game.judge(cardElements, this.openedCard, enableFlip, this.currentNum);
      this.currentNum = undefined;
    }
  };
  /* flip() ここまで */
  /* Cardクラスここまで */

  var Game = function() {
  }

  Game.prototype.timerID;
  Game.prototype.CARD_NUM = 0;
  Game.prototype.score = 0;
  Game.prototype.fieldCards = [];
  Game.prototype.openedCard; // どのカードを開けたかを管理
  Game.prototype.correctNum = 1;
  
  /*
   * setCard();
   * カードの数字をランダムに割り当てるメソッド
   */
  Game.prototype.setCards = function(CARD_NUM) {
    var num = 0,
        cardIndex = 0,
        i = 0,
        stage = document.getElementById('stage');
    this.CARD_NUM = CARD_NUM;
    
    var view = new View();

console.log("setCardsの中のthis.CARD_NUM is " + this.CARD_NUM);

    for (i = 0; i < CARD_NUM; i++) {
      num = Math.floor(i / 2);
      do {
        cardIndex = Math.floor(Math.random() * CARD_NUM);
      } while(typeof this.fieldCards[cardIndex] !== 'undefined');
      this.fieldCards[cardIndex] = view.createCard(num);
    }
    for (i = 0; i < CARD_NUM; i++) {
      stage.appendChild(this.fieldCards[i]);
      if (i % Math.sqrt(CARD_NUM) == (Math.sqrt(CARD_NUM) - 1)) {
        stage.appendChild(document.createElement('br'));
      }
    }
    this.runTimer();
  };
  /* setCards() ここまで */

  /*
   * runTimer();
   * 早く全部開くことができた方が良いという形にするためタイマーで測定
   */
  Game.prototype.runTimer = function() {
    var self = this;
    /*
     *  thisの中身はfunction()に入るごとに変わる。
     *  function自身を指す
     * */
    document.getElementById('score').innerHTML = this.score++;
    this.timerID = setTimeout(function() {
      self.runTimer();
    }, 100);
  };
  /* runTimer() ここまで */

  /*
   * judge();
   * 正誤判定
   */
  Game.prototype.judge = function(cardElement, openedCard, enbaleFlip, currentNum) {
console.log("currentNum is"+currentNum);
console.log("cardElement.dataset.num is" + cardElement.dataset.num);
    if (currentNum == cardElement.dataset.num) {
      //正解
      this.correctNum++;
      if (this.correctNum == this.CARD_NUM / 2 + 1) {
console.log("in");
        clearTimeout(this.timerID);
        alert("your score is .." + document.getElementById('score').innerHTML);
      }
    } else {
      //不正解
      enableFlip = false;
      setTimeout(function() {
        //前回の
        openedCard.value = '?'
        //今回の
        cardElement.value = '?';
      }, 700);
      enableFlip = true;
    }
  };
  /* judge() ここまで*/
  /* Gameクラスここまで */

  var View = function() {
  }

  View.prototype.card = new Card();
  View.prototype.cardElements;

  /*
   * createCard();
   * cardの動的生成
   */
  View.prototype.createCard = function(num) {
    var self = this;
    cardElements = document.createElement('input');
    cardElements.type = 'button';
    cardElements.value = '?';
    cardElements.dataset.num = num;
    cardElements.onclick = function() {
      self.card.flip(this);
      /*
       *  this = まさに生成したinput要素そのものを
       *  もしcardElementsにすると最後にできたcardElementsになるので注意！
       */
    };
    return cardElements;
  };
  /* createCard() ここまで */    

  /* Viewクラスここまで */

  var game = new Game();
  game.setCards(6);
})();
