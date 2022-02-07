export const getDefaultValues = schema => {
  return schema.reduce((acc, curVal) => {
    let defaultVal;
    switch (curVal.componentType) {
      case 'text':
      case 'select':
      case 'radio':
        defaultVal = '';
        break;
      case 'checkbox':
        defaultVal = false;
        break;
      default:
        defaultVal = '';
        break;
    }
    return {...acc, [curVal.name]: curVal.defaultValue || defaultVal};
  }, {});
};

export const getValidationSchema = schema => {
  // TODO: add validation logic
};

export const getInitialValues = (defaultValues, initialValues) => {
  if (!initialValues) {
    return defaultValues;
  }
  return {...defaultValues, ...initialValues};
};
