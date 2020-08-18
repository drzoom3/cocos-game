import Game from './game.js';
import Button from '../nodes/button.js';

const LoseScene = cc.Scene.extend({
    ctor(SCORE, TOTAL) {
        this._super();
        this._SCORE = SCORE;
        this._TOTAL = TOTAL;
    },
    onEnter() {
        this._super();
        const size = cc.director.getWinSize();

        const label = cc.LabelTTF.create('Game Over', 'Arial', 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);

        const stat = cc.LabelTTF.create(`Результат ${this._SCORE} из ${this._TOTAL}`, 'Arial', 16);
        stat.setPosition(size.width / 2, size.height / 2 - 40);
        this.addChild(stat, 1);
        
        const startButton = new Button('retry', 'Повторить', () => {
            cc.director.runScene(new Game);
        });
        startButton.setPosition(size.width / 2, size.height / 2 - 100);

        this.addChild(startButton);
    }
});

export default LoseScene;