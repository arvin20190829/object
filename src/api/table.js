import { get } from '@/utils/http'

export function getTableData(limt, offset) {
  if (typeof limt === 'number' && typeof offset === 'number') {
    return get(`/table/getData?limt=${limt}&offset=${offset}`)
  }

  return get('/table/getData')
}
