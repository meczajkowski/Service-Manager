'use client';

import AddContactForm from '@/app/(contacts)/(components)/(forms)/AddContactForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CustomerWithRelations } from '../types';
import CustomersContactsList from './CustomersContactsList';

type Props = {
  customer: CustomerWithRelations;
};

const CustomerContactsSection = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h2>
        <div className="flex items-center justify-between">
          Contacts
          {!open && <Button onClick={() => setOpen(true)}>Add contact</Button>}
        </div>
      </h2>
      {open && (
        <AddContactForm
          formStyles="grid grid-cols-2 gap-4"
          btnStyles="flex gap-2"
          values={{ customers: [props.customer] }}
          onCancel={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      )}
      {props.customer.contacts.length > 0 ? (
        <CustomersContactsList contacts={props.customer.contacts} />
      ) : (
        <p>No contacts assigned to this customer</p>
      )}
    </div>
  );
};

export default CustomerContactsSection;
