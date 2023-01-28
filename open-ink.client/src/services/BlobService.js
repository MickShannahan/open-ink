import axios from "axios";
import { logger } from '../utils/Logger.js';

let unblob = axios.create({
  baseURL: 'https://blobby.azurewebsites.net/',
  // baseURL: 'http://localhost:7071/',
  timeout: 90000,
})
class BlobsService {

  async upload(file) {
    let data = await _convertToBlob(file)
    const res = await unblob.post('api/blobber?container=open-ink&fileName=' + file.name, data)
    // logger.log(res.data)
    return res.data
  }

}

async function _convertToBlob(raw) {
  let data = new FormData()
  data.append('file', raw, raw.name)
  return data
}

async function blur() {

}

export const blobsService = new BlobsService()
