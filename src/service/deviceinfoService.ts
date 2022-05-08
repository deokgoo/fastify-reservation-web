import db from '../models';
import { getReservationListBydeviceId } from './resetvationService';

const { deviceInfo } = db.models;

export const createDevice = ({ name, os, os_version, img_url }: any) => {
  return deviceInfo.create({
    name,
    os,
    os_version,
    img_url,
  });
}

export const getAllDeviceList = async () => {
  const res = [];
  let deviceInfos = await deviceInfo.findAll();

  deviceInfos = deviceInfos.map(x => x.dataValues);

  for(let i=0;i<deviceInfos.length;i++) {
    const id = deviceInfos[i].id;
    const reservationList = await getReservationListBydeviceId(id);
    console.log('test', reservationList);
    const isReturn = !!reservationList.find(x => x.isReturn === false);
    res.push({
      ...deviceInfos[i],
      isReturn,
    })
  }

  return res;
}

export const getDeviceById = (id: number) => {
  return deviceInfo.findOne({
    where: { id }
  })
}

export const getDevicesByName = (query: string) => {
  return deviceInfo.findAll({
    include: {
      where: {
        name: query
      }
    }
  })
}

export const deleteDeviceById = (id: number) => {
  return deviceInfo.destroy({
    where: { id }
  })
}
