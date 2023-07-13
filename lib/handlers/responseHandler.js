export function hndlError(err, req, res, next) {
  sendError(res, err);
}

export function sendError(res, err) {
  if (!err.code) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server err',
      data: null,
    });
  }
  return res.status(err.code).json({
    code: err.code,
    message: err.message,
    data: err.data,
  });
}

export function sendSuccess(res, rslt) {
  return res.status(rslt.code).json({
    code: rslt.code,
    message: rslt.message,
    data: rslt.data,
  });
}

/** Request Response
 *
 * @param {string} message response message
 *  @param {object} data response Data
 */
export function requestResponse(code, message, data) {
  var responseObj = {
    code: code,
    message: message,
    data: data,
  };
  return responseObj;
}

export function responseMapping(code, msg) {
  return {
    code: code,
    message: msg,
  };
}

export function responseMappingWithData(code, msg, data) {
  return {
    code: code,
    message: msg,
    data: data,
  };
}
