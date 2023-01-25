import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class GalleriesService {

  async getArtistGalleries(name = '') {
    const res = await api.get('api/artists/' + name + '/galleries')
    AppState.galleries = res.data
  }

  async getGalleryProjects(name, id) {
    const res = await api.get(`api/${name}/galleries/${id}/projects`)
    AppState.projects = res.data
  }

  async getGallery(name, id) {
    const res = await api.get(`api/${name}/galleries/${id}`)
    AppState.activeGallery = res.data
  }

  setActive(gallery) {
    logger.log('setting active', gallery.name)
    AppState.activeGallery = gallery
  }

}

export const galleriesService = new GalleriesService()
