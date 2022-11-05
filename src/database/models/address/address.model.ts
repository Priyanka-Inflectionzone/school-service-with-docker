/* eslint-disable linebreak-style */
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;
//import { GenderList } from '../../../domain.types/miscellaneous/system.types';
export class AddressModel {

    static TableName = 'addresses';

    static ModelName = 'Address';

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
        StreetAddress : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        City : {
            type      : DataTypes.STRING(16),
            allowNull : false,
           
        },
        State : {
            type      : DataTypes.STRING(64),
            allowNull : false
        },
        Country : {
            type      : DataTypes.STRING(64),
            allowNull : false
        },
        Pincode : {
            type      : DataTypes.STRING(10),
            allowNull : false,
        },
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        AddressModel.ModelName,
        AddressModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : AddressModel.TableName,
        });

    static associate = (models) => {

        //Add associations here...

        models.Address.belongsTo(models.User, {
            sourceKey : 'UserId',
            targetKey : 'id',
            as        : 'User'
        });

    };

}
