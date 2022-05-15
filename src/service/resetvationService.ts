import chalk from 'chalk';
import db from '../models';

const { reservation } = db.models;

interface Reservation {
  device_info_id: string;
  name: string;
  department: string;
  is_return: boolean;
  start_date: Date;
  end_date: Date;
}

export const createReservation = ({ deviceInfoId, name, department, startDate, endDate }: any) => {
  return reservation.create({
    device_info_id: deviceInfoId,
    name,
    department,
    start_date: startDate,
    end_date: endDate,
  })
}

export const getReservationListBydeviceId = (deviceId: number): Promise<Reservation[]> => {
  return reservation.findAll({
    where: {
      device_info_id: deviceId,
    }
  });
}

export const getReservationListNotReturned = (): Promise<Reservation[]> => {
  return reservation.findAll({
    where: {
      is_return: false,
    }
  });
}

export const deviceReturnById = (id: number) => {
  console.log(chalk.bgGreen(id));
  return reservation.update({
    is_return: true,
  },{
    where: {
      id,
    }
  });
}

export const deleteReservationById = (id: number) => {
  return reservation.destroy({
    where: { id }
  })
}