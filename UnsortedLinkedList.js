'use strict';

var copy = require('deepcopy');
var LinkedList = require('./LinkedList');
var ListNode = require('./ListNode');

function UnsortedLinkedList(compare) {
    LinkedList.call(this, compare); //super
}
UnsortedLinkedList.prototype = new LinkedList();
UnsortedLinkedList.prototype.constructor = UnsortedLinkedList;
UnsortedLinkedList.prototype.insert = function unsortedLinkedListInsert(item) {
    var newItem = new ListNode(item);
    newItem.next = this.list;
    this.list = newItem;
    this.numItems++;
};
UnsortedLinkedList.prototype.contains = function unsortedLinkedListContains(item) {
    var loc = this.list;
    var found = false;
    var moreToSearch = loc !== null;

    while(moreToSearch && !found) {
        if(this.compare(item, loc.item) === 0) {
            found = true;
        } else {
            loc = loc.next;
            moreToSearch = loc !== null;
        }
    }

    return found;
};

module.exports = UnsortedLinkedList;
