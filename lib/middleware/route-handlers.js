
var pathToRegexp = require('path-to-regexp');

var queryComparator = require('../query-comparator');
var buildRouteMap = require('./route-map');


module.exports = function(options, cb) {
    buildRouteMap(options, function(err, routeMap) {
        if (err) {
            cb(err);
        }
        //console.trace("!!!");
        //console.log(routeMap)
        var middleware = function(req, res, next) {
            var handlers = null;
            var paramScore = null;

            Object.keys(routeMap).some(function(urlPattern) {
                //if (handlers) {
                //    return; // continue if we've already got handlers
                //}
                var regex = pathToRegexp(urlPattern);

                // req.path allows us to delegate query string handling to the route handler functions
                var match = regex.exec(req.path);
                if (match) {
                    if (req.path === urlPattern) {
                        // first complete match, it wins
                        handlers = routeMap[urlPattern].methods[req.method.toUpperCase()];
                        return true;
                    } else if (!handlers || paramScore > regex.keys.length) {
                        // first match || best match
                        handlers = routeMap[urlPattern].methods[req.method.toUpperCase()];
                        paramScore = regex.keys.length;
                    }
                }
            });

            if (handlers) {
                var queryParams = Object.keys(req.query);
                if (queryParams.length === 0){
                    handlers.sort(queryComparator.noParamComparator);
                } else {
                    queryComparator.countMatchingQueryParms(handlers, queryParams);
                    handlers.sort(queryComparator.queryParameterComparator);
                }

                var requestHandled = false;
                handlers.forEach(function (handler) {
                    if (requestHandled) {
                        return;
                    }
                    requestHandled = handler.execute(req, res);
                });
            }
            next();
        };
        cb(null, middleware);
    });
};
