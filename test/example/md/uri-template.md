FORMAT: 1A

# Specification with URI templates
See [Blueprint API - URI Templates section](https://github.com/apiaryio/api-blueprint/blob/master/API%20Blueprint%20Specification.md#uri-templates)

## Things [/api/uri/{param1}]

+ Parameters
    + param1 (string, `12345`) ... Parameter for the request

### Get with URI template parameter [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "first"
            }

## Things [/api/uri/{param2}]

+ Parameters
    + param2 (string, `12345`) ... Parameter for the request

### Get with URI template parameter [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "second"
            }

## Things [/api/uri/specified]

+ Parameters
    + param1 (string, `specified`) ... Parameter for the request

### Get with filled URI template parameter [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "specified"
            }

## Multiple parameters [/api/uri/{param1}/{param2}]

+ Parameters
    + param1 (string, `example`) ... Parameter for the request
    + param2 (string, `example`) ... Parameter for the request

### Get with filled URI template parameter [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "multiple parameters"
            }

## Multiple parameters one of two filled [/api/uri/{param1}/bar]

+ Parameters
    + param1 (string, `example`) ... Parameter for the request
    + param2 (string, `example`) ... Parameter for the request

### Get with filled URI template parameter [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "multiple parameters one of two"
            }

## Multiple parameters one of two filled [/api/uri/foo/bar]

+ Parameters
    + param1 (string, `example`) ... Parameter for the request
    + param2 (string, `example`) ... Parameter for the request

### Get with filled URI template parameter [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "multiple parameters two of two"
            }

## Multiple parameters two of two filled [/api/uri/foo/bar{?q1}]

+ Parameters
    + param1 (stri ng, `example`) ... Parameter for the request
    + param2 (string, `example`) ... Parameter for the request
    + q1 (string, `example`) ... Parameter for the request

### Get with filled URI template parameter [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "multiple parameters two of two & query string"
            }
