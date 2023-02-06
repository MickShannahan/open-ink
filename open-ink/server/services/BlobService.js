import axios, { Axios } from 'axios'


const unblob = axios.create({
  baseURL: 'https://blobby.azurewebsites.net/',
  timeout: 10000,
})
class BlobService {

  async upload(files = [], container = "test") {

    let uploads = []
    files.forEach(f => {
      uploads.push(unblob.post(`api/blobber?container=${container}&fileName=${f.name}`, f))
    })
    let data = await Promise.all(uploads)

    return data
  }

  async delete(fileName) {
    const res = await unblob.delete(`api/endBlob?container=open-ink&fileName=${fileName}`)
    return res.data
  }

}

export const blobService = new BlobService()
