'use strict';

const Readable = require('stream').Readable;

module.exports = class View extends Readable {

  constructor() {
    super();

    // render the view on a different loop
    this.render();
  }

  _read() {}

  async render() {
    // push the <head> immediately
    this.push('<!DOCTYPE html><html><head><title>Hello World</title></head>');

    // render the <body> on the next tick
    const body = await new Promise( resolve => {
      setImmediate(() => resolve('<p>Hello World</p>'));
    });
    this.push('<body>' + body + '</body>');

    // close the document
    this.push('</html>');

    // end the stream
    this.push(null);
  }
};
