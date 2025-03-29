/* eslint-disable no-useless-catch */
/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters'

// xu li logic vao createNew
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // goi toi model de xu li ban ghi newBoard vao trong DB
    // gui noti, email cho admin khi co ban ghi newBoard vao trong DB, ...

    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}