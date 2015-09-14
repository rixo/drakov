var helper = require('../lib');
var request = helper.getRequest();

describe.only('URI Template Parameters', function () {
    before(function (done) {
        helper.drakov.run({sourceFiles: 'test/example/md/uri-template.md'}, done);
    });

    after(function (done) {
        helper.drakov.stop(done);
    });

    describe('/api/uri/test', function(){
        it('should respond with response specified in a endpoint with no parameters', function(done){
            request.get('/api/uri/test')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'raw'})
                .end(helper.endCb(done));
        });
    });

    describe('/api/uri/specified', function(){
        it('should respond with response specified in a endpoint with no parameters', function(done){
            request.get('/api/uri/specified')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'specified'})
                .end(helper.endCb(done));
        });
    });

    describe('/api/muri/{param1}/{param2}', function(){
        it('a', function(done){
            request.get('/api/muri/p1/p2')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'multiple parameters'})
                .end(helper.endCb(done));
        });

        it('b', function(done){
            request.get('/api/muri/p1/bar')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'multiple parameters one of two'})
                .end(helper.endCb(done));
        });

        it('c', function(done){
            request.get('/api/muri/foo/bar')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'multiple parameters two of two'})
                .end(helper.endCb(done));
        });

        it('d', function(done){
            request.get('/api/muri/foo/bar?q1')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'multiple parameters two of two & query string'})
                .end(helper.endCb(done));
        });
    });
});
