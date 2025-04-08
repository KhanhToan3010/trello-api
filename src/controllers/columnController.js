/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body)
    //throw new ApiError(StatusCodes.BAD_GATEWAY, 'Toandev test error')
    res.status(StatusCodes.CREATED).json(createdColumn)

  } catch (error) {next(error)}
}

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const updatedColumn = await columnService.update(columnId, req.body)

    res.status(StatusCodes.OK).json(updatedColumn)

  } catch (error) {next(error)
  }
}

export const columnController = {
  createNew,
  update
}