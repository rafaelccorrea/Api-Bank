module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserAccount', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      bank_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      agencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      agencia_dv: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      conta: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      conta_dv: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      typeAccount:{
        type: Sequelize.ENUM('conta_corrente', 'conta_poupanca'),
        allowNull: false,
      },

      document_type: {
        type: Sequelize.ENUM('CPF', 'CNPJ'),
        allowNull: false,
      },

      document_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      legal_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "User",
          key: "id",
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }

    },
    {
      schema: 'BankAccount',
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserAccount');
  }
};
