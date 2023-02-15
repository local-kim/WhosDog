const Sequelize = require('sequelize');

module.exports = class Location extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
              type: Sequelize.STRING,
              allowNull: false,
            },
            id:{
              type: Sequelize.STRING,
              allowNull: false,
              primaryKey: true,
            }
        },{
            sequelize,
            timestamps: false, 
            underscored: false,
            modelName: 'Location',
            tableName: 'locations',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Location.hasMany(db.Map, {foreignKey: 'locationId', targetKey: 'id'});
    }
};