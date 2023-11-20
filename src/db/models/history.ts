'use strict';

import {
    Model, UUIDV4
} from 'sequelize';

interface HistoryAttributes {
    id: number;
    current: number;
    last: number;
    month: number;
    year: number;
    tax: number;
    price: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class History extends Model<HistoryAttributes>
        implements HistoryAttributes {
        id!: number;
        current!: number;
        last!: number;
        month!: number;
        year!: number;
        tax!: number;
        price!: number;
        static associate(models: any) {
        }
    };
    History.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        current: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // defaultValue: 0
        },
        last: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // defaultValue: 0
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tax: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }


    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};