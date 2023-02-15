const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content:{
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            title: {
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
            like:{
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue:0,
            },
            writer:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            title:{
                type: Sequelize.STRING(30),
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: true, 
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db){
        db.Post.belongsTo(db.User, {foreignKey: 'writer', targetKey: 'id'});
        db.Post.hasMany(db.Comment, {foreignKey: 'posting', sourceKey: 'id'});
    }
};