const server = require('./server');
const pidusage = require('pidusage');

class ThekdarUi {
  constructor(configs) {
    this.configs = { pidUsage: true, pidUsagePingTime: 30000, ...configs };
    this.thekdar = null;
  }
  apply(thekdar) {
    if (ThekdarUi.IS_PLUGGED) {
      console.warn('Thekdar ui has already plugged.');
      return;
    }
    this.thekdar = thekdar;
    this.thekdar.on('info', this.handleThekdarInfoMessage.bind(this));
    this.startServer();
    ThekdarUi.IS_PLUGGED = true;
    if (this.configs.pidUsage) {
      this.pidUsage();
    }
  }
  pidUsage() {
    setInterval(() => {
      const workers = [];
      Array.from(this.thekdar._workers.values()).forEach(type => {
        Array.from(type.values()).forEach(worker => {
          workers.push({
            id: worker._id,
            pid: worker._worker.pid,
          });
        });
      });
      workers.forEach(worker => {
        pidusage(worker.pid, (err, usage) => {
          if (err) return;
          this.io.emit('info', {
            type: 'usage',
            workerId: worker.id,
            usage,
          });
          // => {
          //   cpu: 10.0,            // percentage (it may happen to be greater than 100%)
          //   memory: 357306368,    // bytes
          //   ppid: 312,            // PPID
          //   pid: 727,             // PID
          //   ctime: 867000,        // ms user + system time
          //   elapsed: 6650000,     // ms since the start of the process
          //   timestamp: 864000000  // ms since epoch
          // }
        });
      });
    }, this.configs.pidUsagePingTime);
  }
  handleThekdarInfoMessage(data) {
    if (this.io) {
      this.io.emit('info', data);
    }
  }

  startServer() {
    server(this, io => {
      this.io = io;
    });
  }
}

ThekdarUi.IS_PLUGGED = false;
module.exports = ThekdarUi;
