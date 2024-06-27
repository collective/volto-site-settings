import React from 'react';
import { useSelector } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const ImageProperty = ({ value, alt = '', ...imageProps }) => {
  //is possibile to pass as defaultValue an <img> tag. If value is not defaultValue, we have to create <img> tag:
  if (!React.isValidElement(value)) {
    return (
      <img
        src={value.url}
        width={`${value.width}`}
        height={`${value.height}`}
        alt={alt}
        {...imageProps}
      />
    );
  }
  return value;
};
const SiteProperty = ({
  property = 'site_title',
  defaultValue,
  forceValue, //if null, use logic implemented here as a fallback
  getValue = false,
  getParent = false,
  alt,
  ...imageProps
}) => {
  const site = useSelector((state) => state.site.data); //loaded by asyncPropExtender from volto
  const subsite = useSelector((state) => state.subsite?.data); //if you have volto-subsites installed
  const currentLang = useSelector((state) => state.intl.locale);

  const hasSubsite =
    subsite && Object.entries(subsite).length && subsite.constructor === Object;

  const property_name = getParent ? 'parent_' + property : property;

  let site_property =
    site?.['plone.' + property_name] ?? site?.['plone.' + property];
  site_property = JSON.stringify(site_property) === '{}' ? null : site_property;

  const defaultFromConfig =
    config.settings?.['volto-site-settings']?.default[property_name];

  let value = site_property ?? defaultValue ?? defaultFromConfig;

  if (subsite && getParent) {
    value = site?.['plone.' + property] ?? defaultValue ?? defaultFromConfig;
  }

  switch (property) {
    case 'site_title':
      if (value && value.constructor === Object) {
        value = value[currentLang] || value.default;
      }
      if (hasSubsite && !getParent) {
        value = subsite?.title ?? value;
      }
      break;
    case 'site_subtitle':
      if (value && value.constructor === Object) {
        value = value[currentLang] || '';
      }
      if (hasSubsite && !getParent) {
        value = subsite?.description ?? value;
      }
      break;
    case 'site_logo':
      const logo_height = config.settings?.['volto-site-settings']?.logo_height;

      if (subsite && subsite.subsite_logo && !getParent) {
        const logo_scale = logo_height / subsite.subsite_logo.height;

        value = (
          <img
            src={flattenToAppURL(subsite.subsite_logo.scales?.mini?.download)}
            width={subsite.subsite_logo.width * logo_scale}
            height={logo_height}
            alt={alt ?? 'Logo'}
            {...imageProps}
          />
        );
      }
      if (!getValue) {
        const logo_scale = logo_height / value.height;

        value = ImageProperty({
          value: {
            ...value,
            width: value.width * logo_scale,
            height: logo_height,
          },
          alt: alt ?? 'Logo',
          ...imageProps,
        });
      }
      break;
    case 'site_logo_footer':
      if (!getValue) {
        value = ImageProperty({
          value: {
            ...value,
            width: value.width ?? '82', //set default width and height if not set
            height: value.height ?? '82', //set default width and height if not set
          },
          alt: alt ?? 'Logo',
          ...imageProps,
        });
      }
      break;
    case 'site_favicon':
      value = value.url;
      if (!getValue) {
        value = <link rel="shortcut icon" href={value} />;
      }

      break;
    default:
      break;
  }

  if (forceValue) {
    value = forceValue;
  }

  return getValue ? value : <>{value ?? ''}</>;
};
export default SiteProperty;
