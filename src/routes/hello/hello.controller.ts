import { asyncRequestHandler, log } from "../../decorators";

export class HelloController {
  @log({ query: ["hello", "world"] })
  hello(req, res, next) {
    return res.send("hello world from route /hello");
  }

  @asyncRequestHandler
  async reject(req, res, next) {
    return Promise.reject("no");
  }
}
