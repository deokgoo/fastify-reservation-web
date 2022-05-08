import { Sequelize, DataTypes, ModelOptions } from 'sequelize';

const Auth = (sequelize: Sequelize, options: ModelOptions) => {
  return sequelize.define('auth', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, options);
}

export default Auth;
