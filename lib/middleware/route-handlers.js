
var pathToRegexp = require('path-to-regexp');

var queryComparator = require('../query-comparator');
var buildRouteMap = require('./route-map');


module.exports = function(options, cb) {
    var perfectMatchEnabled = !!options.queryPerfectMatchesFirst;

    buildRouteMap(options, function(err, routeMap) {
        if (err) {
            cb(err);
        }
        var middleware = function(req, res, next) {
            var handlers = null;

            Object.keys(routeMap).forEach(function(urlPattern) {
                if (handlers) {
                    return; // continue if we've already got handlers
                }
                var regex = pathToRegexp(urlPattern);

                // req.path allows us to delegate query string handling to the route handler functions
                var match = regex.exec(req.path);
                if (match) {
                    handlers = routeMap[urlPattern].methods[req.method.toUpperCase()];
                }
            });

            if (handlers) {
                var queryParams = Object.keys(req.query);
                if (queryParams.length === 0){
                    handlers.sort(queryComparator.noParamComparator);
                } else {
                    queryComparator.countMatchingQueryParms(handlers, queryParams);
                    if (perfectMatchEnabled) {
                        queryComparator.countPerfectMatchQueryParams(handlers, req);
                        handlers.sort(queryComparator.queryParameterPerfectMatchComparator);
                    } else {
                        handlers.sort(queryComparator.queryParameterComparator);
                    }
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
