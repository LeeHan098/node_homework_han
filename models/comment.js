'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.hasMany(Comment,{foreignKey:'postId'});
      Comment.belongsTo(models.Post);
      
      Comment.belongsTo(models.User,{foreignKey:'userId'});
      models.User.hasMany(Comment);
    }
    
    }
  
  Comment.init({
    commnetId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
}