attribute vec3 position;
varying vec2 vUv;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
    // Transform the position to world space
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // Project the point onto a sphere
    vec3 sphereNormal = normalize(worldPosition.xyz);
    
    // Calculate spherical coordinates and normalize
    float phi = atan(-sphereNormal.z, sphereNormal.x);
    float theta = atan(sqrt(pow(sphereNormal.x, 2.0) + pow(-sphereNormal.z, 2.0)), -sphereNormal.y);




    // Normalize and map spherical coordinates to (u, v)
    vUv = vec2((phi + 3.141) / (2.0 * 3.141), theta / 3.141);

    // Transform the position to camera space and then to clip space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
