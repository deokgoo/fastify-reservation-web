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
  is_return: boolean;
}

export const createDevice = ({ no, name, os, os_version, img_url }: any) => {
  return deviceInfo.create({
    no,
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
    const notReturnedInfo = reservationList.find(x => x.is_return === false);
    const isReturn = !!notReturnedInfo
    const startDate = notReturnedInfo?.start_date;
    const endDate = notReturnedInfo?.end_date;

    res.push({
      ...deviceInfos[i],
      is_return: isReturn,
      start_date: startDate,
      end_date: endDate,
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
