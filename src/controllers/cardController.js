/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    const createdCard = await cardService.createNew(req.body)
    //throw new ApiError(StatusCodes.BAD_GATEWAY, 'Toandev test error')
    res.status(StatusCodes.CREATED).json(createdCard)

  } catch (error) {next(error)}
}

export const cardController = {
  createNew
}