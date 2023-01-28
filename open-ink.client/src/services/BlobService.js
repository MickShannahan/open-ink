import axios from "axios";
import { logger } from '../utils/Logger.js';

let unblob = axios.create({
  baseURL: 'https://blobby.azurewebsites.net/',
  // baseURL: 'http://localhost:7071/',
  timeout: 90000,
})
class BlobsService {

  async upload(file, folder = 'default', fileName) {
    fileName = fileName ? fileName : file.name
    const extension = file.name.slice(file.name.indexOf('.'))
    let data = await _convertToBlob(file, fileName, extension)
    const res = await unblob.post(`api/blobber?container=open-ink&folder=${folder}&fileName=${fileName + extension}`, data)
    // logger.log(res.data)
    return res.data
  }

}

async function _convertToBlob(raw, name, extension) {
  logger.log('converting', raw)
  let data = new FormData()
  data.append('file', raw, name + extension)
  return data
}

async function blur() {

}

export const blobsService = new BlobsService()
