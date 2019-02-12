class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $('ul').on('click', 'li', event => {
      this.makeMove($(event.target));
    });
  }

  makeMove($square) {
    if (this.game.isOver() === true) return;
    $square.removeClass("unclicked");
    try {
      let currentPlayer = this.game.currentPlayer;
      this.game.playMove(
        [parseInt($square.data('posX')),
         parseInt($square.data('posY'))]
      );
      $square.text(currentPlayer);
      $square.data('player', currentPlayer);
    }
    catch (e) {
      alert("Invalid Move! Try again.");
    }
    if (this.game.winner()) {
      $('body').append(`<h2>You win, ${this.game.winner()}</h2>`);
      $('li').removeClass('unclicked');
      this.markWinners();
    }
  }

  setupBoard() {
    const $ul = $('<ul></ul>');
    
    for (let i = 0; i < 9; i++) {
      let $li = $('<li class="unclicked"></li>');
      $li.data('posX', Math.floor(i / 3));
      $li.data('posY', i % 3);
      $ul.append($li);
    }

    this.$el.append($ul);
  }

  markWinners() {
    let winner = this.game.winner();
    $('li').each( (i, el) => {
      let $li = $(el);
      if ($li.data('player') === winner) {
        $li.addClass('winner');
      } else {
        $li.addClass('loser');
      }
    });
  }
}

module.exports = View;
