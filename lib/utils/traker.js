import pool from '../services/database.js';
/**
 * * Check if user exists or not
 * @param {*} ipAddress
 * @returns
 */
export async function checkUserExist(ipAddress) {
  let resultSet;
  const checkUserExist = await pool.query(
    'SELECT * FROM users where ipaddress= $1',
    [ipAddress],
  );
  if (checkUserExist.rows.length > 0) {
    resultSet = checkUserExist.rows[0];
  }
  return resultSet;
}

/**
 * * Store user infomation.
 * @param {*} ipAddress
 * @param {*} userAgent
 * @returns
 */
export async function storeUserInfo(ipAddress, userAgent) {
  let resultSet;
  const result = await pool.query(
    'INSERT INTO users (ipaddress, useragent) VALUES ($1, $2) RETURNING *',
    [ipAddress, userAgent],
  );
  resultSet = result.rows[0];
  return resultSet;
}

/**
 * * To fetch page information
 * @param {*} pageURl
 * @param {*} userId
 * @returns
 */
export async function fetchPageInfo(pageURl, userId) {
  return await pool.query(
    'SELECT * FROM pageinfo where  pageurl=$1 AND userid=$2',
    [pageURl, userId],
  );
}

/**
 * * Check requested code is our code or not
 * @param {*} gcode
 * @returns
 */
export async function checkDiscountCode(discountCode) {
  let resultSet;
  const disCode = await pool.query(
    'SELECT * FROM discountcodes where  code=$1',
    [discountCode],
  );
  if (disCode.rows.length > 0) {
    resultSet = disCode.rows[0];
  }
  return resultSet;
}

/**
 * * store orderinfo
 * @param {*} userId
 * @param {*} pageId
 * @param {*} checkoutAmount
 * @param {*} discountCode
 * @returns
 */
export async function storeOrderInfo(
  orderId,
  userId,
  pageURl,
  checkoutAmount,
  discountCode,
) {
  let resultSet;
  const createdat = new Date();
  const result = await pool.query(
    'INSERT INTO orderinfo (userid, pageURl, amount, discountcode,orderid,createdat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [userId, pageURl, checkoutAmount, discountCode, orderId, createdat],
  );
  resultSet = result.rows[0];
  return resultSet;
}
