export const GET_SITE_SETTINGS = 'GET_SITE_SETTINGS';

/**
 * Get site settings.
 * @function getSiteSettings
 * @returns {Object} Site settings.
 * Es: http://localhost:8080/Plone/@site-settings
 */
export function getSiteSettings() {
  return {
    type: GET_SITE_SETTINGS,
    request: {
      op: 'get',
      path: `/@site-settings`,
    },
  };
}
