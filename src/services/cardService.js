/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

// xu li logic vao createNew
const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }
    // goi toi model de xu li ban ghi newColumn vao trong DB
    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)
    // gui noti, email cho admin khi co ban ghi newColumn vao trong DB, ...

    if (getNewCard) {

      await columnModel.pushCardOderedIds(getNewCard)
    }

    return getNewCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew
}