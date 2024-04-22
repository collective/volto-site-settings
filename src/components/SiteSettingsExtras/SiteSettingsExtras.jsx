import React from 'react';
import { Helmet } from '@plone/volto/helpers';
import { SiteProperty } from 'volto-site-settings';

const SiteSettingsExtras = (props) => {
  const siteTitle = SiteProperty({ property: 'site_title', getValue: true });
  const favicon = SiteProperty({
    property: 'site_favicon',
    defaultValue: '/favicon.ico',
    getValue: true,
  });
  return (
    <>
      <Helmet titleTemplate={`%s - ${siteTitle}`} />
      <Helmet link={[{ rel: 'shortcut icon', href: favicon }]} />
    </>
  );
};
export default SiteSettingsExtras;