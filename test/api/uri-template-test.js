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
        it('should respond with the first endpoint that match if there is none that is specified', function(done){
            request.get('/api/uri/test')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'first'})
                .end(helper.endCb(done));
        });
    });

    describe('/api/uri/specified', function(){
        it('should respond with the most specific endpoint even if it is not the first', function(done){
            request.get('/api/uri/specified')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'specified'})
                .end(helper.endCb(done));
        });
    });

    describe('/api/uri/{param1}/{param2}', function(){
        it('should respond with the first endpoint that matches the number of variables', function(done){
            request.get('/api/uri/p1/p2')
                .expect(200)
                .expect('Content-type', 'application/json;charset=UTF-8')
                .expect({id: 'multiple parameters'})
                .end(helper.endCb(done));
        });

        it(
            'should respond with the most specific endpoint when some of the variable are specified in the blueprint',
            function(done){
                request.get('/api/uri/p1/bar')
                    .expect(200)
                    .expect('Content-type', 'application/json;charset=UTF-8')
                    .expect({id: 'multiple parameters one of two'})
                    .end(helper.endCb(done));
            }
        );

        it(
            'should respond with the most specific endpoint when all variables are specified',
            function(done){
                request.get('/api/uri/foo/bar')
                    .expect(200)
                    .expect('Content-type', 'application/json;charset=UTF-8')
                    .expect({id: 'multiple parameters two of two'})
                    .end(helper.endCb(done));
            }
        );

        it(
            'should respond with the most specific endpoint with the most fulfilled query params',
            function(done){
                request.get('/api/uri/foo/bar?q1')
                    .expect(200)
                    .expect('Content-type', 'application/json;charset=UTF-8')
                    .expect({id: 'multiple parameters two of two & query string'})
                    .end(helper.endCb(done));
            }
        );
    });
});
