import db from '../models';
import { getReservationListBydeviceId } from './resetvationService';

const { deviceInfo } = db.models;

type OS = 'aos' | 'ios';

interface DeviceInfo {
  id: string;
  name: string;
  os: OS;
  os_version: string;
  img_url: string;
  isReturn: boolean;
}

export const createDevice = ({ name, os, os_version, img_url }: any) => {
  return deviceInfo.create({
    name,
    os,
    os_version,
    img_url,
  });
}

export const getAllDeviceList = async (os?: OS): Promise<DeviceInfo[]> => {
  const res: DeviceInfo[] = [];
  let deviceInfos;

  if(os === 'ios' || os === 'aos') {
    deviceInfos = await deviceInfo.findAll({where: {
      os,
    }})
  } else {
    deviceInfos = await deviceInfo.findAll();
  }

  deviceInfos = deviceInfos.map(x => x.dataValues);

  for(let i=0;i<deviceInfos.length;i++) {
    const id = deviceInfos[i].id;
    const reservationList = await getReservationListBydeviceId(id);
    const isReturn = !!reservationList.find(x => x.isReturn === false);

    res.push({
      ...deviceInfos[i],
      isReturn,
    })
  }

  return res;
}

export const getDeviceById = (id: number): Promise<DeviceInfo> => {
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

export const updateDevice = ({ id, name, os, os_version, img_url }: any) => {
  return deviceInfo.update({
    name,
    os,
    os_version,
    img_url,
  }, {
    where: {
      id,
    }
  });
}

export const deleteDeviceById = (id: number) => {
  return deviceInfo.destroy({
    where: { id }
  })
}
