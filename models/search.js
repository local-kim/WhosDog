const Sequelize = require('sequelize');

module.exports = class Search extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            image:{
              type: Sequelize.STRING,
              allowNull:false,
              unique:false
            }
        },{
            sequelize, 
            timestamps: true, 
            underscored: false,
            modelName: 'Search',
            tableName: 'searchs',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
    static associate(db){
        db.User.hasMany(db.Post, {foreignKey: 'writer', sourceKey: 'id'});
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
    }
}