import { asyncRequestHandler, log } from '../../decorators';

export class HelloHandler {
  @log({ query: ['hello', 'world'] })
  static hello(req, res, next) {
    return res.send('hello world from route /hello');
  }

  @asyncRequestHandler
  static async reject(req, res, next) {
    return Promise.reject('no');
  }

  static pingAuth(req, res, next) {
    res.send('You are authenticated.');
  }
}
