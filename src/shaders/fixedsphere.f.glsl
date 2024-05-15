precision mediump float;
varying vec3 sphereNormal;
uniform sampler2D mytexture;
uniform sampler2D drawingtexture;

void main() {

    
    // Calculate spherical coordinates and normalize
    float phi = atan(-sphereNormal.z, sphereNormal.x);
    float theta = atan(sqrt(pow(sphereNormal.x, 2.0) + pow(-sphereNormal.z, 2.0)), -sphereNormal.y);




    // Normalize and map spherical coordinates to (u, v)
    vec2 vUv = vec2((phi + 3.141) / (2.0 * 3.141), theta / 3.141);

    // Transform the position to camera space and then to clip space

    vec4 texColor = texture2D(mytexture, vUv);
    vec4 drawingColor = texture2D(drawingtexture, vUv);
    vec4 finalColor = mix(texColor, drawingColor, drawingColor.a);
    gl_FragColor = finalColor;
}
