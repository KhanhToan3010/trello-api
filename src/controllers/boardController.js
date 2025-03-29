/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    console.log('req.query', req.query)
    console.log('req.params', req.params)

    //throw new ApiError(StatusCodes.BAD_GATEWAY, 'Toandev test error')
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: APIs creat new board' })

  } catch (error) {next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: error.message
    // })
  }
}

export const boardController = {
  createNew
}