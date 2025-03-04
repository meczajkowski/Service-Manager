'use client';

import AddContactForm from '@/app/(contacts)/(components)/(forms)/AddContactForm';
import { contactTableColumns } from '@/app/(contacts)/(components)/(tables)/contact-table-columns.const';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { CustomerWithRelationsDto } from '@/types/customer.dto';
import { useState } from 'react';

type Props = {
  customer: CustomerWithRelationsDto;
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
          formStyles="grid grid-cols-2 gap-4 pb-4"
          btnStyles="flex gap-2"
          values={{ customers: [props.customer] }}
          customerId={props.customer.id}
          onCancel={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      )}
      {props.customer.contacts.length > 0 ? (
        <DataTable
          columns={contactTableColumns}
          data={props.customer.contacts}
        />
      ) : (
        <p>No contacts assigned to this customer</p>
      )}
    </div>
  );
};

export default CustomerContactsSection;
