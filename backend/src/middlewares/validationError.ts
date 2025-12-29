import  {validationResult} from "express-validator"




import type {Request, Response, NextFunction} from "express"



const validationError = (req: Request, res: Response, next: NextFunction) : void => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            errors: errors.mapped()
        });
        return;
    }
    next();
};


export default validationError;