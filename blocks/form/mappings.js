/**
 * returns a decorator to decorate the field definition
 *
 * */
export default async function componentDecorator(fd) {
  const { ':type': type = '', fieldType, name } = fd;
  if (fieldType === 'file-input') {
    const module = await import('./components/file.js');
    return module.default;
  }
  if (type.endsWith('wizard')) {
    const module = await import('./components/wizard.js');
    return module.default;
  }
  // if (name === 'ownership') {
  //   const module = await import('./components/switch.js');
  //   return module.default;
  // }
  return null;
}
