import CustomerForm from '@/app/(customers)/(components)/CustomerForm';

const page = () => {
  return (
    <div className="space-y-8">
      <h1>Add New Customer</h1>
      <CustomerForm />
    </div>
  );
};

export default page;
