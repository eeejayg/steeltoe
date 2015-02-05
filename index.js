/*
 * steelToe/index.js
 *
 * Angularized version of https://github.com/jclem/steeltoe
 * "Don't shoot yourself in the foot while traversing Javascript objects."
 *
 * Deeply sets nested properties which may be undefined,
 * or gets deeply nested object properties
 *
 * Usage:
 *
 * steelToe.do(someObject).set("a.b.c","somevalue")
 * steelToe.do(someObject).get("a.b.c") => "somevalue"
 */

angular.module('vendor.steelToe', [])

.service('steelToe', function() {

        function steelToe (object) {

            function _steelToe (property) {
                if (object && property) {
                    return steelToe(object[property]);
                } else {
                    return property ? steelToe() : object;
                }
            }

            _steelToe.set = function (traversalChain, value) {
                var keys = traversalChain.split('.'),
                    object = _steelToe;

                for (var i = 0; i < keys.length; i ++) {
                    if (!object()[keys[i]]) {
                        object()[keys[i]] = {};
                    }

                    if (i == keys.length - 1) {
                        object()[keys[i]] = value;
                    }

                    object = object(keys[i]);
                }

                return value;
            };

            _steelToe.get = function (traversalChain) {
                if (traversalChain) {
                    var keys = traversalChain.split('.'),
                        returnObject = _steelToe, i;

                    for (i = 0; i < keys.length; i += 1) {
                        returnObject = returnObject(keys[i])
                    }

                    return returnObject();
                } else {
                    return _steelToe();
                }
            };

            return _steelToe;
        }

        return {

            "do" : function(object) {
                return steelToe(object);
            }

        }

});



