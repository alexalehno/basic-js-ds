const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined with this interface
 * function ListNode(x) {
 *   this.value = x;
 *   this.next = null;
 * }
 */

module.exports = function removeKFromList(l, k) {
  searchAndDel(l, k);

  return l;

  function searchAndDel(node, k) {
    if (k === node.value) {
      removeNode(findIndex(node.value));
    }

    if (!node.next) return;
    searchAndDel(node.next, k);
  }

  function removeNode(pos) {
    if (pos < 0 || pos >= l.length) {
      return;
    }

    let cur = l;

    if (pos === 0) {
      l = cur.next;
    } else {
      let pre = null;
      let index = 0;

      while (index < pos) {
        pre = cur;
        cur = cur.next;
        index++
      }

      pre.next = cur.next;
    }
    return cur.value;
  }

  function findIndex(el) {
    let cur = l;
    let index = 0;

    while (cur) {
      if (cur.value === el) {
        return index;
      }

      cur = cur.next;
      index++;
    }
    return -1;
  }
}
