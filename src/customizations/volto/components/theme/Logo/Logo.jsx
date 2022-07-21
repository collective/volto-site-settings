/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { defineMessages, useIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  plonesite: {
    id: 'Plone Site',
    defaultMessage: 'Plone Site',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const siteSettings = useSelector((state) => state.siteSettings);
  const intl = useIntl();

  const siteLogoScales = siteSettings.result.site_logo?.scales;

  let siteLogo = LogoImage;
  let srcSet;

  if (siteLogoScales) {
    siteLogo =
      siteLogoScales.mini?.download ?? siteSettings.result.site_logo.download;
    const siteLogo2x = siteLogoScales?.preview.download;
    if (siteLogo2x) {
      srcSet = `${siteLogo2x} 2x,${siteLogo} 1x`;
    }
  }

  const siteLogoWidth = siteLogoScales?.mini.width ?? 158; // default plone logo width
  const siteLogoHeight = siteLogoScales?.mini.height ?? 41; // default plone logo height

  const siteTitle =
    siteSettings.result.site_title ?? intl.formatMessage(messages.plonesite);

  return (
    <UniversalLink
      href={settings.isMultilingual ? `/${lang}` : '/'}
      title={intl.formatMessage(messages.site)}
    >
      <Image
        srcSet={srcSet}
        src={LogoImage}
        alt={siteTitle}
        title={siteTitle}
        width={siteLogoWidth}
        height={siteLogoHeight}
      />
    </UniversalLink>
  );
};

export default Logo;
