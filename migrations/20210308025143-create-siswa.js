'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('siswa', {
      nisn: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        
      },
      nis: {
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        references:{
          model:"kelas",
          key:"id_kelas"
        }
      },
      alamat: {
        type: Sequelize.STRING
      },
      no_telp: {
        type: Sequelize.INTEGER
      },
      id_spp: {
        type: Sequelize.INTEGER,
        references:{
          model:"spp",
          key:"id_spp"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('siswa');
  }
};