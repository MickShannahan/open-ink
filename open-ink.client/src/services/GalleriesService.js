import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class GalleriesService {

  async createGallery(newGallery) {
    const account = AppState.account
    const res = await api.post('api/' + account.username + '/galleries', newGallery)
    AppState.galleries.push(res.data)
    return res.data
  }

  async getArtistGalleries(name = '') {
    const res = await api.get('api/artists/' + name + '/galleries')
    AppState.galleries = res.data
  }

  async getGalleryProjects(name, id) {
    AppState.projects = []
    const res = await api.get(`api/${name}/galleries/${id}/projects`)
    AppState.projects = res.data
  }

  async getGallery(name, id) {
    const res = await api.get(`api/${name}/galleries/${id}`)
    AppState.activeGallery = res.data
  }

  async removeGallery(id) {
    const account = AppState.account
    const res = await api.delete(`api/${account.username}/galleries/${id}`)
    const index = AppState.galleries.findIndex(g => g.id == id)
    AppState.galleries.splice(index, 1)
  }

  setActive(gallery) {
    logger.log('setting active', gallery.name)
    AppState.activeGallery = gallery
  }

}

export const galleriesService = new GalleriesService()
