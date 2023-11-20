import { error } from 'console';
import db from '../../db/models'
import { Logger } from '@nestjs/common';
import { where } from 'sequelize';


const get = async (data: any) => {
    let { id } = data
    let objCondition: { [key: string]: any } = {}
    if (id) objCondition['id'] = id
    const results = await db.User_price.findAll({ where: objCondition })
    return results
}

const create = async (data: any) => {
    let { price, period, type } = data
    const [typeqr, is_family] = await db.Type.findOne({
        where: {
            type: type
        }
    }).then(((data: any) => {
        if (data) {
            return [data.dataValues.id, data.dataValues.is_family]
        }
        else {
            return data
        }
    }))

    if (!is_family) {
        return "THIS IS OTHER UNIT NOT USER"
    }

    if (typeqr) {
        const results = await db.User_price.create({
            price: price,
            period: period,
            TypeId: typeqr
        })
        return results
    }
    else {
        return 'WRONG TYPE'
    }
}

const update = async (data_body: any, data_param: any) => {
    let { price, period, type } = data_body
    let { id } = data_param


    const typeqr = await db.Type.findOne({
        where: {
            type: type
        }
    }).then(((data: any) => {
        if (data) {
            return data.dataValues.id
        }
        else {
            return data
        }
    }))
    const idfound = await db.User_price.findOne({
        where: {
            id: id
        }
    }).then(((data: any) => {
        if (data) {
            return data.dataValues.id
        }
        else {
            return data
        }
    }))
    if (!idfound) {
        return 'ID NOT FOUND'
    }
    if (!typeqr) {
        return 'WRONG TYPE'
    }

    var results = await db.User_price.update({
        price: price,
        period: period,
        TypeId: typeqr
    }, {
        where: {
            id: id
        }
    })
    return results
}

const remove = async (data_param: any) => {
    let { id } = data_param

    const results = await db.User_price.destroy({
        where: {
            id: id
        }
    })
    return results
}


export default {
    get,
    create,
    update,
    remove
}