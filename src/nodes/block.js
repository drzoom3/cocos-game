import resources from '../resources.js';

const Block = cc.Sprite.extend({
    ctor(type, cost) {
        this._super(resources[`block_${type}`]);
        this.setScale(0.25);
        this.type = type;
        this.cost = cost;
    }
});

export default Block;