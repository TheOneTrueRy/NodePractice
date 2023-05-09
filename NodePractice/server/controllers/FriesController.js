import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { friesService } from "../services/FriesService.js"


export class FiresController extends BaseController{
  constructor(){
    super()
    this.router
    .get('', this.getAllFries)
    .get('/:friesId', this.getFriesById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createFries)
    .delete('/:friesId', this.deleteFriesById)
  }
  async deleteFriesById(req, res, next) {
    try {
      const user = req.user
      const friesId = req.params.friesId
      const fries = await friesService.deleteFriesById(friesId, user.id)
      res.send(fries)
    } catch (error) {
      next(error)
    }
  }
  async createFries(req, res, next) {
    try {
      const user = req.user
      const friesData = req.body
      friesData.creatorId = user.id
      const fries = await friesService.createFries(friesData)
      res.send(fries)
    } catch (error) {
      next(error)
    }
  }
  async getFriesById(req, res, next) {
    try {
      const friesId = req.params.friesId
      const fries = await friesService.getFriesById(friesId)
      res.send(fries)
    } catch (error) {
      next(error)
    }
  }
  async getAllFries(req, res, next) {
    try {
      const fries = await friesService.getAllFries()
      res.send(fries)
    } catch (error) {
      next(error)
    }
  }
}