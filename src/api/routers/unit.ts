import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import Unit from '../../app/controllers/unit'
const route = Router()

export default (app: Router): void => {
    const api = '/api/unit'
    app.use(route)
    route.get(api, Unit.get)
    route.get(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        })
    }), Unit.get)


    route.post(api, celebrate({
        body: Joi.object({
            type: Joi.string(),
            person: Joi.number()
        })
    }), Unit.create)

    route.put(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
        body: {
            type: Joi.string(),
            person: Joi.number()
        }
    }), Unit.update)

    route.delete(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
    }), Unit.remove)
}