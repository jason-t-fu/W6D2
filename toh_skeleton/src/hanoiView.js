
class HanoiView {

  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.firstSelection = null;

    this.$uls = null;
    this.setupTowers();
    this.setupHandlers();
    this.render();
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      this.$el.append(`<ul data-tower="${i}"></ul>`);
    }

    this.$uls = $('ul');
  }

  setupHandlers() {
    this.$el.on('click', 'ul', (event) => {
      let $target = $(event.currentTarget);
      console.log($target.data('tower'));
      if (this.firstSelection === null) {
        this.firstSelection = $target.data('tower');
      } else {
        this.game.move(this.firstSelection, $target.data('tower'));
        this.firstSelection = null;
        this.render();
        if (this.game.isWon()) {
          this.$el.append("<h2>You Won!</h2>");
          this.$el.off('click');
        }
      }
    }); 
  }

  render() {
    this.$uls.html("");

    this.game.towers.forEach( (tower, i) => {
      tower.forEach( (disc) => {
        this.$uls.eq(i).prepend(`<li class="disc-${disc}"></li>`);
      });
    });
  }

}



module.exports = HanoiView;