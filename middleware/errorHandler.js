import { ValidationError } from "joi";
import CustomErrorHandler from './../service/CustomErrorHandler';


const errorHandler = (err, req, res, next) => {
    let statuscode = 500;
    let data = {
        message: 'Internal server error',
        ...(process.env.DBUG_MODE === 'true' && { orginalerror: err.message })
    }

    if (err instanceof ValidationError) {
        statuscode = 422;
        data = {
            message: err.message
        }
    }
    if (err instanceof CustomErrorHandler) {
        statuscode = err.status;
        data = {
            message: err.message
        }

    }

    return res.status(statuscode).json(data);
}

export default errorHandler;