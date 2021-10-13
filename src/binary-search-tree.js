const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  root() {
    if (!this.data) return null
    return this.data;
  }

  add(data) {
    this.data = addWithin(this.data, data);

    function addWithin(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;

      if (data < node.data) node.left = addWithin(node.left, data);
      else node.right = addWithin(node.right, data);

      return node;
    }
  }

  has(data) {
    return searchWithin(this.data, data);

    function searchWithin(node, data) {
      if (!node) return false;
      if (node.data === data) return true;

      return data < node.data
        ? searchWithin(node.left, data)
        : searchWithin(node.right, data);
    }
  }

  find(data) {
    let result = null;

    doLeft(this.data);

    function doLeft(node) {
      if (node) {
        doLeft(node.left);
        if (node.data === data) result = node;
        doLeft(node.right);
      }
    }
    return result
  }

  remove(data) {
    this.data = removeNode(this.data, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;

      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;

      } else {

        if (!node.left && !node.right) return null;

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;

        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.data) return;
    let node = this.data;
    while (node.left) node = node.left;
    return node.data;
  }

  max() {
    if (!this.data) return;
    let node = this.data;
    while (node.right) node = node.right;
    return node.data;
  }
}