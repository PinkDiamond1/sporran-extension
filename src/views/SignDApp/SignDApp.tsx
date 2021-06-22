import { Fragment, useCallback, useRef } from 'react';
import { browser } from 'webextension-polyfill-ts';

import { useAccounts } from '../../utilities/accounts/accounts';
import { Avatar } from '../../components/Avatar/Avatar';
import { useCopyButton } from '../../components/useCopyButton/useCopyButton';
import {
  PasswordField,
  usePasswordField,
} from '../../components/PasswordField/PasswordField';
import {
  backgroundSignChannel,
  useSignPopupQuery,
} from '../../dApps/SignChannels/backgroundSignChannel';

import styles from './SignDApp.module.css';

function formatBlock(block: number) {
  const locale = browser.i18n.getUILanguage();
  const formatter = new Intl.NumberFormat(locale, { useGrouping: true });
  return formatter.format(block);
}

function getExtrinsicValues({
  origin,
  specVersion,
  nonce,
  method,
  lifetimeStart,
  lifetimeEnd,
}: ReturnType<typeof useSignPopupQuery>) {
  const t = browser.i18n.getMessage;

  const lifetime =
    lifetimeStart && lifetimeEnd
      ? t('view_SignDApp_mortal', [
          formatBlock(lifetimeStart),
          formatBlock(lifetimeEnd),
        ])
      : t('view_SignDApp_immortal');

  return [
    { value: origin, label: t('view_SignDApp_from') },
    { value: specVersion, label: t('view_SignDApp_version') },
    { value: nonce, label: t('view_SignDApp_nonce') },
    { value: method, label: t('view_SignDApp_method') },
    { value: lifetime, label: t('view_SignDApp_lifetime') },
  ];
}

export function SignDApp(): JSX.Element | null {
  const t = browser.i18n.getMessage;

  const query = useSignPopupQuery();
  const values = getExtrinsicValues(query);

  const addressRef = useRef<HTMLInputElement>(null);
  const copy = useCopyButton(addressRef);

  const passwordField = usePasswordField();

  const accounts = useAccounts().data;
  const account = accounts && accounts[query.address as string];

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!account) {
        return;
      }

      const password = await passwordField.get(event);
      await backgroundSignChannel.return(password);

      window.close();
    },
    [account, passwordField],
  );

  const handleCancelClick = useCallback(async () => {
    await backgroundSignChannel.throw('Rejected');
    window.close();
  }, []);

  if (!account) {
    return null;
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>{t('view_SignDApp_title')}</h1>

      <Avatar address={account.address} className={styles.avatar} />
      <h2 className={styles.account}>{account.name}</h2>

      <p className={styles.addressLine}>
        <input
          className={styles.address}
          ref={addressRef}
          readOnly
          value={account.address}
          aria-label={account.name}
        />
        {copy.supported && (
          <button
            className={copy.className}
            onClick={copy.handleCopyClick}
            type="button"
            aria-label={copy.title}
            title={copy.title}
          />
        )}
      </p>

      <dl className={styles.details}>
        {values.map(({ label, value }) => (
          <Fragment key={label}>
            <dt className={styles.detailName}>{label}:</dt>
            <dd className={styles.detailValue} title={String(value)}>
              {value}
            </dd>
          </Fragment>
        ))}
      </dl>

      <PasswordField account={account} autoFocus password={passwordField} />

      <p className={styles.buttonsLine}>
        <button
          onClick={handleCancelClick}
          type="button"
          className={styles.reject}
        >
          {t('view_SignDApp_reject')}
        </button>
        <button type="submit" className={styles.submit}>
          {t('view_SignDApp_CTA')}
        </button>
      </p>
    </form>
  );
}
