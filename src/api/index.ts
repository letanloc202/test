import { Router } from 'express'
import product from './routers/type'
import tax from './routers/tax'
import history from './routers/history'
import other_price from './routers/other_prices'
import user_price from './routers/user_prices'
import unit from './routers/unit'


const TypeRouter = () => {
    const type_router = Router()
    product(type_router)
    return type_router
}

const TaxRouter = () => {
    const tax_router = Router()
    tax(tax_router)
    return tax_router
}

const HistoryRouter = () => {
    const history_router = Router()
    history(history_router)
    return history_router
}


const OtherPriceRouter = () => {
    const other_router = Router()
    other_price(other_router)
    return other_router
}

const UserRouter = () => {
    const User_router = Router()
    user_price(User_router)
    return User_router
}

const UnitRouter = () => {
    const Unit_router = Router()
    unit(Unit_router)
    return Unit_router
}

export { TypeRouter, TaxRouter, HistoryRouter, UserRouter, UnitRouter, OtherPriceRouter }
