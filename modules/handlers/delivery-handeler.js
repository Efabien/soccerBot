const util=require('util');
const events=require('events');
const EventEmitter=events.EventEmitter;

const Watcher = class {
	capture(input) {
		this.emit('delivered', input);
	}
}
util.inherits(Watcher, EventEmitter);
module.exports = new Watcher();