/* eslint-disable no-useless-catch */
/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep} from 'lodash'


// xu li logic vao createNew
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // goi toi model de xu li ban ghi newBoard vao trong DB
    const createdBoard = await boardModel.createNew(newBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // gui noti, email cho admin khi co ban ghi newBoard vao trong DB, ...

    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    // clone board de xl tranh thay doi du lieu goc
    const resBoard = cloneDeep(board)
    // Dua card ve column cu no dung nhu api dc cung cap
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })

    // xoa card khoi boaed ban dau
    delete resBoard.cards
    return resBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}