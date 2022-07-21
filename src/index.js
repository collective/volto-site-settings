import { getSiteSettings, GET_SITE_SETTINGS } from './actions/siteSettings';
import { siteSettings } from './reducers/siteSettings';

const applyConfig = (config) => {
  config.settings.asyncPropsExtenders = [
    ...config.settings.asyncPropsExtenders,
    {
      path: '/',
      extend: (dispatchActions) => {
        if (
          dispatchActions.filter(
            (asyncAction) => asyncAction.key === GET_SITE_SETTINGS,
          ).length === 0
        ) {
          dispatchActions.push({
            key: GET_SITE_SETTINGS,
            promise: ({ location, store: { dispatch } }) =>
              __SERVER__ && dispatch(getSiteSettings()),
          });
        }
        return dispatchActions;
      },
    },
  ];

  config.addonReducers = {
    ...config.addonReducers,
    siteSettings,
  };

  return config;
};

export default applyConfig;
