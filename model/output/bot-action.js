

class ButtonAction {
    constructor(id, type, title, action, func) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.action = action;
        this.func = func;
    }
}

class BotAction {
    constructor(type, image, msg, actions) {
        this.type = type;
        this.image = image;
        this.msg = msg;
        this.actions = actions;
    }
}



module.exports = BotAction;
