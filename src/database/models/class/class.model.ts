/* eslint-disable linebreak-style */
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
//import { GenderList } from '../../../domain.types/miscellaneous/system.types';

////////////////////////////////////////////////////////////////////////

export class ClassModel {

    static TableName = 'classes';

    static ModelName = 'Class';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        ClassTeacherId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        ClassName : {
            type      : DataTypes.STRING(32),
            allowNull : false
        },
        NumberOfStudents : {
            type      : DataTypes.STRING(16),
            allowNull : false
        },
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        ClassModel.ModelName,
        ClassModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ClassModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.Class.belongsTo(models.Staff, {
            sourceKey : 'ClassTeacherId',
            targetKey : 'id',
            as        : 'ClassTeacher'
        });

        models.Class.hasMany(models.Student);
    };

}
