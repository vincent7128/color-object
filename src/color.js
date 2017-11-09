(function() {
    'use strict';
    var hex3 = /^#([0-9A-F])([0-9A-F])([0-9A-F])$/i,
        hex4 = /^#([0-9A-F])([0-9A-F])([0-9A-F])([0-9A-F])$/i,
        hex6 = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
        hex8 = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
        rgb = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i,
        rgba = /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i,
        ap, fn = {};
    ap = function(color) {
        var color = convert(color);
        for (var f in fn) {
            color[f] = fn[f];
        }
        return color;
    };

    fn.hex = function() {
        return '#' + toHex(this.r) + toHex(this.g) + toHex(this.b);
    };

    fn.hexa = function() {
        return '#' + toHex(this.r) + toHex(this.g) + toHex(this.b) + toHex(this.a);
    };

    fn.rgb = function() {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };

    fn.rgba = function() {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + trimFloat(this.a / 255) + ')';
    };

    fn.vec3 = function() {
        return [
            trimFloat(this.r / 255),
            trimFloat(this.g / 255),
            trimFloat(this.b / 255)
        ];
    };

    fn.vec4 = function() {
        return [
            trimFloat(this.r / 255),
            trimFloat(this.g / 255),
            trimFloat(this.b / 255),
            trimFloat(this.a / 255)
        ];
    };

    function convert(color) {
        if (!color) {
            color = '#000F';
        }
        color = color.trim();
        var match;
        if (match = hex3.exec(color)) {
            color = {
                r: converHex(match[1]+ match[1]),
                g: converHex(match[2]+ match[2]),
                b: converHex(match[3]+ match[3]),
                a: 255
            };
        } else if (match = hex4.exec(color)) {
            color = {
                r: converHex(match[1]+ match[1]),
                g: converHex(match[2]+ match[2]),
                b: converHex(match[3]+ match[3]),
                a: converHex(match[4]+ match[4])
            };
        } else if (match = hex6.exec(color)) {
            color = {
                r: converHex(match[1]),
                g: converHex(match[2]),
                b: converHex(match[3]),
                a: 255
            };
        } else if (match = hex8.exec(color)) {
            color = {
                r: converHex(match[1]),
                g: converHex(match[2]),
                b: converHex(match[3]),
                a: converHex(match[4])
            };
        } else if (match = rgb.exec(color)) {
            color = {
                r: converRGB(match[1]),
                g: converRGB(match[2]),
                b: converRGB(match[3]),
                a: 255
            };
        } else if (match = rgba.exec(color)) {
            color = {
                r: converRGB(match[1]),
                g: converRGB(match[2]),
                b: converRGB(match[3]),
                a: converAlpha(match[4])
            };
        } else {
            color = {
                r: 0,
                g: 0,
                b: 0,
                a: 255
            };
        }
        return color;
    }

    function converHex(value) {
        return trimValue(parseInt(value, 16));
    }

    function converRGB(value) {
        return trimValue(parseInt(value, 10));
    }

    function converAlpha(value) {
        return trimValue(parseFloat(value) * 255);
    }

    function toHex(value) {
        return ('00' + value.toString(16)).slice(-2).toUpperCase();
    }

    function trimValue(value) {
        return Math.min(255, Math.max(0, value))
    }

    function trimFloat(value) {
        return Math.round(value * 100) / 100;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ap;
    } else {
        window.Color = ap;
    }
})();