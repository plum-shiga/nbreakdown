/*
 *  GameにViewをわたす
 *  わたすViewによってhtmlでゲームできるか、
 *  コンソールでゲームできるようにする
 *
 *  GameのコンストラクタにViewを流す
 *  コンストラクタ呼び出し部分の一行のコードを変えるだけで
 *  ゲームを使い分けられるようにする
 *

Game
コンパネに表示したのを操作する何か（キーボード対応でもいい）

view
view.createCaredHtml
view.createCardConsole(){
  クリックじゃないflipじゃない別の操作方法
}
 *
 *
 * */

(function() {
  var Card = function() {
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

  var Game = function(num, mode) {
    this.setCards(6, mode);
  };

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
  Game.prototype.setCards = function(CARD_NUM, view) {
    var num = 0,
        cardIndex = 0,
        i = 0,
        stage = document.getElementById('stage');
    this.CARD_NUM = CARD_NUM;
    

    for (i = 0; i < CARD_NUM; i++) {
      num = Math.floor(i / 2);
      do {
        cardIndex = Math.floor(Math.random() * CARD_NUM);
      } while(typeof this.fieldCards[cardIndex] !== 'undefined');
      if(view instanceof HtmlView) {
        this.fieldCards[cardIndex] = view.createCard(num);
      }else{
        this.fieldCards[cardIndex] = num;
      }
    }
    for (i = 0; i < CARD_NUM; i++) {
      if(view instanceof HtmlView) {
        stage.appendChild(this.fieldCards[i]);
        if (i % Math.sqrt(CARD_NUM) == (Math.sqrt(CARD_NUM) - 1)) {
          stage.appendChild(document.createElement('br'));
        }
      }else{
//ここで改行なしでコンソールに表示させる
        //print(this.fieldCards[i]);
      }
    }
//    this.runTimer();
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
    if (currentNum == cardElement.dataset.num) {
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
        cardElement.value = '?';
      }, 700);
      enableFlip = true;
    }
  };
  /* judge() ここまで*/

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
       *  this = まさに生
       *  成したinput要素そのものを
       *  もしcardElementsにすると最後にできたcardElementsになるので注意！
       */
    };
    return cardElements;
  };
  /* createCard() ここまで */    
  /* HtmlViewクラスここまで */

  var ConsoleView = function() {
  };
  
  ConsoleView.prototype.cardElements;

  /*
   * createCard();
   * cardの動的生成
   */
  ConsoleView.prototype.createCard = function() {
/*
    var self = this;
    cardElements = document.createElement('input');
    cardElements.type = 'button';
    cardElements.value = '?';
    cardElements.dataset.num = num;
    cardElements.onclick = function() {
      self.card.flip(this);
      /*
       *  this = まさに生
       *  成したinput要素そのものを
       *  もしcardElementsにすると最後にできたcardElementsになるので注意！
       
    };
    return cardElements;
*/
  };
  /* createCard() ここまで */    
  /* ConsoleViewクラスここまで */


  var viewHtml = new HtmlView();
  var viewConsole = new ConsoleView();

  var game = new Game(6, viewConsole);

  /*
   * ここにDIするもの変えるだけでhtmlかコンパネか
   * どうか変えるっていうことなんやろ
   * これ終わったら、今回の内容にQiitaにかこな
   */
})();
