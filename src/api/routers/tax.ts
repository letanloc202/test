import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import Tax from '../../app/controllers/tax'
// them xoa sua...
const route = Router()

export default (app: Router): void => {
    const api = '/api/tax'
    app.use(route)

    route.get(api, Tax.get)

    route.get(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        })
    }), Tax.get)

    route.post(api, celebrate({
        body: Joi.object({
            name: Joi.string(),
            percent: Joi.number()
        })
    }), Tax.create)

    route.put(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
        body: {
            name: Joi.string(),
            percent: Joi.number()
        }
    }), Tax.update)

    route.delete(api + '/:id', celebrate({
        params: Joi.object({
            id: Joi.number()
        }),
    }), Tax.remove)
}