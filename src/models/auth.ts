import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const options = {
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
  tableName: "auth", // 테이블 이름 정의
  timestamps: true, // createAt, updateAt 활성화
  paranoid: true, // deleteAt 옵션
}

const DeviceInfo = (sequelize: Sequelize) => {
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
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, options);
}

// export const validate = {
//   generateHash: (password: string) => bcrypt.hash(password, bcrypt.genSaltSync(8)),
//   validPassword: (password1: string, password2: string) => bcrypt.compare(password1, password2),
// }

export default DeviceInfo;
