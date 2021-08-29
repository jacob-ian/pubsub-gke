import { request } from "express";
import { Api } from "./Api";

describe("Api", () => {
  let api: Api;

  afterEach(() => {
    if (api) {
      api.stop();
    }
  });

  describe("Test listen()", () => {
    console.log = jest.fn().mockImplementation(() => {});

    beforeEach((done) => {
      api = new Api(8080);
      api.listen(done);
    });

    it("Should log the date and the port number on listen", () => {
      expect(console.log).toHaveBeenCalledTimes(2);
    });
  });
});
