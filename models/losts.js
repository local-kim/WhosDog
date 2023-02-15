const Sequelize = require('sequelize');

module.exports = class Lost extends Sequelize.Model{
    static init(sequelize){
        return super.init({
          file_name: {
            type:Sequelize.STRING,
            primaryKey: true},
          page_url: Sequelize.STRING,
          location: Sequelize.STRING,
          date: Sequelize.STRING
        },{
            sequelize,
            underscored: true,
            modelName: 'Lost',
            tableName: 'losts',
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
    }
};