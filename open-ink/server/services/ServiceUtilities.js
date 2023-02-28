import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"


export async function checkAgainstMax(resource, query = {}, max, pops = '') {
  let items = await dbContext[resource].count(query)
  if (items >= max) throw new Forbidden(`You are at max ${resource} Allowed.`)
  return items
}
