import pool from '../../services/database.js';
import { requestResponse } from '../../handlers/responseHandler.js';
import { CODE, MESSAGE } from '../../constants.js';
import { sequelize as db } from '../../models/index.js';
import logger from '../../services/logging.js';
/**
 * *
 * @param {*} req
 * @param {*} res
 */
export async function setProductDetails(req, res) {

  try {
    const resultSet = await db.models.products.create(req.body);
    return requestResponse(
      CODE.success,
      MESSAGE.pageInfoStoredSuccessfully,
      resultSet,
    );
  } catch (error) {
    console.log(error);
    return requestResponse(CODE.intrnlSrvr, MESSAGE.internalServerError, error);
  }
}
