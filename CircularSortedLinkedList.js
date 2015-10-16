'use strict';

var LinkedList = require('./LinkedList');
var ListNode = require('./ListNode');

function CircularSortedLinkedList() {
	LinkedList.call(this);
};

CircularSortedLinkedList.prototype = new LinkedList();

module.exports = CircularSortedLinkedList;
