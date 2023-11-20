import { error } from 'console';
import db from '../../db/models'
import { Logger } from '@nestjs/common';


const get = async (data: any) => {
    let { id } = data
    let objCondition: { [key: string]: any } = {}
    if (id) objCondition['id'] = id
    const results = await db.Type.findAll({ where: objCondition })
    return results
}

const create = async (data: any) => {
    let { type, is_family } = data

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

    if (typeqr) {
        return "TYPE EXISTS"
    }


    const results = await db.Type.create({
        type: type,
        is_family: is_family
    })
    return results
}

const update = async (data_body: any, data_param: any) => {
    let { type, is_family } = data_body
    let { id } = data_param

    // const typeqr = await db.Type.findOne({
    //     where: {
    //         type: type
    //     }
    // }).then(((data: any) => {
    //     if (data) {
    //         return data.dataValues.id
    //     }
    //     else {
    //         return data
    //     }
    // }))

    // if (typeqr) {
    //     return "TYPE EXISTS"
    // }


    const results = await db.Type.update({
        type: type,
        is_family: is_family
    }, {
        where: {
            id: id,
        },
    })
    return results
}

const remove = async (data_param: any) => {
    let { id } = data_param

    const results = await db.Type.destroy({
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