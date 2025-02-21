import { DataTable } from '@/components/ui/data-table';
import { ServiceOrderTableColumns } from '../../(components)/(tables)/ServiceOrderTableColumns';
import { getServiceOrdersWithRelationsAction } from '../../actions';
const ServiceOrdersPage = async () => {
  const { data: serviceOrders, error } =
    await getServiceOrdersWithRelationsAction();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1>Service Orders</h1>
      </div>
      {serviceOrders && serviceOrders.length > 0 ? (
        <DataTable columns={ServiceOrderTableColumns} data={serviceOrders} />
      ) : (
        <p>No service orders found</p>
      )}
    </div>
  );
};

export default ServiceOrdersPage;
