/**
 * Created by howe on 16/9/9.
 */
var testStore = require('./store_test').testStore;
const MemStore = require('../../store/memstore');

var memStore = new MemStore();
testStore('MemStore',memStore)