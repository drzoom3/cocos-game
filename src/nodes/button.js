import resources from '../resources.js';

const Button = ccui.Button.extend({
    ctor(name, caption, callback) {
      this._super();
    
      this.createBtn(name, caption);
      this.createListeners(callback)
    },

    createBtn(name, caption) {
        this.loadTextures(resources.btn, resources.btn_active);
        this.setName(name);
        this.setScale(0.25);

        const size = this.getContentSize();
        const captionLabel = new cc.LabelTTF(caption, 'Arial', 64);
        captionLabel.setPosition(size.width * 0.5, size.height * 0.5);
        this.addChild(captionLabel);
    },

    createListeners(callback) {
        this.addTouchEventListener(this.touchEvent(callback), this);
    },
    
    touchEvent(callback) {
        return (sender, type) => {
            if  (type == ccui.Widget.TOUCH_ENDED) {
                callback();
            }
        };
    }
});

export default Button;