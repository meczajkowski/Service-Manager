'use client';

import { getCustomerAction } from '@/app/(customers)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRoutes } from '@/routes';
import { Device } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeleteDeviceDialog from '../DeleteDeviceDialog';
import EditDeviceBtn from '../EditDeviceBtn';

const CustomerCell = ({ customerId }: { customerId: string | null }) => {
  const [customerName, setCustomerName] = useState<string>('Loading...');

  useEffect(() => {
    if (!customerId) {
      setCustomerName('');
      return;
    }

    getCustomerAction(customerId).then((customer) => {
      setCustomerName(customer?.name ?? 'Customer not found');
    });
  }, [customerId]);

  return <span>{customerName}</span>;
};

const ActionsCell = ({ device }: { device: Device }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isCustomerDetailsPage = pathname.includes(
    `${AppRoutes.customers}/${device.customerId}`,
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {device.customerId && !isCustomerDetailsPage && (
          <DropdownMenuItem>
            <Link href={`${AppRoutes.customers}/${device.customerId}`}>
              View customer
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <EditDeviceBtn serialNumber={device.serialNumber} />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteDeviceDialog id={device.id} onSuccess={() => setOpen(false)} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DeviceTableColumns: ColumnDef<Device>[] = [
  {
    accessorKey: 'serialNumber',
    header: 'Serial number',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'customerId',
    header: 'Customer',
    cell: ({ row }) => {
      const device = row.original;
      return <CustomerCell customerId={device.customerId} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
    cell: ({ row }) => {
      const device = row.original;
      return <span>{device.createdAt.toLocaleDateString()}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell device={row.original} />,
  },
];
