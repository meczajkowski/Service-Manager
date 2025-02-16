import AddDeviceForm from '@/app/(devices)/(components)/(forms)/AddDeviceForm';
import { AppRoutes } from '@/routes';

const page = () => {
  return (
    <div className="space-y-8">
      <h1>Add New Device</h1>
      <AddDeviceForm
        formStyles="space-y-8"
        btnStyles="flex gap-4"
        redirectTo={AppRoutes.devices}
      />
    </div>
  );
};

export default page;
