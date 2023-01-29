import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async update(account) {
    const res = await api.put('/account', account)
    AppState.account = res.data
  }

  async saveTheme(theme) {
    theme = theme ? theme : AppState.artist.theme
    const res = await api.put('account/theme', theme)
    logger.log('theme update', res.data)
  }
}

export const accountService = new AccountService()
