import { dbContext } from "../db/DbContext.js"
import { BadRequest} from '../utils/Errors.js'


class ArtistsService {
  async getArtist(query) {
    const artist = await dbContext.Account.findOne(query).populate('theme')
    if(!artist) throw new BadRequest(`No artist username @ ${query.username}`)
    delete artist.email
    return artist
  }

}

export const artistsService = new ArtistsService()
