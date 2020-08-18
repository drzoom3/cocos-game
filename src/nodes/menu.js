import Button from './button.js';
import Game from '../scenes/game.js';

const Menu = cc.Layer.extend({
    ctor() {
        this._super();
    
        const startButton = new Button('start', 'Старт!', () => {
            cc.director.runScene(new Game);
        });
        startButton.setPosition(0, 0);

        this.addChild(startButton);
                       
        return true;
    }
});

export default Menu;