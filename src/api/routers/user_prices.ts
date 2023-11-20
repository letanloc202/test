import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import User from '../../app/controllers/user_prices'
const route = Router()

export default (app: Router): void => {
    const api = '/api/userprice'
    app.use(route)

    route.get(api, User.get)

    route.get(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        })
    }), User.get)

    route.post(api, celebrate({
        body: Joi.object({
            price: Joi.number(),
            period: Joi.number(),
            type: Joi.string(),
        })
    }), User.create)

    route.put(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
        body: {
            price: Joi.number(),
            period: Joi.number(),
            type: Joi.string(),
        }
    }), User.update)

    route.delete(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
    }), User.remove)
}