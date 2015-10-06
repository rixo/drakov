FORMAT: 1A

# Specification for URI perfect match
With perfect match option, perfect URI match should be selected in priority over
other definition, even if they are not the first match.

## Things [/api/uri/things{?filter}]

### Get with generic definition [GET]

+ Parameters
    + filter: `null` - Parameter for the request

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "first"
            }

## Things [/api/uri/things?filter=0]

### Get with hardcoded parameter 0 [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "0"
            }

## Things [/api/uri/things?filter=1]

### Get with hardcoded parameter 1 [GET]

+ Response 200 (application/json;charset=UTF-8)

    + Body

            {
               "id": "1"
            }
