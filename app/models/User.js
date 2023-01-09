'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
    }
  }
  User.init({
   //username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employees',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'user',
  });

  User.associate = function(models) {
    User.belongsTo(models.role, {
      foreignKey: 'roleId',
      targetKey: 'id',
      as: 'role'
    });
    User.belongsTo(models.employee, {
      foreignKey: 'employeeId',
      targetKey: 'id',
      as: 'employee'
    });
    User.hasMany(models.school, {
        foreignKey: 'userId',
        as: 'school'
      }); 
  }
  
  return User;
};