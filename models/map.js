const Sequelize = require('sequelize');

module.exports = class Map extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            locationId:{
              type: Sequelize.STRING,
              allowNull: false,
            },
            writer:{
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            star:{
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            review:{
              type: Sequelize.STRING(200),
              allowNull: false,
            }
        },{
            sequelize,
            timestamps: true, 
            underscored: false,
            modelName: 'Map',
            tableName: 'maps',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Map.belongsTo(db.User, {foreignKey: 'writer', targetKey: 'id'});
        db.Map.belongsTo(db.Location, {foreignKey: 'locationId', targetKey: 'id'})
    }
};