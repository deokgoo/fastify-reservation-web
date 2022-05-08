import { Sequelize, DataTypes, ModelOptions } from 'sequelize';

const DeviceInfo = (sequelize: Sequelize, options: ModelOptions) => {
  return sequelize.define('device_info', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    os: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    os_version: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    img_url: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  }, options);
}

export default DeviceInfo;
