import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { blobsService } from "./BlobService.js"


class PiecesService {

  async addPieces(rawFiles, account) {
    AppState.loading = rawFiles.length * 2
    const endRX = /.jpg|.jpeg|.png|.webp|.gif/
    const uploads = []
    rawFiles.forEach(async (f) => {
      if (f.fileName.match(endRX)) f.fileName = f.fileName.slice(0, f.fileName.indexOf('.'))
      const prom = blobsService.upload(f.file, account.id, f.fileName)
      prom.then(() => AppState.loading--)
      uploads.push(prom)
    })

    let pieces = await Promise.all(uploads)
    logger.log('completed pieces', pieces)
    const creates = []
    pieces.forEach(p => {
      p.imgUrl = p.url
      p.galleryId = AppState.activeGallery.id
      p.projectId = AppState.activeProject.id
      let prom = this.addPiece(p)
      prom.then(() => AppState.loading--)
      creates.push(prom)
    })
    await Promise.all(creates)
    return creates
  }

  async addPiece(newPiece) {
    const account = AppState.account
    const res = await api.post(`api/${account.userName}/pieces`, newPiece)
    AppState.pieces.push(res.data)
  }

  async updatePiece(piece) {
    const account = AppState.account
    const res = await api.put(`api/${account.userName}/pieces/${piece.id}`, piece)
    const index = AppState.pieces.findIndex(p => p.id == piece.id)
    AppState.pieces.splice(index, 1, res.data)
  }

  async removePiece(pieceId) {
    const account = AppState.account
    const res = await api.delete(`api/${account.userName}/pieces/${pieceId}`)
    const index = AppState.pieces.findIndex(p => p.id == pieceId)
    AppState.pieces.splice(index, 1)
  }

}

export const piecesService = new PiecesService()
