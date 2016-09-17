/**
 * Created by howe on 16/9/17.
 */
const assert = require('assert');
const cookies = require('../../utils/cookies');


describe('cookies',function(){
    it('should be cookie',function(){
        var c = cookies.parse('foo=bar; foo1=bar1')
        assert.equal(c.foo,'bar');
        assert.equal(c.foo1,'bar1')
    })
})