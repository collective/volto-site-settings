# volto-site-settings

Volto add-on that fetches site settings, as configured in the Site controlpanel, during SSR and stores data in the redux store.
It also contains a customization of the default Volto Logo component that uses the logo and site title set in the controlpanel.

> **Note**: this add-on currently needs [redturtle.volto](https://pypi.org/project/redturtle.volto/) to be installed in order to work.

## Installation

In your Volto project run

```bash
yarn add -W volto-site-settings
```

Then add the add-on to the `addons` section of your project `package.json` file.

## Usage

You can read the site settings directly from the redux store, they will always be populated since they are requested by the server when generating the page during SSR.

The settings are not refreshed on navigation. This means that after changing the settings, you need a full reload of the page in order to read the settings again.

```javascript
import { useSelector } from 'react-redux';

const Logo = () => {
  const siteSettings = useSelector((state) => state.siteSettings);
  const siteTitle = siteSettings.result.site_title;
  ...
};
```

See the [customized Logo implementation](./src/customizations/volto/components/theme/Logo/Logo.jsx) in this package for more details.

## Contributing

Contributions are welcome, feel free to [open an issue](https://github.com/collective/volto-site-settings/issues) or submit a PR.

This project uses the conventional changelog specification (see [COMMITLINT.md](./COMMITLINT.md)).

## License

This product is licensed under the [MIT License](./LICENSE).

## Authors

This product was developed by the [RedTurtle Technology](https://www.redturtle.it) team.

![RedTurtle](https://avatars1.githubusercontent.com/u/1087171?s=100&v=4)
