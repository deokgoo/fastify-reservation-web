import { Sequelize, DataTypes } from 'sequelize';

const options = {
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
  tableName: "reservation", // 테이블 이름 정의
  timestamps: true, // createAt, updateAt 활성화
  paranoid: true, // deleteAt 옵션
}

const Reservation = (sequelize: Sequelize) => {
  return sequelize.define('reservation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    device_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
  }, options);
}

export default Reservation;
