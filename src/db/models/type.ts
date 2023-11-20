'use strict';

import {
    Model, UUIDV4
} from 'sequelize';

interface TypeAttributes {
    id: number;
    type: string;
    is_family: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Type extends Model<TypeAttributes>
        implements TypeAttributes {
        id!: number;
        type!: string;
        is_family!: boolean;
        static associate(models: any) {
            Type.hasMany(models.Unit, { onDelete: 'RESTRICT' });
            Type.hasMany(models.User_price, { onDelete: 'RESTRICT' });
            Type.hasMany(models.Other_price, { onDelete: 'RESTRICT' });

        }
    };
    Type.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_family: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Type',
    });
    return Type;
};