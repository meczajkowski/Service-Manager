import { Button } from '@/components/ui/button';
import { AppRoutes } from '@/routes';
import Link from 'next/link';
import DevicesList from '../../(components)/DevicesList';
import { getDevicesAction } from '../../actions';

const page = async () => {
  const devices = await getDevicesAction();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1>Devices</h1>
        <Button asChild>
          <Link href={AppRoutes.devicesNew}>Add Device</Link>
        </Button>
      </div>
      <DevicesList devices={devices} />
    </div>
  );
};

export default page;
