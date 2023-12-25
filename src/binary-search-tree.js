const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (!this.rootNode) {
      this.rootNode = new Node(data);
      return;
    }

    let current = this.rootNode;
    while (current) {
      if (data < current.data) {
        if (!current.left) {
          current.left = new Node(data);
          return;
        }
        current = current.left;
      } else if (data > current.data) {
        if (!current.right) {
          current.right = new Node(data);
          return;
        }
        current = current.right;
      } else {
        return; // ignoring duplicate values
      }
    }
  }

  has(data) {
    return this._searchNode(this.rootNode, data) !== null;
  }

  find(data) {
    return this._searchNode(this.rootNode, data);
  }

  _searchNode(node, data) {
    while (node) {
      if (data === node.data) {
        return node;
      } else if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
    } else {
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      const successor = this._findMinNode(node.right);
      node.data = successor.data;
      node.right = this._removeNode(node.right, successor.data);
    }

    return node;
  }

  _findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  min() {
    return this._findMinNode(this.rootNode)?.data || null;
  }

  max() {
    let current = this.rootNode;
    while (current && current.right) {
      current = current.right;
    }
    return current?.data || null;
  }
}

module.exports = {
  BinarySearchTree
};