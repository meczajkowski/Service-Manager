import DeleteCustomerDialog from '@/app/(customers)/(components)/DeleteCustomerDialog';
import EditCustomerBtn from '@/app/(customers)/(components)/EditCustomerBtn';
import { CustomerDto } from '@/types/customer.dto';

type Props = {
  customer: CustomerDto | null;
};

const CustomerDetails = ({ customer }: Props) => {
  return (
    <div className="p-4">
      <h2 className="mb-4">
        <div className="flex items-center justify-between">
          {customer ? (
            <>
              {customer?.name}
              <div className="flex gap-2">
                <EditCustomerBtn id={customer.id} />
                <DeleteCustomerDialog id={customer.id} />
              </div>
            </>
          ) : (
            <p>No customer found</p>
          )}
        </div>
      </h2>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Email: </span>
          {customer?.email || '-'}
        </div>
        <div>
          <span className="font-medium">Phone: </span>
          {customer?.phone || '-'}
        </div>
        <div>
          <span className="font-medium">Address: </span>
          {customer?.address || '-'}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
