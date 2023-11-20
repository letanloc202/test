import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import History from '../../app/controllers/history'
const route = Router()

export default (app: Router): void => {
    const api = '/api/history'
    app.use(route)

    route.get(api, History.get)

    route.get(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        })
    }), History.get)

    route.get(api + '/unit/:UnitId', celebrate({
        params: Joi.object({
            UnitId: Joi.number(),
        })
    }), History.getuser)


    route.get(api + '/unit/:UnitId/:month', celebrate({
        params: Joi.object({
            UnitId: Joi.number(),
            month: Joi.number(),
        })
    }), History.getuser)

    route.get(api + '/unit/:UnitId/:month/:year', celebrate({
        params: Joi.object({
            UnitId: Joi.number(),
            month: Joi.number(),
            year: Joi.number(),

        })
    }), History.getuser)

    route.post(api, celebrate({
        body: Joi.object({
            last: Joi.number(),
            current: Joi.number(),
            UnitId: Joi.number(),
        })
    }), History.create)

    route.put(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
        body: {
            price: Joi.number(),
            type: Joi.string(),
        }
    }), History.update)

    route.delete(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
    }), History.remove)

}