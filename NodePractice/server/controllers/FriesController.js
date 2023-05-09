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
    .delete('/:friesId', this.getFriesById)
  }
  createFries(arg0, createFries) {
    throw new Error("Method not implemented.")
  }
  getFriesById(arg0, getFriesById) {
    throw new Error("Method not implemented.")
  }
  getAllFries(arg0, getAllFries) {
    throw new Error("Method not implemented.")
  }
}