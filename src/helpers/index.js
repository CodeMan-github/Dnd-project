export const uid = (() => {
  let id = 1;
  return (name = '') => `${name}${id++}`;
})();

const fieldNames = [
  'section',
  'column',
  'shape',
];

const filedNamesPlural = fieldNames.map(name => `${name}s`);

export const treeToJSON = (tree, nestingLevel = 0, parentId = null) => tree.reduce(
  (acc, { children, id, ...item }, index) => {
    const childrenKey = filedNamesPlural[nestingLevel + 1];

    acc[index] = {
      position: index,
      ...item,
    };

    if (!id.startsWith('new')) acc[index]._id = id;

    if (children && children.length) acc[index][childrenKey] = treeToJSON(children, nestingLevel + 1, id);

    return acc;
  },
  [],
);

export const JSONToTree = (object, nestingLevel = 0) => Object.values(object).reduce(
  (acc, {
    _id: id,
    [filedNamesPlural[nestingLevel + 1]]: children,
    position,
    ...item,
  }) => {

    acc[position] = { ...item, id };

    delete acc[position]._id

    if (children) acc[position].children = JSONToTree(children, nestingLevel + 1);

    return acc;
  },
  [],
);

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';

const rescale = (value, multiplier) => Math.round(value * multiplier);

export const getRandomString = length => Array(length)
  .fill(1)
  .map(
    () => Math.random() > 0.3
      ? alphabet[rescale(Math.random(), 36)]
      : alphabet[rescale(Date.now() % 10 + Math.random() * 10, 1.8)]
  )
  .join('');

export const getByPath = (tree, path) => {
  let current = tree;

  path.forEach(id => {
    if (!current) return;
    if (Array.isArray(current)) {
      current = current.find(item => item.id === id)
    } else {
      current = current.children.find(item => item.id === id);
    }
    return current;
  });

  return current;
};
