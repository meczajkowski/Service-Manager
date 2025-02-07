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

const DevicesList = ({ devices }: Props) => {
  const serializedDevices = devices.map((device) => ({
    ...device,
    model: device.model.toString(),
    serialNumber: device.serialNumber.toString(),
    createdAt: device.createdAt.toISOString().split('T')[0],
    updatedAt: device.updatedAt.toISOString().split('T')[0],
  }));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(serializedDevices[0]).map((key) => (
            <TableHead className="w-[100px]" key={key}>
              {key}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {serializedDevices.map((device, index) => (
          <TableRow key={device.id}>
            {Object.values(device).map((value) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DevicesList;
