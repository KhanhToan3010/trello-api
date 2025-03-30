/* eslint-disable no-useless-catch */
/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

// xu li logic vao createNew
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // goi toi model de xu li ban ghi newBoard vao trong DB
    const createdBoard = await boardModel.createNew(newBoard)
    //console.log(createdBoard)
    // Lay ban ghi board sau khi goi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    //console.log(getNewBoard)
    // gui noti, email cho admin khi co ban ghi newBoard vao trong DB, ...

    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}