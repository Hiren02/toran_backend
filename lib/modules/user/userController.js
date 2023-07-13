import { setProductDetails } from './userService.js';
import { sendError, sendSuccess } from '../../handlers/responseHandler.js';
/**
 * *
 * @param {*} req
 * @param {*} res
 * Created Date :
 * Developer :
 */
export function login(req, res) {
  return setProductDetails(req)
    .then((result) => {
      sendSuccess(res, result);
    })
    .catch((err) => {
      sendError(res, err);
    });
}
