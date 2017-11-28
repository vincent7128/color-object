var codeTemplate = `var color = Color('%_COLOR_%');
console.log(color.hex());  // %_HEX_%
console.log(color.hexa()); // %_HEXA_%
console.log(color.rgb());  // %_RGB_%
console.log(color.rgba()); // %_RGBA_%
console.log(color.vec3()); // %_VEC3_%
console.log(color.vec4()); // %_VEC4_%
`,
    color = Color(),
    form,
    colorHEX, colorHEXA, colorRGB, colorRGBA,
    codeExample;

function init() {
    form = document.querySelector('form');
    colorHEX = document.querySelector('.color-hex');
    colorHEXA = document.querySelector('.color-hexa');
    colorRGB = document.querySelector('.color-rgb');
    colorRGBA = document.querySelector('.color-rgba');
    codeExample = document.querySelector('.code-example');
    form.addEventListener('change', updateColor, false);
    form.querySelector('input[name="color-r"]').value = randomColor();
    form.querySelector('input[name="color-g"]').value = randomColor();
    form.querySelector('input[name="color-b"]').value = randomColor();
    form.querySelector('input[name="color-a"]').value = randomColor();
    updateColor();
}


function updateColor() {
    color.color = [
        parseInt(form.querySelector('input[name="color-r"]').value),
        parseInt(form.querySelector('input[name="color-g"]').value),
        parseInt(form.querySelector('input[name="color-b"]').value),
        parseInt(form.querySelector('input[name="color-a"]').value)
    ];
    colorHEX.innerHTML = '<div>' + color.hex() + '</div>';
    colorHEXA.innerHTML = '<div>' + color.hexa() + '</div>';
    colorRGB.innerHTML = '<div>' + color.rgb() + '</div>';
    colorRGBA.innerHTML = '<div>' + color.rgba() + '</div>';
    colorHEX.childNodes[0].style.backgroundColor = color.hex();
    colorHEXA.childNodes[0].style.backgroundColor = color.hexa();
    colorRGB.childNodes[0].style.backgroundColor = color.rgb();
    colorRGBA.childNodes[0].style.backgroundColor = color.rgba();

    codeExample.innerHTML = format(codeTemplate, {
        '%_COLOR_%': color.rgba(),
        '%_HEX_%': color.hex(),
        '%_HEXA_%': color.hexa(),
        '%_RGB_%': color.rgb(),
        '%_RGBA_%': color.rgba(),
        '%_VEC3_%': JSON.stringify(color.vec3()),
        '%_VEC4_%': JSON.stringify(color.vec4())
    });
    codeExample.style.display = 'block';
}

function format(message, opt) {
    for (var key in opt) {
        message = message.replace(key, opt[key]);
    }
    return message;
}

function randomColor() {
    return Math.random() * 255;
}

window.addEventListener('load', init, false);