export const hasEmptyFields = (object: {[key: string]: unknown}) => {
  let hasEmpty = false;

  for (const propName in object) {
    if (
      object[propName] === null ||
      object[propName] === undefined ||
      object[propName] === ''
    ) {
      hasEmpty = true;
    }
  }

  return hasEmpty;
};
