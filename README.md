Color Object
======

[📺 Live Demo](https://vincent7128.github.io/color-object/)  
Create a color object and convert to rgb, rgba or hex string and WebGL color array.

## Usage
NPM:
```
npm install color-object

var color = require('color-object');
```
CDN:
```
<script src="https://cdn.jsdelivr.net/npm/color-object/dist/color.js"></script>
```
Code example:
```
/* Init color object */
/* <hex-color> values */
var color = Color('#090');
var color = Color('#009900');
var color = Color('#090a');
var color = Color('#009900aa');

/* <rgb()> values */
var color = Color('rgb(34, 12, 64)');
var color = Color('rgba(34, 12, 64, 0.6)');

/* color convert */
color.hex();   // covent to css hex color string, like #00FFCC
color.hexa();  // covent to css hex color string, like #00FFCCAA
color.rgb();   // covent to css rgb color string, like rgb(34, 12, 64)
color.rgba();  // covent to css rgba color string, like rgb(34, 12, 64, 0.6)
color.vec3();  // covent to WebGL vec3 color array, like [0, 0, 0]
color.vec4();  // covent to WebGL vec4 color array, like [0, 0, 0, 1]
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
