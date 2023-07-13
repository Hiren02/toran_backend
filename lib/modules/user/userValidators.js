import joi from 'joi';
import csrf from 'csrf';
const tokens = new csrf();
import { SECRET_KEY } from '../../services/config.js';
import { requestResponse, sendError } from '../../handlers/responseHandler.js';
import { messages } from './userConstants.js';
import { CODE } from '../../constants.js';

export async function validateRequest(req, res, next) {
  try {
    const schema = joi.object({
      oid: joi.required().empty().messages({
        'any.required': messages.orderIdReq,
      }),
      ca: joi.required().empty().messages({
        'any.required': messages.checkoutAmtReq,
      }),
      dc: joi.required().empty().messages({
        'any.required': messages.dcReq,
      }),
      pr: joi.required().empty().messages({
        'any.required': messages.prReq,
      }),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}

export async function validateCsrf(req, res, next) {
  try {
    const token = req.headers['x-csrf-token'];

    const isvalidToken = tokens.verify(SECRET_KEY, token);

    if (!isvalidToken) {
      let error = { details: [{ message: 'CSRF token invalid' }] };
      validationErrorHandler(res, error);
    } else {
      next();
    }
  } catch (error) {
    console.log('error =', error);
    validationErrorHandler(res, error);
  }
}

function validationErrorHandler(res, error) {
  sendError(
    res,
    requestResponse(
      CODE.badRequest,
      error.details
        ? error.details[0].message
        : 'There is some issue in validation.',
      {},
    ),
  );
}

export async function loginValidation (req, res, next){
  try {
    const schema = joi.object({
      name: joi.string().required().messages({
        'any.required': messages.name,
      }),
      email: joi.string().required().messages({
        'any.required': messages.email,
      }),
      mobile_number: joi.string().required().messages({
        'any.required': messages.mobile_number,
      })
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    validationErrorHandler(res, error);
  }
}