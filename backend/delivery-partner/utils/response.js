import HttpStatus from './httpStatus.js';

export const sendSuccess = (res, data = {}, code = HttpStatus.SUCCESS) => {
    res.status(code).json({
        success: true,
        code,
        data
    });
};

export const sendError = (res, message = 'Something went wrong', code = HttpStatus.INTERNAL_SERVER_ERROR) => {
    res.status(code).json({
        success: false,
        code,
        message
    });
};
