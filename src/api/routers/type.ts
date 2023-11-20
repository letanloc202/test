import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import Type from '../../app/controllers/type'
// them xoa sua...
const route = Router()

export default (app: Router): void => {
    const api = '/api/type'
    app.use(route)

    route.get(api, Type.get)

    route.get(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        })
    }), Type.get)

    route.post(api, celebrate({
        body: Joi.object({
            type: Joi.string(),
            is_family: Joi.bool()
        })
    }), Type.create)

    route.put(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
        body: {
            type: Joi.string(),
            is_family: Joi.bool()
        }
    }), Type.update)

    route.delete(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
    }), Type.remove)
}