import React from 'react';
import { Helmet } from '@plone/volto/helpers';
import { SiteProperty } from 'volto-site-settings';

const SiteSettingsExtras = (props) => {
  let siteTitle = SiteProperty({ property: 'site_title', getValue: true });
  const favicon = SiteProperty({
    property: 'site_favicon',
    defaultValue: '/favicon.ico',
    getValue: true,
  });

  siteTitle = siteTitle?.replaceAll('\\n', ' - ') ?? '';

  return (
    <>
      <Helmet titleTemplate={`%s - ${siteTitle}`} />
      <Helmet link={[{ rel: 'icon', href: favicon }]} />
    </>
  );
};
export default SiteSettingsExtras;
