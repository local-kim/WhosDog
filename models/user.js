const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            email:{
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            nick:{
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password:{
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider:{
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            latitude: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            longitude: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            area1:{
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            area2:{
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            area3:{
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        },{
            sequelize, 
            timestamps: true, 
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
    static associate(db){
        db.User.hasMany(db.Post, {foreignKey: 'writer', sourceKey: 'id'});
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
        db.User.hasMany(db.Map, {foreignKey: 'writer', sourceKey: 'id'});
    }
}