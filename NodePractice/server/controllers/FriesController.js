import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"


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
  deleteFriesById(req, res, next) {
    throw new Error("Method not implemented.")
  }
  createFries(req, res, next) {
    throw new Error("Method not implemented.")
  }
  getFriesById(req, res, next) {
    throw new Error("Method not implemented.")
  }
  getAllFries(req, res, next) {
    throw new Error("Method not implemented.")
  }
}