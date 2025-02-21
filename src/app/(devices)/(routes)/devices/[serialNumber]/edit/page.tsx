import EditDeviceForm from '@/app/(devices)/(components)/(forms)/EditDeviceForm';
import { getDeviceBySerialNumber } from '@/services/devices.service';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    serialNumber: string;
  };
};

const page = async ({ params }: Props) => {
  const device = await getDeviceBySerialNumber(params.serialNumber);

  if (!device) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1>Edit Device</h1>
      <EditDeviceForm device={device} />
    </div>
  );
};

export default page;
