import Game from './game.js';
import Button from '../nodes/button.js';

const WinScene = cc.Scene.extend({
    onEnter() {
        this._super();

        const size = cc.director.getWinSize();

        const label = cc.LabelTTF.create('Победа!', 'Arial', 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);

        
        const startButton = new Button('retry', 'Повторить', () => {
            cc.director.runScene(new Game);
        });
        startButton.setPosition(size.width / 2, size.height / 2 - 50);

        this.addChild(startButton);
    }
});

export default WinScene;