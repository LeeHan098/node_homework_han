'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(Post,{foreignKey:'userId'});
      Post.belongsTo(models.User);
      
    }
  }
  Post.init({
    postId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    password: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};