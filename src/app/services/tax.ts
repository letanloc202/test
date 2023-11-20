import { error } from 'console';
import db from '../../db/models'
import { Logger } from '@nestjs/common';


const get = async (data: any) => {
    let { id } = data
    let objCondition: { [key: string]: any } = {}
    if (id) objCondition['id'] = id
    const results = await db.Tax.findAll({ where: objCondition })
    return results
}

const create = async (data: any) => {
    let { name, percent } = data
    const nameisexits = await db.Tax.findOne({
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
    const results = await db.Tax.create({
        name: name,
        percent: percent
    })
    return results
}

const update = async (data_body: any, data_param: any) => {
    let { name, percent } = data_body
    let { id } = data_param

    const nameisexits = await db.Tax.findOne({
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

    const results = await db.Tax.update({
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

    const results = await db.Tax.destroy({
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