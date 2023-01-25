import { dbContext } from "../db/DbContext.js"



class ArtistsService {
  async getArtist(query) {
    const artist = await dbContext.Account.findOne(query).populate('theme')
    delete artist.email
    return artist
  }

}

export const artistsService = new ArtistsService()
