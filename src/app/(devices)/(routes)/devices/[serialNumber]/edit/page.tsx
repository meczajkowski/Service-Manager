import DeviceForm from '@/app/(devices)/(components)/DeviceForm';
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
      <DeviceForm device={device} />
    </div>
  );
};

export default page;
