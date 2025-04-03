/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'


// xu li logic vao createNew
const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    // goi toi model de xu li ban ghi newColumn vao trong DB
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
    // gui noti, email cho admin khi co ban ghi newColumn vao trong DB, ...

    if (getNewColumn) {
      getNewColumn.cards = []

      await boardModel.pushColumnOderedIds(getNewColumn)
    }
    return getNewColumn
  } catch (error) { throw error }
}

export const columnService = {
  createNew
}