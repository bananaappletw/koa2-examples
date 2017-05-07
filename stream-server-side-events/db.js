const Readable = require('stream').Readable;
const inherits = require('util').inherits;

/**
 * Returns a new subscription event event.
 * Real APIs would care about the `event`.
 */

exports.subscribe = (event, options) => Subscription(options);

/**
 * Subscription stream. Just increments the result.
 * Never ends!
 */

inherits(Subscription, Readable);

function Subscription(options) {
  if (!(this instanceof Subscription)) return new Subscription(options);

  options = options || {};
  Readable.call(this, options);

  this.value = 0;
}

Subscription.prototype._read = function() {
  while (this.push(String(this.value++))) {/*NOP*/}
};
