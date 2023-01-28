import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { blobsService } from "./BlobService.js"


class PiecesService {

  async addPieces(rawFiles, account) {
    const endRX = /.jpg|.jpeg|.png|.webp|.gif/
    const uploads = []
    rawFiles.forEach(async (f) => {
      if (f.fileName.match(endRX)) f.fileName = f.fileName.slice(0, f.fileName.indexOf('.'))
      const prom = blobsService.upload(f.file, account.id, f.fileName)
      uploads.push(prom)
    })

    let pieces = await Promise.all(uploads)
    logger.log('completed pieces', pieces)
    const creates = []
    pieces.forEach(p => {
      p.imgUrl = p.url
      p.galleryId = AppState.activeGallery.id
      p.projectId = AppState.activeProject.id
      creates.push(this.addPiece(p))
    })
    await Promise.all(creates)
    return creates
  }

  async addPiece(newPiece) {
    const account = AppState.account
    const res = await api.post(`api/${account.userName}/pieces`, newPiece)
    AppState.pieces.push(res.data)
  }

}

export const piecesService = new PiecesService()