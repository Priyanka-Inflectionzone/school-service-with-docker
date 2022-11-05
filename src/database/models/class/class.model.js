"use strict";
exports.__esModule = true;
exports.ClassModel = void 0;
/* eslint-disable linebreak-style */
var db = require("../../database.connector");
var sequelize_1 = require("sequelize");
var sequelize = db["default"].sequelize;
//import { GenderList } from '../../../domain.types/miscellaneous/system.types';
////////////////////////////////////////////////////////////////////////
var ClassModel = /** @class */ (function () {
    function ClassModel() {
    }
    ClassModel.TableName = 'classes';
    ClassModel.ModelName = 'Class';
    ClassModel.Schema = {
        id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true
        },
        ClassTeacherId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            foreignKey: true,
            unique: false
        },
        ClassName: {
            type: sequelize_1.DataTypes.STRING(32),
            allowNull: false
        },
        NumberOfStudents: {
            type: sequelize_1.DataTypes.STRING(16),
            allowNull: false
        },
        CreatedAt: sequelize_1.DataTypes.DATE,
        UpdatedAt: sequelize_1.DataTypes.DATE,
        DeletedAt: sequelize_1.DataTypes.DATE
    };
    ClassModel.Model = sequelize.define(ClassModel.ModelName, ClassModel.Schema, {
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt',
        deletedAt: 'DeletedAt',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        tableName: ClassModel.TableName
    });
    ClassModel.associate = function (models) {
        //Add associations here...
        models.Class.belongsTo(models.Staff, {
            sourceKey: 'ClassTeacherId',
            targetKey: 'id',
            as: 'ClassTeacher'
        });
        models.Class.hasMany(models.Student);
    };
    return ClassModel;
}());
exports.ClassModel = ClassModel;
