(function() {
  /* �O���[�o���ϐ��ꎮ */
  var CARD_NUM = 16,
      currentNum, //���J�����J�[�h�ɉ��̐�����������Ă�����
      openedCard; // �ǂ̃J�[�h���J���������Ǘ�
  
  var Card = function() {
    var cards = [];//cards[n]�ɂ�0011�����ꂼ�ꏇ�������_����4����

    /*
     * �J�[�h�̐����������_���Ɋ��蓖�Ă郁�\�b�h
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
    /* initCards() �����܂� */

    /*
     * �J�[�h���߂��������̃��\�b�h
     */
    this.flip = function() {
      if (!enableFlip) {
        //flip()���ɘA�ł����Ȃ�
        return;
      }
      if (card.value != '?') {
        return;
      }
      card.value = card.dataset.num;
      if (typeof currentNum === 'undefined') {
        // ��ŊJ�����J�[�h��1���ڂ̃J�[�h���𔻒肷��
        openedCard = card; 
        currentNum = card.dataset.num;
      } else {
        //2���ڂ��߂����Ă���Ƃ��̓���
        judge(card);
        currentNum = undefined;
      }
    };
    /* flip() �����܂� */
  }
  /* Card�N���X�����܂� */

  var Game = function() {
    var score = 0;
    /*
     * ���딻��
     */
    this.judge = function(card) {
      var correctNum = 0;
      var timerId;
      if (currentNum == card.dataset.num) {
        //����
        correctNum++;
        if (correctNum == CARD_NUM/2) {
          clearTimeout(timerId);
          alert("your score is .." + document.getElementById('score').innerHTML);
        }
      } else {
        //�s����
        enableFlip = false;
        setTimeout(function() {
          //�O���
          openedCard.value = '?'
          //�����
          card.value = '?';
          enableFlip = true;
        }, 700);
      }
    };
    /* judge() �����܂�*/

    /*
     * �����S���J�����Ƃ��ł��������ǂ��Ƃ����`�ɂ��邽�߃^�C�}�[�ő���
     */
    this.runTimer = function() {
      //var timer = new Game();
      document.getElementById('score').innerHTML = score++;
      timerId = setTimeout(function() {
        arguments.callee();
      }, 100);
    };
    /* runTimer() �����܂� */
  }
  /* Game�N���X�����܂� */

  var View = function() {
    /*
     * card�̓��I����
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
    /* createCard() �����܂� */
  }
  /* View�N���X�����܂� */

  var suijaku = new Card();
  suijaku.initCards();
  var game = new Game();
  game.runTimer();
})();
