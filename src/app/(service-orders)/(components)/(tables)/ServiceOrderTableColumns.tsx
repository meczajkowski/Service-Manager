'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { routes } from '@/routes';
import { ServiceOrderWithRelationsDto } from '@/types/service-order.dto';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const ActionsCell = ({
  serviceOrder,
}: {
  serviceOrder: ServiceOrderWithRelationsDto;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={routes.serviceOrders.view(serviceOrder.id)}>
            View details
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const ServiceOrderTableColumns: ColumnDef<ServiceOrderWithRelationsDto>[] =
  [
    {
      accessorKey: 'device.serialNumber',
      header: 'Device Serial Number',
    },
    {
      accessorKey: 'device.customer.name',
      header: 'Customer',
      cell: ({ row }) => {
        const serviceOrder = row.original;
        return <span>{serviceOrder.device.customer?.name ?? 'N/A'}</span>;
      },
    },
    {
      accessorKey: 'troubleDescription',
      header: 'Issue Description',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'assignedTo.name',
      header: 'Assigned To',
      cell: ({ row }) => {
        const serviceOrder = row.original;
        return <span>{serviceOrder.assignedTo?.name ?? 'Unassigned'}</span>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const serviceOrder = row.original;
        return <span>{serviceOrder.createdAt.toLocaleDateString()}</span>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <ActionsCell serviceOrder={row.original} />,
    },
  ];
