import { DataTable } from '@/components/ui/data-table';
import { ServiceOrderTableColumns } from '../../(components)/(tables)/ServiceOrderTableColumns';
import { getServiceOrdersTableDataAction } from '../../actions';

const ServiceOrdersPage = async () => {
  const serviceOrders = await getServiceOrdersTableDataAction();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1>Service Orders</h1>
      </div>
      <DataTable columns={ServiceOrderTableColumns} data={serviceOrders} />
    </div>
  );
};

export default ServiceOrdersPage;
