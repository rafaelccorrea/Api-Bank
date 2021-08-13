const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {
    static associate(models) {
      UserAccount.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'usuario',
      });
    }
  }
  UserAccount.init(
    {
      bank_code: DataTypes.STRING,
      agencia: DataTypes.STRING,
      agencia_dv: DataTypes.STRING,
      conta: DataTypes.STRING,
      conta_dv: DataTypes.STRING,
      typeAccount: DataTypes.ENUM('conta_corrente', 'conta_poupanca'),
      document_type: DataTypes.ENUM('CPF', 'CNPJ'),
      document_number: DataTypes.STRING,
      legal_name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserAccount",
      freezeTableName: true,
      tableName: 'UserAccount',
      schema: "BankAccount"
    }
  );

  return UserAccount;
};
