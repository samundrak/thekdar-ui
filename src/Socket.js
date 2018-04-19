const io = require('socket.io-client');

class Socket {
    constructor(actions) {
        this.actions = actions;
        let socketUrl = null;
        if (process.env.NODE_ENV === 'development') {
            socketUrl = `http://localhost:5000`
        } else {
            socketUrl = `${window.location.protocol}//${window.location.host}`
        }
        this.io = io.connect(socketUrl);
    }

    listen() {
        this.io.on('info', this.handleServerInfoMessages.bind(this));
    }

    handleServerInfoMessages(data) {
        console.log(data);
    }
}
export default Socket;