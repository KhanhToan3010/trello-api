/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
export const WHITELIST_DOMAINS = [
  //'http://localhost:5173' - ko can cho phep local dev vi o file cors.js env.BUILD_MODE=dev --> next
  // sau khi deploy FE thi truyen duong dan duoc access vao day
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}