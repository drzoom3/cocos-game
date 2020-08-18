import LoseScreen from './lose.js';
import WinScreen from './win.js';

import GameHeader from '../nodes/game-header.js';
import GameStat from '../nodes/game-stat.js';
import GameFfeld from '../nodes/game-field.js';

const GameScene = cc.Scene.extend({
    onEnter() {
        this._super();

        this.TIME = 20;
        this.SCORE = 0;
        this.WIN_SCORE = 400;

        const header = new GameHeader();
        this.addChild(header, 2);
        
        const stat = new GameStat();
        this.addChild(stat, 2);
        
        const field = new GameFfeld(9,9);
        this.addChild(field, 2);

        const eventListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: 'RemoveBlock',
            callback: this.onRemoveBlock.bind(this)
        });

        cc.eventManager.addListener(eventListener, field);
        
        stat.setTime(this.TIME);
        header.setProgress(0);
        
        const interval = setInterval(() => {
            this.TIME = this.TIME - 1;
            stat.setTime(this.TIME);
            
            if (this.TIME <= 0) {
                clearInterval(interval);
                cc.eventManager.removeListener(eventListener);

                cc.director.runScene(new LoseScreen(this.SCORE, this.WIN_SCORE));
            }
        }, 1000);

        this._TIMER = interval;
        this._HEADER = header;
        this._STAT = stat;
    },

    onRemoveBlock(event) {
        this.SCORE = this.SCORE + event._userData.cost;

        this._HEADER.setProgress(100 * this.SCORE / this.WIN_SCORE);
        this._STAT.setScore(this.SCORE);

        if (this.SCORE >= this.WIN_SCORE) {
            clearInterval(this._TIMER);

            cc.director.runScene(new WinScreen(this.SCORE, this.WIN_SCORE));
        }
    }
});

export default GameScene;