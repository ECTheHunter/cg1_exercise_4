precision mediump float;
varying vec3 vNormal;
varying vec3 vViewDirection;
uniform sampler2D mytexture; // Use sampler2D for equirectangular textures

void main() {
    // Use normalized viewing direction as the reflection vector

    
    // Calculate reflection of the viewing direction with the normal
     vec3 reflectionVector = reflect(normalize(vViewDirection), normalize(vNormal));

    
    float phi = atan(reflectionVector.x, -reflectionVector.z);
    float theta = atan(sqrt(pow(reflectionVector.x, 2.0) + pow(-reflectionVector.z, 2.0)), reflectionVector.y);
    vec2 vUv = vec2((phi + 3.141) / (2.0 * 3.141), theta / 3.141);

    vec4 envColor = texture2D(mytexture, vUv);
    
    gl_FragColor = envColor;
}
