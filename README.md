# Koa2 Examples
 [![build status][travis-image]][travis-url]

Migrate from https://github.com/koajs/examples

  A repository containing small examples to illustrate the use of Koa2
  for creating web applications and other HTTP servers.


## Installation

Koa2 examples requires __node v7.6.0__ or higher for ES2015 and async function support.

```bash
npm install
```

# Usage

```bash
cd 404/
node app.js
```
  
# Running tests

```bash
make
```

## Included Examples

 - [404](404) - 404 handling
 - [base-auth](base-auth) - middleware base auth example
 - [blog](blog) - multi-route & view rendering
 - [body-parsing](body-parsing) - request body parsing
 - [compose](compose) - compose middlewares example
 - [conditional-middleware](conditional-middleware) - shows how middleware may be conditionally applied
 - [cookies](cookies) - cookie usage example
 - [csrf](csrf) - middleware csrf example
 - [errors](errors) - error handling & propagation
 - [flash-messages](flash-messages) - flash example
 - [hello-world](hello-world) - hello world application
 - [multipart](multipart) - multipart example downloading files using co-busboy
 - [negotiation](negotiation) - negotiation usage example
 - [stream-file](stream-file) - simple file streaming
 - [stream-objects](stream-objects) - objects streaming
 - [stream-server-side-events](stream-server-side-events) - server side events streaming
 - [stream-view](stream-view) - view streaming
 - [templates](templates) - simple view rendering
 - [upload](upload) - multi-file uploading
 - [vhost](vhost) - virtual host example

## Example Repositories

 - [koa2-example](https://github.com/17koa/koa2-example)
 - [koa2-example-app](https://github.com/OrKoN/koa2-example-app)
 - [simple-koa2-example](https://github.com/chentsulin/simple-koa2-example)

## Boilerplates

 - [koa2-boilerplate](https://github.com/geekplux/koa2-boilerplate) - A minimal boilerplate of koa v2 development

[travis-image]: https://travis-ci.org/bananaappletw/koa2-examples.svg?branch=master
[travis-url]: https://travis-ci.org/bananaappletw/koa2-examples

