import { dbContext } from '../db/DbContext'
import { burgersService } from "./BurgersService.js"
import { drinksService } from "./DrinksService.js"
import { friesService } from "./FriesService.js"

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    if(typeof user.name == 'string' && user.name.includes('@')){
      user.name = user.nickname
    }
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }

  async getMyOrder(userId){
    let burgers = await burgersService.getMyOrderedBurgers(userId)
    let drinks = await drinksService.getMyOrderedDrinks(userId)
    let fries = await friesService.getMyOrderedFries(userId)
    let order = [...burgers, ...drinks, ...fries]
    return order
  }

  async checkOut(userId){
    let burgers = await burgersService.getMyOrderedBurgers(userId)
    let drinks = await drinksService.getMyOrderedDrinks(userId)
    let fries = await friesService.getMyOrderedFries(userId)
    burgers.forEach(burger => {
      burger.checkedOut = true
      burger.save()
    })
    drinks.forEach(drink => {
      drink.checkedOut = true
      drink.save()
    })
    fries.forEach(fries => {
      fries.checkedOut = true
      fries.save()
    })
    return `Successfully checked your order out!`
  }
}
export const accountService = new AccountService()
