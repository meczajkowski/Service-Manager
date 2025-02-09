import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Customer } from '@prisma/client';
import DeleteCustomerDialog from './DeleteCustomerDialog';
import EditCustomerBtn from './EditCustomerBtn';

type Props = {
  customers: Customer[];
};

const CustomersList = ({ customers }: Props) => {
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

          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {serializedCustomers.map((customer, index) => (
          <TableRow key={customer.id}>
            {Object.values(customer).map((value) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
            <TableCell>
              <EditCustomerBtn id={customer.id} />
              <DeleteCustomerDialog id={customer.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomersList;
