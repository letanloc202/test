'use strict';

import {
    Model
} from 'sequelize';

interface UserPriceAttributes {
    id: number;
    price: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Other_price extends Model<UserPriceAttributes>
        implements UserPriceAttributes {

        id!: number;
        price!: number;

        static associate(models: any) {
            // define association here
        }
    };
    Other_price.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }, {
        sequelize,
        modelName: 'Other_price',
    });
    return Other_price;
};