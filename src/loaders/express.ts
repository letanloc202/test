import express, { Request, Response, NextFunction } from 'express'
import { isCelebrateError } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { TypeRouter, TaxRouter, HistoryRouter, UserRouter, UnitRouter, OtherPriceRouter } from '../api/index'


export default (app: any): void => {
    app.use(morgan('short'))
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '../../public')))

    app.use('/', TypeRouter())
    app.use('/', TaxRouter())
    app.use('/', HistoryRouter())
    app.use('/', UserRouter())
    app.use('/', UnitRouter())
    app.use('/', OtherPriceRouter())
    







    app.use((req: Request, res: Response, next: NextFunction) => {
        const err: any = new Error('Not Found')
        err.status = 404
        next(err)
    })

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: 'Unauthorized' }).end()
        }
        if (isCelebrateError(err)) {
            return res.status(400).send({ message: err.details.values().next().value.toString() }).end()
        }

        return res
            .status(err.status || 500)
            .json({ message: err.message })
            .end()
    })
}
