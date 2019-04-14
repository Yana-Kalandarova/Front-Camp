/**
 *
 *  Transform node1.append(node2) into node1.appendChild(node2)
 *  to support ie 11 and older (also works for prepend)
 *
 *  It only works if you pass one(!) Node, not DOMString.
 *
 */

module.exports = () => {
  const isCorrectExpression = (path) => {
    const { parentPath } = path;

    if (parentPath.isCallExpression() && parentPath.get('arguments').length === 1) return true;
  };

  return {
    visitor: {
      MemberExpression(path) {
        if (!isCorrectExpression(path)) return;

        if (path.node.property.name === 'append') {
          path.node.property.name = 'appendChild';
        }

        if (path.node.property.name === 'prepend') {
          path.node.property.name = 'prependChild';
        }
      },
    },
  };
};
