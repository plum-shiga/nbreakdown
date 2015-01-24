(function() {
  var Card = function() {
    var cardElements;
    var openedCard;
    var currentNum;

    /*
     * カードをめくった時のメソッド
     */
    flip = function() {
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

      if (typeof getCurrentNum === 'undefined') {
        // 上で開けたカードが1枚目のカードかを判定する
        openedCard = cardElements; 
        currentNum = cardElements.dataset.num;
      } else {
        //2枚目をめくっているときの動作
        currentNum = undefined;
      }
    };
    /* flip() ここまで */

    /*
     * cardの動的生成
     */
    this.createCard = function(num) {
      cardElements = document.createElement('input');
      cardElements.type = 'button';
      cardElements.value = '?';
 //     cardElements.value = num;
      cardElements.dataset.num = num;
      cardElements.onclick = function() {
        flip();
      };
      return cardElements;
    };
    /* createCard() ここまで */    

    /*
    * cardの取得
    */
    this.getCard = function() {
      cardElements = document.getElementsByTagName('input');
      return cardElements;
    }
  }
  /* Cardクラスここまで */

  var Game = function() {  
    var CARD_NUM;
    var score = 0;
    var fieldCards = [];
    var currentNum = 0; //今開けたカードに何の数字が書かれていたか
    var openedCard; // どのカードを開けたかを管理
    
    /*
     * カードの数字をランダムに割り当てるメソッド
     */
    this.setCards = function(CARD_NUM) {
      var num = 0,
          cardIndex = 0,
          i = 0,
          stage = document.getElementById('stage');
      
      var card = new Card();

      for (i = 0; i < CARD_NUM; i++) {
        //num = Math.floor(i / 2);
num = i;
        do {
          cardIndex = Math.floor(Math.random() * CARD_NUM);
        } while(typeof fieldCards[cardIndex] !== 'undefined');
        fieldCards[cardIndex] = card.createCard(num);
      }
      for (i = 0; i < CARD_NUM; i++) {
        stage.appendChild(fieldCards[i]);
        if (i % Math.sqrt
            (CARD_NUM) == (Math.sqrt(CARD_NUM) - 1)) {
          stage.appendChild(document.createElement('br'));
        }
      }
    };
    /* setCards() ここまで */

    /*
     * 正誤判定
     */
    this.judge = function(card) {
      var correctNum = 0,
        //timerId,
        enableFlip = true;

      if (currentNum == card.dataset.num) {
        //正解
        correctNum++;
        if (correctNum == CARD_NUM/4) {
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
          card.value = '?';
          enableFlip = true;
        }, 700);
      }
    };
    /* judge() ここまで*/

    /*
     * 早く全部開くことができた方が良いという形にするためタイマーで測定
     */
    this.runTimer = function() {
      document.getElementById('score').innerHTML = score++;
      timerId = setTimeout(function() {
        runTimer();
      }, 100);
    };
    /* runTimer() ここまで */
  }
  /* Gameクラスここまで */

  var View = function() {
  }
  /* Viewクラスここまで */

  var game = new Game();
  game.setCards(6);
  /*
   *！ここでfieldCardsのペア数指定したさあるな
   *！そこまできたらもうhtmlのページで指定したいっしょ
   *
   */
  //game.runTimer();
})();
