import { error } from 'console';
import db from '../../db/models'
import { Logger } from '@nestjs/common';
import { where } from 'sequelize';


const get = async (data: any) => {
    let { id } = data
    let objCondition: { [key: string]: any } = {}
    if (id) objCondition['id'] = id
    const results = await db.History.findAll({ where: objCondition })
    return results
}

const create = async (data: any) => {
    let { last, current, UnitId } = data
    if (!(current && last && UnitId)) {
        return "THIS POST REQUIRE current && last && UnitId"
    }
    if (current < last) {
        return "CURRENT WATER CAN'T LOWER THAN LAST WATER"
    }

    var [person, typeid] = await generate_unit(UnitId)

    if (!typeid) {
        return "UNIT NOT FOUND"
    }
    var [is_family] = await getTypeid(typeid)


    let price = await getPrice(is_family, typeid, person)

    if (!price) {
        return "NOT FOUND PRICE"

    }
    const number_water = current - last
    var tax = await getTax()

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;  // Adding 1 because months are zero-based (0-11)
    var currentYear = currentDate.getFullYear();

    if (is_family) {
        let water_price = 0
        let period_arr = price[0]
        let price_arr = price[1]
        let water_temp = number_water
        let total = 0
        console.log(period_arr)
        for (let i = 0; i < period_arr.length; i++) {
            if (water_temp <= 0) {
                break
            }
            if ((water_temp < period_arr[i + 1] - period_arr[i]) || (i == period_arr.length - 1)) {
                water_price = water_price + water_temp * price_arr[i]
                water_temp = 0
                break
            }
            let now = period_arr[i + 1] - period_arr[i]
            water_price = water_price + now * price_arr[i]
            water_temp = water_temp - now
            console.log(water_price)
        }
        let tax_val = 0

        for (var val of tax) {
            tax_val = tax_val + val
        }

        tax_val = tax_val * water_price
        total = water_price - tax_val

        var result = await db.History.create({
            last: last,
            current: current,
            month: currentMonth,
            year: currentYear,
            price: water_price,
            tax: tax_val,
            UnitId: UnitId
        })


        return result
    }
    else {
        let water_price = 0
        let tax_val = 0
        let total = 0
        water_price = price * number_water

        for (var val of tax) {
            tax_val = tax_val + val
        }
        console.log(tax_val)
        tax_val = tax_val * water_price
        total = water_price - tax_val

        console.log(`total : ${total} tax : ${tax_val}`)

        var result = await db.History.create({
            last: last,
            current: current,
            month: currentMonth,
            year: currentYear,
            price: water_price,
            tax: tax_val,
            UnitId: UnitId
        },)
        return result
    }

}

async function getPrice(is_family: boolean, typeid: number, number_user: number) {
    if (is_family) {
        var price = await db.User_price.findAll({
            where: {
                TypeId: typeid
            }, order: [
                ['period', 'ASC']
            ],
            attributes: ['period', 'price'],
            logging: false
        }).then((data: any) => {
            if (!data) {
                return []
            }
            let rows = JSON.stringify(data)
            rows = JSON.parse(rows)
            let period: any[] = []
            let price = []

            for (let val of rows) {
                var obj
                try {

                    obj = JSON.parse(val);
                }
                catch {
                    obj = val
                }
                period.push(obj.period * number_user)
                price.push(obj.price)
            }
            return [period, price]
        })
        return price
    }
    else {
        var price = await db.Other_price.findOne({
            where: {
                TypeId: typeid
            },
            attributes: ['price'], logging: false
        }).then((data: any) => {
            if (!data) {
                return []
            }
            let rows = JSON.stringify(data)
            rows = JSON.parse(rows)
            return data.dataValues.price
        })
        return price

    }
}

async function getTax() {
    return await db.Tax.findAll({
        attributes: ['percent'], logging: false

    }).then((data: any) => {
        if (!data) {
            return [0]
        }
        let rows = JSON.stringify(data)
        rows = JSON.parse(rows)
        return data.map((rows: { percent: any; }) => rows.percent);
    })

}

async function getTypeid(Typeid: number) {
    const typeqr = await db.Type.findOne({
        where: {
            id: Typeid
        }, logging: false
    }).then(((data: any) => {
        if (data) {
            return [data.dataValues.is_family]
        }
        else {
            return []
        }
    }))
    return typeqr
}

async function generate_unit(UnitId: number) {
    const unitpr = await db.Unit.findOne({
        where: {
            id: UnitId
        }
    }).then(((data: any) => {
        if (data) {
            console.log(data.dataValues)
            return [data.dataValues.person, data.dataValues.TypeId]
        }
        else {
            return []
        }
    }))

    return unitpr
}

const update = async (data_body: any, data_param: any) => {
    let { name, percent } = data_body
    let { id } = data_param

    const nameisexits = await db.History.findOne({
        where: {
            name: name
        }
    }).then(((data: any) => {
        if (data) {
            return data.dataValues.id
        }
        else {
            return data
        }
    }))

    if (nameisexits) {
        return "NAME IS EXISTS"
    }

    const results = await db.History.update({
        name: name,
        percent: percent
    }, {
        where: {
            id: id,
        },
    })
    return results
}

const remove = async (data_param: any) => {
    let { id } = data_param

    const results = await db.History.destroy({
        where: {
            id: id
        }
    })
    return results
}

const getUser = async (data: any) => {
    let { UnitId, month, year } = data
    let objCondition: { [key: string]: any } = {}
    if (UnitId) objCondition['UnitId'] = UnitId
    if (month) objCondition['month'] = month
    if (year) objCondition['year'] = year

    const results = await db.History.findAll({ where: objCondition })
    return results
}

export default {
    get,
    create,
    update,
    remove,
    getUser
}