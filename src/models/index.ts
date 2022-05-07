import { ModelCtor, Sequelize } from 'sequelize';
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

const db: Db = {
  sequelize,
  models: {
    deviceInfo: DeviceInfo(sequelize),
    reservation: Reservation(sequelize),
    auth: Auth(sequelize),
  }
};

db.models.reservation.belongsTo(db.models.deviceInfo, {
  foreignKey: 'device_info_id',
})

export default db;
