import resources from '../resources.js';
import Block from './block.js';

const GameField = cc.Layer.extend({
    _COLORS: ['blue', 'purple', 'red', 'yellow', 'green'],
    _MAP_WIDTH: 9,
    _MAP_HEIGHT: 9,
    
    ctor(MAP_WIDTH, MAP_HEIGHT) {
        this._super();

        this._BLOCKS = [];
        this._MAP_WIDTH = MAP_WIDTH;
        this._MAP_HEIGHT = MAP_HEIGHT;
        this._WIN_SIZE = cc.director.getWinSize();
        
        this.initBg();
        this.initBlocks();

        return true;
    },

    initBg() {
        const bg = cc.Sprite.create(resources.game_bg);
        bg.setAnchorPoint(0, 1);
        bg.setPosition(50, this._WIN_SIZE.height - 110);
        bg.setScale(0.25);
        this.addChild(bg, 0);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this)
        }), bg);

    },

    initBlocks() {
        for (let i = 0; i < (this._MAP_WIDTH * this._MAP_HEIGHT); i++) {
            this.addBlock(i)
        };
    },

    addBlock(i) {
        const size = cc.director.getWinSize();
        const color = Math.floor(Math.random() * this._COLORS.length);            
        const block = new Block(this._COLORS[color], color + 1);
        
        const w = block.getContentSize().width / 4 + 1;
        const h = block.getContentSize().height / 4 + 1;
        const x = 58 + w/2 + (w * (i%this._MAP_WIDTH));
        const y = size.height - 116 - (h * this._MAP_HEIGHT) + h/2 + (h * Math.floor(i / this._MAP_HEIGHT));
         
        block.setScale(0);

        block.setPosition(x, y);
        this.addChild(block, 3);

        this._BLOCKS[i] = block;

        const actionMove = cc.ScaleTo.create(0.2, 0.25);
        block.runAction(actionMove);
    },

    onTouchBegan(touch, event) {
        const tap = touch.getLocation();

        this._BLOCKS.map((block, i) => {
            if (block) {
                const blockRect = block.getBoundingBox();
        
                if (cc.rectContainsPoint(blockRect, tap) && this.blockCanRemove(i)) {
                    this.removeBlock(i);
                    this.moveBlocks(this.fillBlocks);
                }
            }
        });
    },

    blockCanRemove(i) {
        const color = this._BLOCKS[i].type;

        return (this._BLOCKS[i + 1] && this._BLOCKS[i + 1].type == color && i%this._MAP_WIDTH < this._MAP_WIDTH - 1 && !this._BLOCKS[i + 1].remove) ||
            (this._BLOCKS[i - 1] && this._BLOCKS[i - 1].type == color && i%this._MAP_WIDTH > 0 && !this._BLOCKS[i - 1].remove) ||
            (this._BLOCKS[i + this._MAP_WIDTH] && this._BLOCKS[i + this._MAP_WIDTH].type == color && Math.floor(i/this._MAP_WIDTH) < this._MAP_HEIGHT && !this._BLOCKS[i + this._MAP_WIDTH].remove) ||
            (this._BLOCKS[i - this._MAP_WIDTH] && this._BLOCKS[i - this._MAP_WIDTH].type == color && Math.floor(i/this._MAP_WIDTH) > -1 && !this._BLOCKS[i - this._MAP_WIDTH].remove)
    },

    removeBlock(i) {
        const block = this._BLOCKS[i];
        const color = block.type;

        const actionMove = cc.ScaleTo.create(0.25, 0);
        block.runAction(cc.sequence( actionMove, cc.callFunc(block.removeFromParent, block) ));
        
        this._BLOCKS[i] = null;
        block.remove = true;
        
        if (this.onRemove) this.onRemoveBlock(block);

        if (this._BLOCKS[i + 1] && this._BLOCKS[i + 1].type == color && i%this._MAP_WIDTH < this._MAP_WIDTH - 1 && !this._BLOCKS[i + 1].remove) {//Right
            this.removeBlock(i + 1);
        }
        if (this._BLOCKS[i - 1] && this._BLOCKS[i - 1].type == color && i%this._MAP_WIDTH > 0 && !this._BLOCKS[i - 1].remove) {//Left
            this.removeBlock(i - 1);
        }
        if (this._BLOCKS[i + this._MAP_WIDTH] && this._BLOCKS[i + this._MAP_WIDTH].type == color && Math.floor(i/this._MAP_WIDTH) < this._MAP_HEIGHT && !this._BLOCKS[i + this._MAP_WIDTH].remove) {//Bottom
            this.removeBlock(i + this._MAP_WIDTH);
        }
        if (this._BLOCKS[i - this._MAP_WIDTH] && this._BLOCKS[i - this._MAP_WIDTH].type == color && Math.floor(i/this._MAP_WIDTH) > -1 && !this._BLOCKS[i - this._MAP_WIDTH].remove) {//Top
            this.removeBlock(i - this._MAP_WIDTH);
        }

        cc.eventManager.dispatchCustomEvent('RemoveBlock', block);
    },

    moveBlocks(cb) {
        let moved = false;

        for (let i = 0; i < this._BLOCKS.length; i++) {
            if (!this._BLOCKS[i]) {
                const row = Math.floor(i/this._MAP_WIDTH);
                let updated = false;

                for (let r = row; r < this._MAP_HEIGHT; r++) {
                    const index = i + (r - row + 1) * this._MAP_WIDTH;
                    
                    if (this._BLOCKS[index] && !updated) {
                        const h = this._BLOCKS[index].getContentSize().height / 4 + 1;

                        const delta = h * (r - row + 1);
                        const position = this._BLOCKS[index].getPosition();

                        const actionMove = cc.MoveTo.create(0.5, cc.p(position.x, position.y - delta));
                        this._BLOCKS[index].runAction(cc.sequence( actionMove, cc.callFunc(cb, this) ));

                        this._BLOCKS[i] = this._BLOCKS[index];
                        this._BLOCKS[index] = null;
                        updated = true;
                        moved = true;
                    }
                }
            };
        }

        if (!moved) {
            cb.call(this);
        }
    },

    fillBlocks() {
        this._BLOCKS.map((block, i) => {
            if (!block) {
                this.addBlock(i);
            }
        })
    },
});

export default GameField;