(function() {
  var Card = function() {
  };
  
  Card.prototype.openedCard;
  Card.prototype.currentNum;  //今開けたカードに何の数字が書かれていたか

  /*
   * flip();
   * カードをめくった時のメソッド
   */

  Card.prototype.flip = function(elements, num, position, fieldCards) {
    if (arguments.length == 1) {
      this.flipHtml(elements);
    }else{
      this.flipConsole(num, position, elements, fieldCards);
    }
  }

  Card.prototype.flipHtml = function(cardElements) {
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
      game.judgeHtml(this.openedCard, enableFlip, this.currentNum, cardElements);
      this.currentNum = undefined;
    }
  };

  Card.prototype.flipConsole = function(num, position, elements, fieldCards) {
    var enableFlip = true;
    if (!enableFlip) {
      //flip()中に連打させない
      return;
    }
    var enableFlip = true;
    var currentPosition = 0;


    fieldCards[position-1] = num;
    console.log(fieldCards);
    if (typeof this.currentNum === 'undefined') {
      // 上で開けたカードが1枚目のカードかを判定する
      this.openedCard = position;
      this.currentNum = num;
    } else {
      //2枚目をめくっているときの動作
      game.judgeConsole(this.openedCard, enableFlip, this.currentNum, elements, fieldCards);
      this.currentNum = undefined;
    }
  };

  /* Cardクラスここまで */

  var Game = function(num, mode) {
    this.setCards(6, mode);
  };

  Game.prototype.timerID;
  Game.prototype.CARD_NUM = 0;
  Game.prototype.score = 0;
  Game.prototype.fieldCards = [];
  Game.prototype.openedCard; // どのカードを開けたかを管理
  Game.prototype.correctNum = 1;
  Game.prototype.randomArray = [];
  
  /*
   * setCard();
   * カードの数字をランダムに割り当てるメソッド
   */
  Game.prototype.setCards = function(CARD_NUM, view) {
    var num = 0,
        cardIndex = 0,
        i = 0,
        stage = document.getElementById('stage');
    this.CARD_NUM = CARD_NUM;
    
    
    for (i = 0; i < CARD_NUM; i++) {
      num = Math.floor(i / 2);
      if(view instanceof HtmlView) {
        do {
          cardIndex = Math.floor(Math.random() * CARD_NUM);
        } while(typeof this.fieldCards[cardIndex] !== 'undefined');
        this.fieldCards[cardIndex] = view.createCard(num);
      }else{        
        do {
          cardIndex = Math.floor(Math.random() * CARD_NUM);
        } while(typeof this.randomArray[cardIndex] !== 'undefined');
        var sheet = i+1;
        this.fieldCards[i] = "Card" + sheet;
        this.randomArray[cardIndex] = num;
      }
    }
    for (i = 0; i < CARD_NUM; i++) {
      if(view instanceof HtmlView) {
        stage.appendChild(this.fieldCards[i]);
        if (i % Math.sqrt(CARD_NUM) == (Math.sqrt(CARD_NUM) - 1)) {
          stage.appendChild(document.createElement('br'));
        }
      }else{
      stage.appendChild(view.createSwitch(this.randomArray[i], this.fieldCards[i], this.fieldCards, i));
      }
    }
    if(view instanceof ConsoleView) {
      console.log(this.fieldCards);
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
  
  Game.prototype.judgeHtml = function(openedCard, enbaleFlip, currentNum, element) {
    if (currentNum == element.dataset.num) {
      //正解
      this.correctNum++;
      if (this.correctNum == this.CARD_NUM / 2 + 1) {
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
        element.value = '?';
      }, 700);
      enableFlip = true;
    }
  };
  /* judge() ここまで*/

  Game.prototype.judgeConsole = function(openedCard, enbaleFlip, currentNum, element, fieldCards) {
    /*
     * fieldCards: 実際のカードの配列
     * element: 単独の要素
     * */

    if (currentNum == element.dataset.num) {
      //正解
      this.correctNum++;
      if (this.correctNum == this.CARD_NUM / 2 + 1) {
        clearTimeout(this.timerID);
        alert("your score is .." + document.getElementById('score').innerHTML);
      }
    } else {
      //不正解
      enableFlip = false;
      setTimeout(function() {
        //前回の
        fieldCards[openedCard-1] = "Card" + openedCard;
        //今回の
        fieldCards[element.dataset.position-1] = "Card" + element.dataset.position;
        console.log("裏返します");
        console.log(fieldCards);
      }, 700);
      enableFlip = true;
    }
  };
  


  /* Gameクラスここまで */

  var HtmlView = function() {
  };

  HtmlView.prototype.cardElements;
  HtmlView.prototype.card = new Card();

  /*
   * createCard();
   * cardの動的生成
   */
  HtmlView.prototype.createCard = function(num) {
    var self = this;
    cardElements = document.createElement('input');
    cardElements.type = 'button';
    cardElements.value = '?';
    cardElements.dataset.num = num;
    cardElements.onclick = function() {
      self.card.flip(this);
      /*
       *  this = まさに生成したinput要素そのもの
       *  もしcardElementsにすると最後にできた
       *  cardElementsになるので注意！
       */
    };
    return cardElements;
  };
  /* createCard() ここまで */    
  /* HtmlViewクラスここまで */

  var ConsoleView = function() {
  };
  
  ConsoleView.prototype.changeElements;
  ConsoleView.prototype.card = new Card();

  /*
   * createSwitch();
   * コンソールの数字を操作するメソッド
   */
  ConsoleView.prototype.createSwitch = function(num, Cards, fieldCards, i) {
    var self = this;
    changeElements = document.createElement('input');
    changeElements.type = 'button';
    changeElements.value = 'めくる';
    changeElements.dataset.num = num;
    changeElements.dataset.position = i+1;
    changeElements.onclick = function() {
      self.card.flip(this.dataset.num, this.dataset.position, fieldCards, this);
    };
    return changeElements;
  };
  /* createCard() ここまで */    
  /* ConsoleViewクラスここまで */


  var viewHtml = new HtmlView();
  var viewConsole = new ConsoleView();

  var game = new Game(6, viewConsole);

})();
