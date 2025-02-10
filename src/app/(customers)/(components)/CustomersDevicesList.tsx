import DeleteDeviceDialog from '@/app/(devices)/(components)/DeleteDeviceDialog';
import EditDeviceBtn from '@/app/(devices)/(components)/EditDeviceBtn';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Device } from '@prisma/client';

type Props = {
  devices: Device[];
};

const CustomersDevicesList = ({ devices }: Props) => {
  return (
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
        {devices.map((device) => (
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
  );
};

export default CustomersDevicesList;
