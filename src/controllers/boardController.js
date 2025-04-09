/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)
    const createdBoard = await boardService.createNew(req.body)

    //throw new ApiError(StatusCodes.BAD_GATEWAY, 'Toandev test error')
    res.status(StatusCodes.CREATED).json(createdBoard)

  } catch (error) {next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)
    res.status(StatusCodes.OK).json(board)

  } catch (error) {next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const updatedBoard = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(updatedBoard)

  } catch (error) {next(error)
  }
}

const moveCardToDifffrentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifffrentColumn(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const boardController = {

  createNew,
  getDetails,
  update,
  moveCardToDifffrentColumn
}