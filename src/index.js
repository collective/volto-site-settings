import { MultilingualWidget } from 'volto-multilingual-widget';
import { TextareaWidget } from '@plone/volto/components';
import RegistryImageWidget from './components/manage/Widgets/RegistryImageWidget';
import SiteProperty from './components/SiteProperty/SiteProperty';
import SiteSettingsExtras from './components/SiteSettingsExtras/SiteSettingsExtras';
import { filterControlPanelsSchema } from './config/ControlPanels';
import './styles/widgets.css';
export { SiteProperty, SiteSettingsExtras };

const applyConfig = (config) => {
  config.settings['volto-site-settings'] = {
    ...(config.settings['volto-site-settings'] ?? {}),
    default: {
      ...(config.settings['volto-site-settings']?.default ?? {}),
      site_title: null,
      parent_site_title: null,
    },
    logo_height: 82,
  };
  config.registerComponent({
    name: 'SiteSettingsExtras',
    component: SiteSettingsExtras,
  });

  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: SiteSettingsExtras,
    },
  ];
  config.settings.filterControlPanelsSchema = filterControlPanelsSchema;

  config.widgets.id.site_title_translated = MultilingualWidget(
    (props) => <TextareaWidget {...props} wrapped={false} />,
    [],
  );
  config.widgets.id.site_subtitle = MultilingualWidget(
    (props) => <TextareaWidget {...props} wrapped={false} />,
    [],
  );
  config.widgets.id.site_logo = RegistryImageWidget;
  config.widgets.id.site_logo_footer = RegistryImageWidget;
  config.widgets.id.site_favicon = RegistryImageWidget;
  return config;
};

export default applyConfig;
