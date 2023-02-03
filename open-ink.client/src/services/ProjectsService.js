import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProjectsService {

  async createProject(newProject) {
    const account = AppState.account
    const res = await api.post(`api/${account.username}/projects`, newProject)
    AppState.projects.push(res.data)
    return res.data
  }

  async getProjectPieces(artist, id) {
    AppState.pieces = []
    const res = await api.get(`api/${artist}/projects/${id}/pieces`)
    logger.log('[Get Pieces]', res.data)
    AppState.pieces = res.data
  }

  async update(project) {
    const account = AppState.account
    const res = await api.put(`api/${account.username}/projects/${project.id}`, project)
    let index = AppState.projects.findIndex(pr => pr.id == project.id)
    AppState.projects.splice(index, 1, res.data)
  }

  async removeProject(id) {
    const account = AppState.account
    const res = await api.delete(`api/${account.username}/projects/${id}`)
    let index = AppState.projects.findIndex(pr => pr.id == id)
    AppState.projects.splice(index, 1)
  }

  async getRelated(id) {
    AppState.relatedProjects = []
    const artist = AppState.artist
    const res = await api.get(`api/${artist.username}/projects/${id}/related`)
    AppState.relatedProjects = res.data
  }

  async setActiveProject(project) {
    AppState.relatedProjects = []
    AppState.pieces = []
    AppState.activeProject = { ...project }
  }

}

export const projectsService = new ProjectsService()
