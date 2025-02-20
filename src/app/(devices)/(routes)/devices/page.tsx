import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { AppRoutes } from '@/routes';
import Link from 'next/link';
import { deviceTableColumns } from '../../(components)/(tables)/device-table-columns.const';
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
      {devices.length > 0 ? (
        <DataTable columns={deviceTableColumns} data={devices} />
      ) : (
        <p>No devices found</p>
      )}
    </div>
  );
};

export default page;
