'use strict';

import {
    Model, UUIDV4
} from 'sequelize';

interface TaxAttributes {
    id: number;
    name: string;
    percent: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Tax extends Model<TaxAttributes>
        implements TaxAttributes {
        id!: number;
        name!: string;
        percent!: number;
        static associate(models: any) {
            // define association here
        }
    };
    Tax.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        percent: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Tax',
    });
    return Tax;
};