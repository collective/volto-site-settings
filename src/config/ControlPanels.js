import { filterControlPanelsSchema as voltoFilterControlPanelsSchema } from '@plone/volto/config/ControlPanels';

// Filters props.controlpanel.schema to only valid/relevant fields
export const filterControlPanelsSchema = (controlpanel) => {
  const voltoSchema = voltoFilterControlPanelsSchema(controlpanel);

  const panelType = controlpanel['@id'].split('/').pop();

  const wantedSettings = {
    site: [
      'site_favicon',
      //'site_favicon_mimetype'
    ],
  };

  // Creates modified version of properties object
  const newPropertiesObj = {
    ...voltoSchema.properties,
    ...Object.fromEntries(
      Object.entries(controlpanel.schema.properties).filter(([key, val]) =>
        (wantedSettings[panelType] || []).includes(key),
      ),
    ),
  };

  const addFields = (fields = []) => {
    return [...fields, ...(wantedSettings[panelType] || [])];
  };

  // Creates modified version of fieldsets array
  const newFieldsets = voltoSchema.fieldsets.map((fieldset) => {
    return { ...fieldset, fields: addFields(fieldset.fields) };
  });

  // Returns clone of props.controlpanel.schema, with updated properties/fieldsets
  return {
    ...controlpanel.schema,
    properties: newPropertiesObj,
    fieldsets: newFieldsets,
  };
};
