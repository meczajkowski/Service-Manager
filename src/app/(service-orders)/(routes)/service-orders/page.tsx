import { DataTable } from '@/components/ui/data-table';
import { ServiceOrderTableColumns } from '../../(components)/(tables)/ServiceOrderTableColumns';
import { getServiceOrdersAction } from '../../actions';
import { ServiceOrderWithRelations } from '../../types';

const ServiceOrdersPage = async () => {
  const serviceOrders = (await getServiceOrdersAction({
    withRelations: true,
  })) as ServiceOrderWithRelations[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1>Service Orders</h1>
      </div>
      {serviceOrders.length > 0 ? (
        <DataTable columns={ServiceOrderTableColumns} data={serviceOrders} />
      ) : (
        <p>No service orders found</p>
      )}
    </div>
  );
};

export default ServiceOrdersPage;
