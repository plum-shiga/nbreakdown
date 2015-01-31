(function() {
  var Card = function() {
    var game = new Game();
  };
  Card.prototype.cardElements;
  Card.prototype.openedCard;
  Card.prototype.currentNum;

  /*
   * カードをめくった時のメソッド
   */
  Card.prototype.flip = function() {
    console.log("0");
/*      
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
    
    if (typeof currentNum === 'undefined') {
      // 上で開けたカードが1枚目のカードかを判定する
      openedCard = cardElements; 
      currentNum = cardElements.dataset.num;
    } else {
      //2枚目をめくっているときの動作
      game.judge(cardElements, openedCard, enableFlip, currentNum);
      currentNum = undefined;
    }
*/
  };
  /* flip() ここまで */

  /*
   * cardの動的生成
   */
  Card.prototype.createCard = function(num) {
    cardElements = document.createElement('input');
    cardElements.type = 'button';
    cardElements.value = '?';
    cardElements.dataset.num = num;
    cardElements.onclick = function() {
      flip();
      /*
       *  this = まさに生成したinput要素そのものを
       *  もしcardElementsにすると最後にできたcardElementsになるので注意！
       */
    };
    return cardElements;
  };
  /* createCard() ここまで */    


  /* Cardクラスここまで */

  var Game = function() {
  }
  /* Gameクラスここまで */

  Game.prototype.CARD_NUM;
  Game.prototype.score = 0;
  Game.prototype.fieldCards = [];
  Game.prototype.currentNum = 0; //今開けたカードに何の数字が書かれていたか
  Game.prototype.openedCard; // どのカードを開けたかを管理
  Game.prototype.correctNum = 1;
  
  /*
   * カードの数字をランダムに割り当てるメソッド
   */
  Game.prototype.setCards = function(CARD_NUM) {
    var num = 0,
        cardIndex = 0,
        i = 0,
        stage = document.getElementById('stage');
    this.CARD_NUM = CARD_NUM;
    
    var card = new Card();

console.log("setCardsの中のthis.CARD_NUM is " + this.CARD_NUM);

    for (i = 0; i < CARD_NUM; i++) {
      num = Math.floor(i / 2);
      do {
        cardIndex = Math.floor(Math.random() * CARD_NUM);
      } while(typeof this.fieldCards[cardIndex] !== 'undefined');
      this.fieldCards[cardIndex] = card.createCard(num);
    }
    for (i = 0; i < CARD_NUM; i++) {
      stage.appendChild(this.fieldCards[i]);
      if (i % Math.sqrt(CARD_NUM) == (Math.sqrt(CARD_NUM) - 1)) {
        stage.appendChild(document.createElement('br'));
      }
    }
    //runTimer();
  };
  /* setCards() ここまで */

  /*
   * 正誤判定
   */
  Game.prototype.judge = function(cardElement, openedCard, enbaleFlip, currentNum) {
    var timerId;

console.log("judge() の中のthis.CARD_NUM is " + this.CARD_NUM);
    
    if (this.currentNum == cardElement.dataset.num) {
      //正解
      this.correctNum++;
      if (this.correctNum == this.CARD_NUM / 2) {
console.log("in");
        clearTimeout(timerId);
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

  /*
   * 早く全部開くことができた方が良いという形にするためタイマーで測定
   */
  Game.prototype.runTimer = function() {
    document.getElementById('score').innerHTML = score++;
    timerId = setTimeout(function() {
      runTimer();
    }, 100);
  };
  /* runTimer() ここまで */

  var View = function() {
    /*
     *  きっとここでカード作る*
     *  createCards()
     *
     * */    
  }
  /* Viewクラスここまで */

  var game = new Game();
  game.setCards(6);
})();
