import { Meta } from '@storybook/react';
import { MemoryRouter, Route } from 'react-router-dom';

import { NEW } from '../../utilities/accounts/accounts';
import { paths } from '../paths';

import { AccountOverview } from './AccountOverview';

export default {
  title: 'Views/AccountOverview',
  component: AccountOverview,
} as Meta;

const accounts = {
  '4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire': {
    name: 'My Sporran Account',
    address: '4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire',
    index: 1,
  },
  '4sm9oDiYFe22D7Ck2aBy5Y2gzxi2HhmGML98W9ZD2qmsqKCr': {
    name: 'My Second Account',
    address: '4sm9oDiYFe22D7Ck2aBy5Y2gzxi2HhmGML98W9ZD2qmsqKCr',
    index: 2,
  },
  '4oyRTDhHL22Chv9T89Vv2TanfUxFzBnPeMuq4EFL3gUiHbtL': {
    name: 'My Third Account',
    address: '4oyRTDhHL22Chv9T89Vv2TanfUxFzBnPeMuq4EFL3gUiHbtL',
    index: 3,
  },
};

export function Template(): JSX.Element {
  return (
    <MemoryRouter
      initialEntries={[
        '/account/4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire/send',
      ]}
    >
      <Route path={paths.account.overview}>
        <AccountOverview
          account={accounts['4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire']}
          accounts={accounts}
        />
      </Route>
    </MemoryRouter>
  );
}

export function New(): JSX.Element {
  return (
    <MemoryRouter initialEntries={['/account/NEW/send']}>
      <Route path={paths.account.overview}>
        <AccountOverview account={NEW} accounts={accounts} />
      </Route>
    </MemoryRouter>
  );
}