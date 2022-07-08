export const FIELDS = {
  bookDemoForm: [
    {
      name: 'first_name',
      ariaLabel: 'Primer Nombre',
      type: 'text',
      label: 'Primer Nombre',
      id: 'names',
      minlength: '2',
      regex: /^[a-zA-Z ]+$/,
      required: true,
    },
    {
      name: 'names',
      ariaLabel: 'Segundo Nombre',
      type: 'text',
      label: 'Segundo Nombre',
      id: 'second_name',
      minlength: '2',
      regex: /^[a-zA-Z ]+$/,
      required: true,
    },
    {
      name: 'first_surname',
      ariaLabel: 'Primer Apellido',
      type: 'text',
      label: 'Apellidos',
      id: 'first_surname',
      minlength: '2',
      regex: /^[a-zA-Z ]+$/,
      required: true,
    },
    {
      name: 'second_surname',
      ariaLabel: 'Segundo Apellido',
      type: 'text',
      label: 'Segundo Apellido',
      id: 'second_surname',
      minlength: '2',
      regex: /^[a-zA-Z ]+$/,
      required: true,
    },
    {
      name: 'phone',
      ariaLabel: 'Telefono',
      type: 'tel',
      label: 'Telefono',
      id: 'phoneNumber',
      mask: 'phone',
      minlength: '14',
      required: true,
    },
    {
      name: 'email',
      ariaLabel: 'Email',
      type: 'email',
      label: 'Email',
      id: 'email',
      regex: /^\S+@\S+\.\S+$/,
      required: true,
    },
    {
      name: 'company_name',
      ariaLabel: 'Compañía',
      type: 'text',
      label: 'Compañía',
      id: 'company',
      minlength: '1',
      maxlength: '50',
      required: true,
    },
    {
      name: 'number_of_employees',
      ariaLabel: 'Company Size',
      type: 'select',
      label: 'Company Size',
      id: 'companySize',
      options: ['', 'Owner/Operator', '2 - 6', '7 - 10', '11+'],
      minlength: '1',
      required: true,
    },
  ],
};
