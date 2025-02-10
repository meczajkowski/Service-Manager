'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AppRoutes } from '@/routes';
import { Customer } from '@prisma/client';
import { useRouter } from 'next/navigation';

type Props = {
  customers: Customer[];
};

const CustomersList = ({ customers }: Props) => {
  const router = useRouter();
  const serializedCustomers = customers.map((customer) => ({
    ...customer,
    createdAt: customer.createdAt.toISOString().split('T')[0],
    updatedAt: customer.updatedAt.toISOString().split('T')[0],
  }));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(serializedCustomers[0]).map((key) => (
            <TableHead className="w-[100px]" key={key}>
              {key}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {serializedCustomers.map((customer, index) => (
          <TableRow
            className="cursor-pointer"
            key={customer.id}
            onClick={() => {
              router.push(`${AppRoutes.customers}/${customer.id}`);
            }}
          >
            {Object.values(customer).map((value) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomersList;
