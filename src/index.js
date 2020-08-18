import resources from './resources.js';
import MainScene from './scenes/main.js';

cc.game.onStart = () => {
    cc.director.setClearColor(cc.color('#A1A1A1'));

    cc.LoaderScene.preload(Object.values(resources), () =>{
        cc.director.runScene(new MainScene());
    }, this);
};