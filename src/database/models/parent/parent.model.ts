/* eslint-disable linebreak-style */
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
import { GenderList } from '../../../domain.types/miscellaneous/system.types';

////////////////////////////////////////////////////////////////////////

export class ParentModel {

    static TableName = 'parents';

    static ModelName = 'Parent';

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
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        ParentModel.ModelName,
        ParentModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : ParentModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.Parent.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'School'
        });

        models.Parent.hasMany(models.Student);

    };

}
