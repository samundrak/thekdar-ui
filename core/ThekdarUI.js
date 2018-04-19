const server = require('./server');
class ThekdarUi {
    constructor(configs) {
        this.configs = configs;
    }
    apply(thekdar) {
        if (ThekdarUi.IS_PLUGGED) {
            console.warn('Thekdar ui has already plugged.')
            return;
        }
        this.thekdar = thekdar;
        this.thekdar.on('info', this.handleThekdarInfoMessage.bind(this));
        this.startServer();
        ThekdarUi.IS_PLUGGED = true;
    }

    handleThekdarInfoMessage(data) {
        console.log(data);
        if (this.io) {
            this.io.emit('info', JSON.parse(JSON.stringify(data)));
        }
    }

    startServer() {
        server(this.configs, (io) => {
            this.io = io;
        });
    }
}

ThekdarUi.IS_PLUGGED = false;
module.exports = ThekdarUi;