import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import Other from '../../app/controllers/other_prices'
const route = Router()

export default (app: Router): void => {
    const api = '/api/otherprice'
    app.use(route)


    route.get(api, Other.get)

    route.get(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        })
    }), Other.get)

    route.post(api, celebrate({
        body: Joi.object({
            price: Joi.number(),
            type: Joi.string(),
        })
    }), Other.create)

    route.put(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
        body: {
            price: Joi.number(),
            type: Joi.string(),
        }
    }), Other.update)

    route.delete(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
    }), Other.remove)
}