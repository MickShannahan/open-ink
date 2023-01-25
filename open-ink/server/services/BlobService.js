import axios from "axios"

const unblob = axios.create({
  baseURL: 'https://blobber.azurewebsites.net/',
  timeout: 10000
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

}

const blobService = new BlobService()
