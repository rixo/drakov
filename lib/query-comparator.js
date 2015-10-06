exports.noParamComparator = function(a, b){
    return (a.parsedUrl.queryParams.length - b.parsedUrl.queryParams.length);
};

exports.queryParameterComparator = function(a, b){
    if (b.matchingQueryParams === a.matchingQueryParams){
        return (a.nonMatchingQueryParams - b.nonMatchingQueryParams);
    }
    return (b.matchingQueryParams - a.matchingQueryParams);
};

exports.queryParameterPerfectMatchComparator = function(a, b) {
    if (b.perfectMatchQueryParams === a.perfectMatchQueryParams) {
        return exports.queryParameterComparator(a, b);
    }
    return (b.perfectMatchQueryParams - a.perfectMatchQueryParams);
};

exports.countMatchingQueryParms = function (handlers, reqQueryParams){
    handlers.forEach(function(handler){
        handler.matchingQueryParams = 0;
        handler.nonMatchingQueryParams = 0;
        handler.parsedUrl.queryParams.forEach(function(templateQueryParam){
            if (reqQueryParams.indexOf(templateQueryParam)>-1){
                handler.matchingQueryParams +=1;
            } else {
                handler.nonMatchingQueryParams +=1;
            }
        });
    });
};

exports.countPerfectMatchQueryParams = function(handlers, req) {
    var query = req.query;
    handlers.forEach(function(handler) {
        handler.perfectMatchQueryParams = 0;
        for (var name in query) {
            if (query.hasOwnProperty(name)) {
                var value = query[name];
                var perfectMatches = [
                    name + '=' + value,
                    name + '="' + value + '"',
                    name + "='" + value + "'"
                ];
                handler.parsedUrl.queryParams.forEach(function(templateQueryParam) {
                    if (perfectMatches.indexOf(templateQueryParam)>-1) {
                        handler.perfectMatchQueryParams += 1;
                    }
                });
            }
        }
    });
};
