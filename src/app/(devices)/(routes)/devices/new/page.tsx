import AddDeviceForm from '@/app/(devices)/(components)/(forms)/AddDeviceForm';
import { routes } from '@/routes';

const page = () => {
  return (
    <div className="space-y-8">
      <h1>Add New Device</h1>
      <AddDeviceForm
        formStyles="space-y-8"
        btnStyles="flex gap-4"
        redirectTo={routes.devices.list}
      />
    </div>
  );
};

export default page;
