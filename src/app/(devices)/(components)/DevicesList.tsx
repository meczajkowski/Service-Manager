import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Device } from '@prisma/client';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

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
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {serializedDevices.map((device, index) => (
          <TableRow key={device.id}>
            {Object.values(device).map((value) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
            <TableCell>
              <Button asChild variant="ghost" size="icon">
                <Link href={`/devices/${device.serialNumber}/edit`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DevicesList;
