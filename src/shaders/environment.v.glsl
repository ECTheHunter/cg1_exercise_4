attribute vec3 position;
attribute vec3 normal;
varying vec3 vViewDirection;
varying vec3 vNormal;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

void main() {
   vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDirection = normalize(cameraPosition - viewPosition.xyz);
     vNormal = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
