/**
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs get list boards' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: ' APIs creat new board ' })
  })

export const boardRoutes = Router