precision mediump float;

varying vec2 vUv;
uniform sampler2D mytexture;
uniform sampler2D drawingtexture;

void main() {

    vec4 texColor = texture2D(mytexture, vUv);
    vec4 drawingColor = texture2D(drawingtexture, vUv);
    vec4 finalColor = mix(texColor, drawingColor, drawingColor.a);
    gl_FragColor = finalColor;
}
