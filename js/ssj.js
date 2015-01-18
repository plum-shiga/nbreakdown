(function() {
  /* グローバル変数一式 */
  var CARD_NUM = 16,
      currentNum, //今開けたカードに何の数字が書かれていたか
      openedCard; // どのカードを開けたかを管理
  
  var Card = function() {
    var cards = [];//cards[n]には0011がそれぞれ順序ランダムで4つ入る

    /*
     * カードの数字をランダムに割り当てるメソッド
     */
    this.initCards = function() {
      var num,
          cardIndex,
          i,
          stage = document.getElementById('stage');
      for(i = 0; i < CARD_NUM; i++) {
        num = Math.floor(i/2);
        do {
          cardIndex = Math.floor(Math.random() * CARD_NUM);
        } while(typeof cards[cardIndex] !== 'undefined');

        var view = new View();
        cards[cardIndex] = view.createCard(num);
        
      }
      for(i=0; i< CARD_NUM; i++) {
        stage.appendChild(cards[i]);
        if (i % Math.sqrt(CARD_NUM)==(Math.sqrt(CARD_NUM)-1)) {
          stage.appendChild(document.createElement('br'));
        }
      }
    };
    /* initCards() ここまで */

    /*
     * カードをめくった時のメソッド
     */
    this.flip = function() {
      if (!enableFlip) {
        //flip()中に連打させない
        return;
      }
      if (card.value != '?') {
        return;
      }
      card.value = card.dataset.num;
      if (typeof currentNum === 'undefined') {
        // 上で開けたカードが1枚目のカードかを判定する
        openedCard = card; 
        currentNum = card.dataset.num;
      } else {
        //2枚目をめくっているときの動作
        judge(card);
        currentNum = undefined;
      }
    };
    /* flip() ここまで */
  }
  /* Cardクラスここまで */

  var Game = function() {
    var score = 0;
    /*
     * 正誤判定
     */
    this.judge = function(card) {
      var correctNum = 0;
      var timerId;
      if (currentNum == card.dataset.num) {
        //正解
        correctNum++;
        if (correctNum == CARD_NUM/2) {
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
      //var timer = new Game();
      document.getElementById('score').innerHTML = score++;
      timerId = setTimeout(function() {
        arguments.callee();
      }, 100);
    };
    /* runTimer() ここまで */
  }
  /* Gameクラスここまで */

  var View = function() {
    /*
     * cardの動的生成
     */
    this.createCard = function(num) {
      var card = document.createElement('input');
      card.type = 'button';
      card.value = '?';
      card.dataset.num = num;
      card.onclick = function() {
        flip(this);
      };
      return card;
    };
    /* createCard() ここまで */
  }
  /* Viewクラスここまで */

  var suijaku = new Card();
  suijaku.initCards();
  var game = new Game();
  game.runTimer();
})();
