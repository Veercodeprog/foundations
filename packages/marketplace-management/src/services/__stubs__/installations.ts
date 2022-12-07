import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mockInstallationsList: InstallationModelPagedResult = {
  data: [
    {
      id: '0d71d625-bd5a-4bde-8d7e-eab9fd658991',
      appId: 'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
      created: '2021-10-26T09:15:37',
      client: 'SBOX',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'SBOX',
      customerName: 'Sandbox Estates',
      installedBy: 'willmcvay@me.com',
      customerAddress: {
        buildingName: 'Third Floor',
        buildingNumber: '67-74',
        line1: 'Saffron Hill',
        line2: 'London',
        line3: '',
        line4: '',
        postcode: 'EC1N 8QX',
        countryId: 'GB',
      },
      metadata: [
        {
          service: 'referrals',
          field: 'referralTypeId',
          allow: ['JTS', 'JRV'],
        },
      ],
      links: [
        {
          rel: 'self',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/installations/0d71d625-bd5a-4bde-8d7e-eab9fd658991',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/apps/cfbe6f29-4003-4648-aa5a-8eb777bd606e',
          action: 'GET',
        },
      ],
    },
    {
      id: '31492334-e82d-4c9d-8eb7-498c522c05fd',
      appId: 'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
      created: '2021-10-22T09:13:14',
      client: 'RES-GHOT',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'RES',
      customerName: 'Reapit Sales',
      officeGroupName: 'Holly Test 4',
      installedBy: 'sales@reapit.com',
      customerAddress: {
        buildingName: 'Radcliffe House',
        buildingNumber: '5',
        line1: 'Blenheim Court',
        line2: 'Solihull',
        line3: '',
        line4: '',
        postcode: 'B91 2AA',
        countryId: 'GB',
      },
      links: [
        {
          rel: 'self',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/installations/31492334-e82d-4c9d-8eb7-498c522c05fd',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/apps/cfbe6f29-4003-4648-aa5a-8eb777bd606e',
          action: 'GET',
        },
      ],
    },
    {
      id: 'b8ea8317-b13e-478f-9fa8-650f4e3aa7aa',
      appId: 'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
      created: '2021-02-23T14:35:26',
      client: 'XTM',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'XTM',
      customerName: 'XTM Estates Ltd',
      installedBy: 'pete.littlewood+xtm@gmail.com',
      customerAddress: {
        buildingName: '',
        buildingNumber: '15',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        countryId: 'GB',
      },
      links: [
        {
          rel: 'self',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/installations/b8ea8317-b13e-478f-9fa8-650f4e3aa7aa',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/apps/cfbe6f29-4003-4648-aa5a-8eb777bd606e',
          action: 'GET',
        },
      ],
    },
    {
      id: 'db73a32e-a089-4ced-a0d8-2aa3b25cd424',
      appId: 'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
      created: '2021-02-12T10:41:27',
      client: 'XTM-GSOM',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'SBOX',
      customerName: 'Sandbox Estates',
      officeGroupName: 'SomeNewMcTestyGroup',
      installedBy: 'hollyjoyphillips+xtm@gmail.com',
      customerAddress: {
        buildingName: 'Third Floor',
        buildingNumber: '67-74',
        line1: 'Saffron Hill',
        line2: 'London',
        line3: '',
        line4: '',
        postcode: 'EC1N 8QX',
        countryId: 'GB',
      },
      links: [
        {
          rel: 'self',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/installations/db73a32e-a089-4ced-a0d8-2aa3b25cd424',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/apps/cfbe6f29-4003-4648-aa5a-8eb777bd606e',
          action: 'GET',
        },
      ],
    },
    {
      id: 'bfd570bf-e398-4ae5-b550-a374d735f8d4',
      appId: 'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
      created: '2021-02-12T10:41:27',
      client: 'XTM-GSMN',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'SBOX',
      customerName: 'Sandbox Estates',
      officeGroupName: 'SomeNewGroup',
      installedBy: 'hollyjoyphillips+xtm@gmail.com',
      customerAddress: {
        buildingName: 'Third Floor',
        buildingNumber: '67-74',
        line1: 'Saffron Hill',
        line2: 'London',
        line3: '',
        line4: '',
        postcode: 'EC1N 8QX',
        countryId: 'GB',
      },
      links: [
        {
          rel: 'self',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/installations/bfd570bf-e398-4ae5-b550-a374d735f8d4',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/apps/cfbe6f29-4003-4648-aa5a-8eb777bd606e',
          action: 'GET',
        },
      ],
    },
    {
      id: '9237c9b6-0f82-47a7-8121-98ad0b6aedf8',
      appId: 'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
      created: '2021-02-12T10:40:57',
      client: 'XTM-GPHG',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'SBOX',
      customerName: 'Sandbox Estates',
      officeGroupName: 'Group 3',
      installedBy: 'hollyjoyphillips+xtm@gmail.com',
      customerAddress: {
        buildingName: 'Third Floor',
        buildingNumber: '67-74',
        line1: 'Saffron Hill',
        line2: 'London',
        line3: '',
        line4: '',
        postcode: 'EC1N 8QX',
        countryId: 'GB',
      },
      links: [
        {
          rel: 'self',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/installations/9237c9b6-0f82-47a7-8121-98ad0b6aedf8',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/apps/cfbe6f29-4003-4648-aa5a-8eb777bd606e',
          action: 'GET',
        },
      ],
    },
    {
      id: 'e114f873-41cb-47b1-9ba0-3feb5e7af744',
      appId: 'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
      created: '2021-02-12T10:40:57',
      client: 'XTM-GHTG',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'SBOX',
      customerName: 'Sandbox Estates',
      officeGroupName: 'Group 4',
      installedBy: 'hollyjoyphillips+xtm@gmail.com',
      customerAddress: {
        buildingName: 'Third Floor',
        buildingNumber: '67-74',
        line1: 'Saffron Hill',
        line2: 'London',
        line3: '',
        line4: '',
        postcode: 'EC1N 8QX',
        countryId: 'GB',
      },
      links: [
        {
          rel: 'self',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/installations/e114f873-41cb-47b1-9ba0-3feb5e7af744',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/apps/cfbe6f29-4003-4648-aa5a-8eb777bd606e',
          action: 'GET',
        },
      ],
    },
    {
      id: '5b443d93-230b-4099-bd06-584ecae8a19a',
      appId: 'cfbe6f29-4003-4648-aa5a-8eb777bd606e',
      created: '2021-01-18T16:46:03',
      client: 'TST',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'TST',
      customerName: 'Office Groups Testing',
      installedBy: 'ryan.paul.wilcox+test@gmail.com',
      customerAddress: {
        buildingName: '',
        buildingNumber: '',
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        postcode: '',
        countryId: '',
      },
      links: [
        {
          rel: 'self',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/installations/5b443d93-230b-4099-bd06-584ecae8a19a',
          action: 'GET',
        },
        {
          rel: 'app',
          href: 'https://platform.dev.paas.reapit.cloud/marketplace/apps/cfbe6f29-4003-4648-aa5a-8eb777bd606e',
          action: 'GET',
        },
      ],
    },
  ],
  pageNumber: 1,
  pageSize: 999,
  pageCount: 8,
  totalCount: 8,
}
