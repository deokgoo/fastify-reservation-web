import { ModelCtor, ModelOptions, Sequelize } from 'sequelize';
import Auth from '../models/auth';
import DeviceInfo from '../models/device-info';
import Reservation from '../models/reservation';
import mysql2 from 'mysql2';

interface Db {
  sequelize: Sequelize,
  models: {
    deviceInfo: ModelCtor<any>,
    reservation: ModelCtor<any>,
    auth: ModelCtor<any>,
  }
}

const sequelize = new Sequelize('olive_reservation', 'olive', 'olive_password', {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: mysql2,
});

const options: ModelOptions = {
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
  timestamps: true, // createAt, updateAt 활성화
  paranoid: true, // deleteAt 옵션
}

const db: Db = {
  sequelize,
  models: {
    deviceInfo: DeviceInfo(sequelize, options),
    reservation: Reservation(sequelize, options),
    auth: Auth(sequelize, options),
  }
};

db.models.reservation.belongsTo(db.models.deviceInfo, {
  foreignKey: 'device_info_id',
})

export default db;
