angular.module('cb.components.validation', []);

angular.module('cb.components', ['cb.components.validation']);

(function() {
    'use strict';

    angular
        .module('cb.components.validation')
        .factory('cbDevice', factory);

    function factory() {
        var service = {
            getDeviceInfo: getDeviceInfo
        };
        return service;

        ////////////////

        function getDeviceInfo() {
            var unknown = '-';

            // screen
            var screenSize = '';
            if (screen.width) {
                var width = (screen.width) ? screen.width : '';
                var height = (screen.height) ? screen.height : '';
                screenSize += '' + width + ' x ' + height;
            }

            //browser
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browser = navigator.appName;
            var version = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset;
            var verOffset;
            var ix;

            // Opera
            if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }

            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(verOffset + 5);
            }

            // Chrome
            else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                browser = 'Chrome';
                version = nAgt.substring(verOffset + 7);
            }

            // Safari
            else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                browser = 'Safari';
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }

            // Firefox
            else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                browser = 'Firefox';
                version = nAgt.substring(verOffset + 8);
            }

            // MSIE 11+
            else if (nAgt.indexOf('Trident/') != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(nAgt.indexOf('rv:') + 3);
            }

            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
            }

            // trim the version string
            if ((ix = version.indexOf(';')) != -1) {
                version = version.substring(0, ix);
            }

            if ((ix = version.indexOf(' ')) != -1) {
                version = version.substring(0, ix);
            }

            if ((ix = version.indexOf(')')) != -1) {
                version = version.substring(0, ix);
            }

            majorVersion = parseInt('' + version, 10);
            if (isNaN(majorVersion)) {
                version = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            // mobile version
            var mobile = /Mobile|mini|Fennec|WPDesktop|Android|iP(ad|od|hone)/.test(nVer);

            // cookie
            var cookieEnabled = (navigator.cookieEnabled) ? true : false;

            if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                document.cookie = 'testcookie';
                cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
            }

            // system
            var os = unknown;
            var clientStrings = [{
                s: 'Windows 3.11',
                r: /Win16/
            }, {
                s: 'Windows 95',
                r: /(Windows 95|Win95|Windows_95)/
            }, {
                s: 'Windows ME',
                r: /(Win 9x 4.90|Windows ME)/
            }, {
                s: 'Windows 98',
                r: /(Windows 98|Win98)/
            }, {
                s: 'Windows CE',
                r: /Windows CE/
            }, {
                s: 'Windows 2000',
                r: /(Windows NT 5.0|Windows 2000)/
            }, {
                s: 'Windows XP',
                r: /(Windows NT 5.1|Windows XP)/
            }, {
                s: 'Windows Server 2003',
                r: /Windows NT 5.2/
            }, {
                s: 'Windows Vista',
                r: /Windows NT 6.0/
            }, {
                s: 'Windows 7',
                r: /(Windows 7|Windows NT 6.1)/
            }, {
                s: 'Windows 8.1',
                r: /(Windows 8.1|Windows NT 6.3)/
            }, {
                s: 'Windows 8',
                r: /(Windows 8|Windows NT 6.2)/
            }, {
                s: 'Windows NT 4.0',
                r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
            }, {
                s: 'Windows ME',
                r: /Windows ME/
            }, {
                s: 'Android',
                r: /Android/
            }, {
                s: 'Open BSD',
                r: /OpenBSD/
            }, {
                s: 'Sun OS',
                r: /SunOS/
            }, {
                s: 'Linux',
                r: /(Linux|X11)/
            }, {
                s: 'iOS',
                r: /(iPhone|iPad|iPod)/
            }, {
                s: 'Mac OS X',
                r: /Mac OS X/
            }, {
                s: 'Mac OS',
                r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
            }, {
                s: 'QNX',
                r: /QNX/
            }, {
                s: 'UNIX',
                r: /UNIX/
            }, {
                s: 'BeOS',
                r: /BeOS/
            }, {
                s: 'OS/2',
                r: /OS\/2/
            }, {
                s: 'Search Bot',
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = unknown;

            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }

            switch (os) {
                case 'Mac OS X':
                    osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'Android':

                    var androidVersion = /Android ([\.\_\d]+)/.exec(nAgt);
                    if (androidVersion) {
                        osVersion = androidVersion[1];
                    }

                    break;

                case 'iOS':
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                    break;
            }

            // flash (you'll need to include swfobject)
            /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
            var flashVersion = 'no check';
            if (typeof swfobject != 'undefined') {
                var fv = swfobject.getFlashPlayerVersion();
                if (fv.major > 0) {
                    flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
                } else {
                    flashVersion = unknown;
                }
            }

            return {
                screenSize: screenSize,
                browser: browser,
                browserVersion: version,
                mobile: mobile,
                os: os,
                osVersion: osVersion,
                cookies: cookieEnabled,
                flashVersion: flashVersion,
                nVer: nVer
            };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('cb.components.validation')
        .directive('cbIpadress', cbIpadress);

    function cbIpadress() {

        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };

        return directive;

        function link(scope, element, attrs, ctrl) {

            function ipAddressValidator(viewValue) {

                if (!viewValue) {
                    return setValidity(false, viewValue);
                }

                var parts = viewValue.split('.');

                if (parts.length !== 4) {
                    return setValidity(false, viewValue);
                }

                var areAllZeroes = true;
                for (var i = 0; i < parts.length; i++) {

                    var num = parseInt(parts[i]);
                    if (isNaN(num)) {
                        return setValidity(false, viewValue);
                    }

                    if (num < 0 || num > 255) {
                        return setValidity(false, viewValue);
                    }

                    if (num !== 0) {
                        areAllZeroes = false;
                    }
                }

                if (areAllZeroes) {
                    return setValidity(false, viewValue);
                } else {
                    return setValidity(true, viewValue);
                }
            }

            function setValidity(isValid, viewValue) {

                ctrl.$setValidity('ipaddress', isValid);
                return viewValue;
            }

            ctrl.$parsers.unshift(ipAddressValidator);
            ctrl.$formatters.unshift(ipAddressValidator);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('cb.components.validation')
        .directive('cbMin', cbMin);

    function cbMin() {

        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };

        return directive;

        function link(scope, element, attrs, ctrl) {

            var minValidator = function(viewValue) {

                var min = scope.$eval(attrs.cbMin) || 0;

                if (!isEmpty(viewValue) && viewValue < min) {
                    ctrl.$setValidity('min', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('min', true);
                    return viewValue;
                }
            };

            ctrl.$parsers.unshift(minValidator);
            ctrl.$formatters.unshift(minValidator);
        }

        function isEmpty(viewValue) {
            return angular.isUndefined(viewValue) || viewValue === '' || viewValue === null || viewValue !== viewValue;
        }
    }

})();
