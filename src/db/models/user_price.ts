'use strict';

import {
    Model
} from 'sequelize';

interface UserPriceAttributes {
    id: number;
    // type: number;
    period: number;
    price: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User_price extends Model<UserPriceAttributes>
        implements UserPriceAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        // type!: number;
        period!: number;
        price!: number;

        static associate(models: any) {
            // define association here
        }
    };
    User_price.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // type: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'Types',
        //         key: 'id'
        //     }
        // },
        period: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,

        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        }
    }, {
        sequelize,
        modelName: 'User_price',
    });
    return User_price;
};