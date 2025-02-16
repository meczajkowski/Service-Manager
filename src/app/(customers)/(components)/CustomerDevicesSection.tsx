'use client';

import AddDeviceForm from '@/app/(devices)/(components)/(forms)/AddDeviceForm';
import { DeviceTableColumns } from '@/app/(devices)/(components)/(tables)/DeviceTableColumns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useState } from 'react';
import { CustomerWithRelations } from '../types';

type Props = {
  customer: CustomerWithRelations;
};

const CustomerDevicesSection = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h2>
        <div className="flex items-center justify-between">
          Devices
          {!open && <Button onClick={() => setOpen(true)}>Add device</Button>}
        </div>
      </h2>
      {open && (
        <AddDeviceForm
          formStyles="grid grid-cols-2 gap-4"
          btnStyles="flex gap-2"
          values={{ customerId: props.customer.id }}
          onCancel={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      )}
      {props.customer.devices.length > 0 ? (
        <DataTable columns={DeviceTableColumns} data={props.customer.devices} />
      ) : (
        <p>No devices assigned to this customer</p>
      )}
    </div>
  );
};

export default CustomerDevicesSection;
