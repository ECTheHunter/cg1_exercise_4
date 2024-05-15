attribute vec3 position;
varying vec3 sphereNormal;
varying vec2 vUv;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
    // Transform the position to world space
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // Project the point onto a sphere
    sphereNormal = normalize(worldPosition.xyz);
    
 

    // Transform the position to camera space and then to clip space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
