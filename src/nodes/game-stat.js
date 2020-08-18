import resources from '../resources.js';

const GameStat = cc.Layer.extend({
    ctor() {
        this._super();

        this._WIN_SIZE = cc.director.getWinSize();
        
        this.initBg();
        this.initTime();
        this.initScore();

        return true;
    },

    initBg() {
        const bg = cc.Sprite.create(resources.stat_bg);
        const x = this._WIN_SIZE.width - bg.getContentSize().width / 8 - 20;

        bg.setAnchorPoint(0.5, 1);
        bg.setPosition(x, this._WIN_SIZE.height - 136);
        bg.setScale(0.25);
        this.addChild(bg, 2);
        
        this._X = x;
    },

    initTime() {
        const labelTimeBg = cc.Sprite.create(resources.stat_label_bg);
        labelTimeBg.setAnchorPoint(0.5, 1);
        labelTimeBg.setPosition(this._X, this._WIN_SIZE.height - 100);
        labelTimeBg.setScale(0.25);
        this.addChild(labelTimeBg, 0);

        const label = cc.LabelTTF.create('ВРЕМЯ:', 'Arial', 16);
        label.setAnchorPoint(0.5, 1);
        label.setPosition(this._X, this._WIN_SIZE.height - 113);
        this.addChild(label, 1);
        
        const timeBg = cc.Sprite.create(resources.stat_time_bg);
        timeBg.setAnchorPoint(0.5, 1);
        timeBg.setPosition(this._X, this._WIN_SIZE.height - 145);
        timeBg.setScale(0.25);
        this.addChild(timeBg, 3);

        const textTime = cc.LabelTTF.create('0', 'Arial', 40);
        textTime.setAnchorPoint(0.5, 1);
        textTime.setPosition(this._X, this._WIN_SIZE.height - 205);
        this.addChild(textTime, 4);

        this._TIME = textTime;
    },

    initScore() {
        const scoreBg = cc.Sprite.create(resources.stat_score_bg);
        scoreBg.setAnchorPoint(0.5, 1);
        scoreBg.setPosition(this._X, this._WIN_SIZE.height - 295);
        scoreBg.setScale(0.25);
        this.addChild(scoreBg, 3);

        const labelScore = cc.LabelTTF.create('ОЧКИ:', 'Arial', 24);
        labelScore.setAnchorPoint(0.5, 1);
        labelScore.setPosition(this._X, this._WIN_SIZE.height - 310);
        this.addChild(labelScore, 4);

        const textScore = cc.LabelTTF.create('0', 'Arial', 24);
        textScore.setAnchorPoint(0.5, 1);
        textScore.setPosition(this._X, this._WIN_SIZE.height - 340);
        this.addChild(textScore, 4);

        this._SCORE = textScore;
    },

    setTime(seconds) {
        this._TIME.setString(seconds);
    },

    setScore(score) {
        this._SCORE.setString(score);
    },
});

export default GameStat;