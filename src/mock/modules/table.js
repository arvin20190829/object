import Mock from 'mockjs'

const { Random } = Mock
const list = []
Mock.setup({
  timeout: '2000-6000'
})
for (let i = 0; i < 456; i++) {
  list.push({
    name: Random.cname(),
    date: Random.date('yyyy-MM-dd'),
    address: Random.county(true)
  })
}
export default [{
  url: '/table/getData\.*',
  type: 'get',
  response: (config) => {
    let { limt, offset } = config.query
    limt = parseInt(limt)
    offset = parseInt(offset)
    if (typeof (limt) !== 'number' || limt < 0) {
      return {
        code: -1,
        items: null,
        message: '步长错误'
      }
    }
    if (typeof (offset) !== 'number' || offset < 0) {
      return {
        code: -1,
        items: null,
        message: '起始位置错误'
      }
    }

    return {
      code: 0,
      items: {
        total: list.length,
        entry: list.splice(offset, limt)
      },
      message: ''

    }
  }

}]
