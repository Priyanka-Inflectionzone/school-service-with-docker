/* eslint-disable linebreak-style */
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
//import { GenderList } from '../../../domain.types/miscellaneous/system.types';

////////////////////////////////////////////////////////////////////////

export class StaffModel {

    static TableName = 'staff';

    static ModelName = 'Staff';

    static Schema = {
        id : {
            type         : DataTypes.UUID,
            allowNull    : false,
            defaultValue : DataTypes.UUIDV4,
            primaryKey   : true
        },
        UserId : {
            type       : DataTypes.UUID,
            allowNull  : false,
            foreignKey : true,
            unique     : false
        },
        StaffType : {
            type      : DataTypes.STRING(32),
            allowNull : false
        },
        Salary : {
            type      : DataTypes.STRING(16),
            allowNull : false
        },
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        StaffModel.ModelName,
        StaffModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : StaffModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.Staff.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

        models.Staff.hasOne(models.Class);

    };

}
