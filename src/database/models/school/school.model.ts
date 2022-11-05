/* eslint-disable linebreak-style */
import * as db from '../../database.connector';
import { DataTypes } from 'sequelize';
const sequelize = db.default.sequelize;

////////////////////////////////////////////////////////////////////////

export class SchoolModel {

    static TableName = 'school';

    static ModelName = 'School';

    static Schema = {
        id : {
            type          : DataTypes.INTEGER,
            allowNull     : false,
            autoIncrement : true,
            primaryKey    : true
        },
        SchoolName : {
            type      : DataTypes.STRING(256),
            allowNull : false
        },
        Address : {
            type         : DataTypes.STRING(16),
            allowNull    : false,
            defaultValue : 'Mr'
        },
        CreatedAt : DataTypes.DATE,
        UpdatedAt : DataTypes.DATE,
        DeletedAt : DataTypes.DATE
    };

    static Model: any = sequelize.define(
        SchoolModel.ModelName,
        SchoolModel.Schema,
        {
            createdAt       : 'CreatedAt',
            updatedAt       : 'UpdatedAt',
            deletedAt       : 'DeletedAt',
            freezeTableName : true,
            timestamps      : true,
            paranoid        : true,
            tableName       : SchoolModel.TableName,
        });

    static associate = (models) => {

        // Add associations here...

        models.School.hasMany(models.User);
      
    };

}
