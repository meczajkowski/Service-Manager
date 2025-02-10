import DeleteCustomerDialog from '@/app/(customers)/(components)/DeleteCustomerDialog';
import EditCustomerBtn from '@/app/(customers)/(components)/EditCustomerBtn';
import { getCustomerWithRelationsAction } from '@/app/(customers)/actions';
import DeleteDeviceDialog from '@/app/(devices)/(components)/DeleteDeviceDialog';
import EditDeviceBtn from '@/app/(devices)/(components)/EditDeviceBtn';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AppRoutes } from '@/routes';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
  const customer = await getCustomerWithRelationsAction(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1>Customer Details</h1>

      <div className="space-y-4">
        {/* Information */}
        <div className="p-4">
          <h2 className="mb-4">
            <div className="flex items-center justify-between">
              {customer.name}
              <div className="flex gap-2">
                <EditCustomerBtn id={customer.id} />
                <DeleteCustomerDialog id={customer.id} />
              </div>
            </div>
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Email: </span>
              {customer.email || '-'}
            </div>
            <div>
              <span className="font-medium">Phone: </span>
              {customer.phone || '-'}
            </div>
            <div>
              <span className="font-medium">Address: </span>
              {customer.address}
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="space-y-4 rounded-lg border p-4">
          <h2>
            <div className="flex items-center justify-between">
              Contacts
              <Button asChild>
                <Link
                  href={`${AppRoutes.customers}/${customer.id}/devices/new`}
                >
                  Add Contact
                </Link>
              </Button>
            </div>
          </h2>
          {customer.contacts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  {/* <TableHead>Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell className="flex gap-2">
                      {/* <EditContactBtn id={contact.id} /> */}
                      {/* <DeleteContactDialog id={contact.id} /> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No contacts assigned to this customer</p>
          )}
        </div>

        {/* Devices */}
        <div className="space-y-4 rounded-lg border p-4">
          <h2>
            <div className="flex items-center justify-between">
              Devices
              <Button asChild>
                <Link
                  href={`${AppRoutes.customers}/${customer.id}/devices/new`}
                >
                  Add Device
                </Link>
              </Button>
            </div>
          </h2>
          {customer.devices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.model}</TableCell>
                    <TableCell>{device.serialNumber}</TableCell>
                    <TableCell>
                      {new Date(device.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <EditDeviceBtn serialNumber={device.serialNumber} />
                      <DeleteDeviceDialog id={device.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No devices assigned to this customer</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
