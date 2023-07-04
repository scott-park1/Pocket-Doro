import request from 'superagent'

import { TimePreference, UpdateTimePreference } from '../../models/timer'

const rootUrl = '/api/v1/timer'

export async function getTimerSettings(): Promise<TimePreference[]> {
  return request
    .get(`${rootUrl}`)
    .then((res) => res.body)
    .catch(Error)
}

/*const recipeURL = '/api/v1/recipe'
// GET /api/v1/recipe/:recipeId
export async function getRecipeById(recipeId: string): Promise<Recipe> {
  const response = await request.get(`${rootUrl}/${id}`)
  return response.body.recipe
}*/
