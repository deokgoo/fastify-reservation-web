import { Sequelize, DataTypes, ModelOptions } from 'sequelize';

const Reservation = (sequelize: Sequelize, options: ModelOptions) => {
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
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    is_return: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
