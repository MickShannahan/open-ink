import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { hours, minutes } from "../utils/time.js"

let tkn = 'open_ink_age_token'
const expiration = 24 * hours
class MatureService {
  ageToken = null

  getToken() {
    if (this.ageToken) return this.ageToken

    let data = JSON.parse(localStorage.getItem(tkn))
    if (data != null) {
      this.ageToken = data
    }
    return this.ageToken
  }

  async confirmToken() {
    let token = this.getToken()
    logger.log('checking token', token)
    if (!token || new Date().getTime() - new Date(token?.timestamp).getTime() > expiration) {
      logger.log('confirming token', new Date().getTime() - new Date(token?.timestamp).getTime())
      let confirm = await Pop.confirm("This Artist's work contains Mature content", 'please confirm you age before entering', 'Yes I am 18 or over', 'No get Me outta here', 'question')
      if (confirm) {
        this.setToken()
      } else {
        return false
      }
    }
    logger.log('age token good', new Date().getTime() - new Date(this.ageToken?.timestamp).getTime() - expiration)
    return this.ageToken
  }

  setToken() {
    this.ageToken = { timestamp: new Date() }
    localStorage.setItem(tkn, JSON.stringify(this.ageToken))
  }


}

export const matureService = new MatureService()
