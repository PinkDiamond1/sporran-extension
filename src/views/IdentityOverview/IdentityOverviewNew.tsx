import { browser } from 'webextension-polyfill-ts';
import { useRouteMatch, Link } from 'react-router-dom';

import { plural } from '../../utilities/plural/plural';
import { NEW, useIdentities } from '../../utilities/identities/identities';
import { paths } from '../paths';

import { IdentitiesCarousel } from '../../components/IdentitiesCarousel/IdentitiesCarousel';
import { Stats } from '../../components/Stats/Stats';

import styles from './IdentityOverview.module.css';

export function IdentityOverviewNew(): JSX.Element | null {
  const t = browser.i18n.getMessage;
  const { path } = useRouteMatch();

  const identities = useIdentities().data;
  if (!identities) {
    return null;
  }

  const identitiesNumber = Object.values(identities).length;

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.heading}>{t('view_IdentityOverview_title')}</h1>
        <p className={styles.info}>
          {plural(identitiesNumber, {
            one: 'view_IdentityOverview_subtitle_one',
            other: 'view_IdentityOverview_subtitle_other',
          })}
        </p>
      </header>

      <IdentitiesCarousel path={path} identity={NEW} />

      <Link to={paths.identity.add} className={styles.add}>
        {t('view_IdentityOverview_add')}
      </Link>

      <Stats />
    </main>
  );
}