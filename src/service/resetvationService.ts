import db from '../models';

const { reservation } = db.models;

export const createReservation = ({ deviceInfoId, name, department, startDate, endDate }: any) => {
  return reservation.create({
    device_info_id: deviceInfoId,
    name,
    department,
    start_date: startDate,
    end_date: endDate,
  })
}

export const getReservationListBydeviceId = (deviceId: number) => {
  return reservation.findAll({
    where: {
      device_info_id: deviceId,
    }
  });
}

export const deleteReservationById = (id: number) => {
  return reservation.destroy({
    where: { id }
  })
}