import { browser } from 'webextension-polyfill-ts';
import { Link } from 'react-router-dom';

import { paths } from '../../views/paths';

import styles from './IdentitySlide.module.css';

export function IdentitySlideNew(): JSX.Element {
  const t = browser.i18n.getMessage;

  return (
    <section>
      <Link
        to={paths.identity.add}
        className={styles.add}
        aria-label={t('component_IdentitySlideNew_title')}
        title={t('component_IdentitySlideNew_title')}
      />
    </section>
  );
}