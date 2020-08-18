import resources from '../resources.js';

const GameHeader = cc.Layer.extend({
    ctor() {
        this._super();

        this._WIN_SIZE = cc.director.getWinSize();

        this.initBg();
        this.initTitle();
        this.initProgressBar();

        return true;
    },

    initBg() {
        const bg = cc.Sprite.create(resources.header_bg);

        bg.setAnchorPoint(0.5, 1);
        bg.setPosition(this._WIN_SIZE.width / 2, this._WIN_SIZE.height);
        bg.setScale(0.25);
        this.addChild(bg, 0);
    },

    initTitle() {
        const label = cc.LabelTTF.create('ПРОГРЕСС', 'Arial', 16);

        label.setAnchorPoint(0.5, 1);
        label.setPosition(this._WIN_SIZE.width / 2, this._WIN_SIZE.height - 10);
        this.addChild(label, 1);
    },

    initProgressBar() {
        const progress_bg = cc.Sprite.create(resources.progress_bg);
        
        progress_bg.setAnchorPoint(0.5, 1);
        progress_bg.setScale(0.25);
        progress_bg.setPosition(this._WIN_SIZE.width / 2, this._WIN_SIZE.height - 30);
        this.addChild(progress_bg, 2);
        
        const progress = ccui.LoadingBar.create(resources.progress_active, 20);

        progress.setAnchorPoint(0, 1);
        progress.setScale(0.25);
        progress.setPosition(this._WIN_SIZE.width / 2 - progress_bg.getContentSize().width / 8, this._WIN_SIZE.height - 30);
        this.addChild(progress, 2);

        this._PROGRESS = progress;
    },

    setProgress(percent) {
        this._PROGRESS.setPercent(percent);
    },
});

export default GameHeader;