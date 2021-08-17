const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cpf: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      birth: DataTypes.STRING,
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      tableName: 'User',
      schema: "BankAccount"
    }
  );

  return User;
};
