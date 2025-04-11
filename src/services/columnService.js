/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'


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

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)

    return updatedColumn
  } catch (error) { throw error }
}

const deleteItem = async (columnId) => {
  try {

    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn) throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')

    // xoa column
    await columnModel.deleteOneById(columnId)

    // xoa toan bo cards thuoc column tren
    await cardModel.deleteManyByColumnId(columnId)

    //Xoa columnId khoi columnOrderIds trong board
    await boardModel.pullColumnOderedIds(targetColumn)

    return { deleteResult: 'Column and cards deleted successfully!' }
  } catch (error) { throw error }
}

export const columnService = {
  createNew,
  update,
  deleteItem
}