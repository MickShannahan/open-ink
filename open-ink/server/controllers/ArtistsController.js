import { artistsService } from "../services/ArtistsService.js";
import { galleriesService } from "../services/GalleriesService.js";
import BaseController, { attachUser } from "../utils/BaseController.js";



export class ArtistsController extends BaseController {
  constructor() {
    super('api/artists')
    this.router
      .use(attachUser)
      .get('/:name', this.getArtist)
      .get('/:name/galleries', this.getArtistGalleries)
  }

  async getArtist(req, res, next) {
    try {
      const artist = await artistsService.getArtist({ username: req.params.name })
      return res.send(artist)
    } catch (error) {
      next(error)
    }
  }

  async getArtistGalleries(req, res, next) {
    try {
      const artist = await artistsService.getArtist({ username: req.params.name })
      const galleries = await galleriesService.getAll({ ownerId: artist.id }, req.userInfo)
      return res.send(galleries)
    } catch (error) {
      next(error)
    }
  }
}
