import { Sequelize, DataTypes, ModelOptions } from 'sequelize';

const DeviceInfo = (sequelize: Sequelize, options: ModelOptions) => {
  return sequelize.define('device_info', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    no: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    os: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    os_version: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    img_url: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  }, options);
}

export default DeviceInfo;
