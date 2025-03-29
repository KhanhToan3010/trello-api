/**
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (toandev)',
      'string.empty': 'Title is not allowed to be empty (toandev)',
      'string.min': 'Title must be at least 3 characters (toandev)',
      'string.max': 'Title must be less than 50 characters (toandev)',
      'string.trim': 'Title must be a valid string (toandev)'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict()
  })

  try {

    // set abortEarly to false to allow validation to continue
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate success -> cho request next ( controller )
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
    // eslint-disable-next-line no-console
    // console.log(error)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

export const boardValidation = {
  createNew
}