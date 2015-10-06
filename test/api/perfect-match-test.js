var helper = require('../lib');
var request = helper.getRequest();

describe('URI Perfect Match', function () {
  before(function (done) {
    helper.drakov.run({
      sourceFiles: 'test/example/md/perfect-match.md',
      queryPerfectMatchesFirst: true
    }, done);
  });

  after(function (done) {
    helper.drakov.stop(done);
  });

  describe('/api/uri/things', function(){
    it('should respond with the first endpoint that match if there is no perfect match', function(done){
      request.get('/api/uri/things')
        .expect(200)
        .expect('Content-type', 'application/json;charset=UTF-8')
        .expect({id: 'first'})
        .end(helper.endCb(done));
    });
  });

  describe('/api/uri/things?filter=0', function(){
    it('should respond with the second spec, that is a perfect match', function(done){
      request.get('/api/uri/things?filter=0')
        .expect(200)
        .expect('Content-type', 'application/json;charset=UTF-8')
        .expect({id: '0'})
        .end(helper.endCb(done));
    });
  });

  describe('/api/uri/things?filter=1', function(){
    it('should respond with the third spec, that is a perfect match', function(done){
      request.get('/api/uri/things?filter=1')
        .expect(200)
        .expect('Content-type', 'application/json;charset=UTF-8')
        .expect({id: '1'})
        .end(helper.endCb(done));
    });
  });
});
