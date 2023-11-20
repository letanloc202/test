import { Request, Response, NextFunction } from 'express'
import { CONST_STATUS, CONST_CODE_RES, CONST_MESS_RES } from '../../helper/status'
import History from '../services/history'

const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await History.get(req.params)
        console.log(req.params)
        if (!result) return res.json({ code: CONST_CODE_RES.FAIL, message: CONST_MESS_RES.FAIL })
        else if (result.length == 0) return res.json({ code: CONST_CODE_RES.EMPTY, message: CONST_MESS_RES.EMPTY })
        return res.json({ code: CONST_CODE_RES.SUCCESS, message: CONST_MESS_RES.SUCCESS, data: result })
    } catch (err) {
        const error: any = err; // History assertion to any
        error.status = error.status || 400;
        return next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await History.create(req.body)
        if (typeof result == "string") return res.json({ code: CONST_CODE_RES.FAIL, message: result })

        else if (!result) return res.json({ code: CONST_CODE_RES.FAIL, message: CONST_MESS_RES.FAIL })
        // else if (result.length == 0) return res.json({ code: CONST_CODE_RES.EMPTY, message: CONST_MESS_RES.EMPTY })
        return res.json({ code: CONST_CODE_RES.SUCCESS, message: CONST_MESS_RES.SUCCESS, data: result })
    } catch (err) {
        const error: any = err; // History assertion to any
        error.status = error.status || 400;
        return next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await History.update(req.body, req.params)
        if (typeof result == "string") return res.json({ code: CONST_CODE_RES.FAIL, message: result })

        else if (!result) return res.json({ code: CONST_CODE_RES.FAIL, message: CONST_MESS_RES.FAIL })
        else if (result.length == 0) return res.json({ code: CONST_CODE_RES.EMPTY, message: CONST_MESS_RES.EMPTY })
        return res.json({ code: CONST_CODE_RES.SUCCESS, message: CONST_MESS_RES.SUCCESS, data: result })
    } catch (err) {
        const error: any = err; // History assertion to any
        error.status = error.status || 400;
        return next(error);
    }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await History.remove(req.params)
        if (!result) return res.json({ code: CONST_CODE_RES.FAIL, message: CONST_MESS_RES.FAIL })
        else if (result.length == 0) return res.json({ code: CONST_CODE_RES.EMPTY, message: CONST_MESS_RES.EMPTY })
        return res.json({ code: CONST_CODE_RES.SUCCESS, message: CONST_MESS_RES.SUCCESS, data: result })
    } catch (err) {
        const error: any = err; // History assertion to any
        error.status = error.status || 400;
        return next(error);
    }
}

const getuser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params)
        let result = await History.getUser(req.params)
        if (!result) return res.json({ code: CONST_CODE_RES.FAIL, message: CONST_MESS_RES.FAIL })
        else if (result.length == 0) return res.json({ code: CONST_CODE_RES.EMPTY, message: CONST_MESS_RES.EMPTY })
        return res.json({ code: CONST_CODE_RES.SUCCESS, message: CONST_MESS_RES.SUCCESS, data: result })
    } catch (err) {
        const error: any = err; // History assertion to any
        error.status = error.status || 400;
        return next(error);
    }
}

export default {
    get,
    create,
    update,
    remove,
    getuser
}