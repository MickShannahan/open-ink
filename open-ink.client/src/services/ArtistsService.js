import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class ArtistsService {

  async getArtist(name) {
    const res = await api.get('api/artists/' + name)
    AppState.artist = res.data
  }

}

export const artistsService = new ArtistsService()
