const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DepEmployees extends Model { }

DepEmployees.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        department_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'department',
                key: 'id',
                unique: false
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'departments',
    }
);

module.exports = Departments;