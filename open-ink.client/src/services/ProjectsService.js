import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProjectsService {

  async getProjectPieces(artist, id) {
    AppState.pieces = []
    const res = await api.get(`api/${artist}/projects/${id}/pieces`)
    logger.log('[Get Pieces]', res.data)
    AppState.pieces = res.data
  }

  async setActiveProject(project) {
    AppState.activeProject = project
  }

}

export const projectsService = new ProjectsService()
