import EditDeviceForm from '@/app/(devices)/(components)/(forms)/EditDeviceForm';
import { getDeviceBySerialNumberAction } from '@/app/(devices)/actions';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    serialNumber: string;
  };
};

const page = async ({ params }: Props) => {
  const device = await getDeviceBySerialNumberAction(params.serialNumber);

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
