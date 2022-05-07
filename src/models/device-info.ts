import { Sequelize, DataTypes } from 'sequelize';

const options = {
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
  tableName: "device_info", // 테이블 이름 정의
  timestamps: true, // createAt, updateAt 활성화
  paranoid: true, // deleteAt 옵션
}

const DeviceInfo = (sequelize: Sequelize) => {
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
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, options);
}

export default DeviceInfo;
