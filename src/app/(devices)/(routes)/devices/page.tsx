import DevicesList from '../../(components)/DevicesList';
import { getDevicesAction } from '../../actions';

const page = async () => {
  const devices = await getDevicesAction();
  return <DevicesList devices={devices} />;
};

export default page;
