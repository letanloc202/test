'use strict';

import {
    Model
} from 'sequelize';

interface UnitAttributes {
    id: number;
    person: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Unit extends Model<UnitAttributes>
        implements UnitAttributes {
        id!: number;
        person!: number;

        static associate(models: any) {
            Unit.hasMany(models.History)
        }
    };
    Unit.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        person: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Unit',
    });
    return Unit;
};