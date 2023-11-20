import { error } from 'console';
import db from '../../db/models'
import { Logger } from '@nestjs/common';
import { where } from 'sequelize';


const get = async (data: any) => {
    let { id } = data
    let objCondition: { [key: string]: any } = {}
    if (id) objCondition['id'] = id
    const results = await db.Unit.findAll({ where: objCondition })
    return results
}

const create = async (data: any) => {
    let { type, person } = data

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

    if (is_family && !person) {
        return "THIS IS FAMILY, IT NEED PERSON"
    }
    if (!is_family && person) {
        return "THIS IS OTHER, IT DON'T NEED PERSON"
    }

    if (typeqr) {
        if (person) {
            return await db.Unit.create({
                person: person,
                TypeId: typeqr
            })

        }
        else {
            return await db.Unit.create({
                TypeId: typeqr
            })
        }
    }
    else {
        return 'WRONG TYPE'
    }
}

const update = async (data_body: any, data_param: any) => {
    let { type, person } = data_body
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
    const idfound = await db.Unit.findOne({
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

    var results = await db.Unit.update({
        person: person,
        TypeId: typeqr,
    }, {
        where: {
            id: id
        }
    })

    return results
}

const remove = async (data_param: any) => {
    let { id } = data_param

    const results = await db.Unit.destroy({
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