const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){ 
        return super.init({
            comment:{
                type: Sequelize.STRING(140),
                allowNull:false,
            },
            commenter:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            posting:{
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid:false,
            charset:'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db){
        db.Comment.belongsTo(db.User, {foreignKey:'commenter', targetKey: 'id'});
        db.Comment.belongsTo(db.Post, {foreignKey:'posting', targetKey: 'id'});
    }
}