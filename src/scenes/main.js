import Menu from '../nodes/menu.js';

const MainScene = cc.Scene.extend({
    onEnter() {
        this._super();

        const size = cc.director.getWinSize();
        const menu = new Menu();
        menu.setPosition(size.width / 2, size.height / 2);

        this.addChild(menu, 3);
    }
});

export default MainScene;