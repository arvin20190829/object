import Mock from 'mockjs'
import { param2Obj } from '@/utils'

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

let mocks = []
modulesFiles.keys().reduce((module, modulePath) => {
  const value = modulesFiles(modulePath)
  mocks = mocks.concat(value.default)
}, {})

export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => ({
  url: new RegExp(`/mock${url}`),
  type: type || 'get',
  response(req, res) {
    res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
  }
})

export default mocks.map(route => responseFake(route.url, route.type, route.response))

