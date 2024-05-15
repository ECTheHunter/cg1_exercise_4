precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
attribute vec3 bitangent;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBitangent;
varying vec3 vLightDir;
varying vec3 vViewDir;

void main() {
    vUv = uv;

    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
     vNormal = vec3(0.0, 0.0, 1.0); 
    vTangent = vec3(1.0, 0.0, 0.0); 
    vBitangent = vec3(0.0, 1.0, 0.0); 

    vLightDir = normalize(vec3(2.0, 2.0, 3.0) - viewPosition.xyz);
    vViewDir = normalize(-viewPosition.xyz);

    gl_Position = projectionMatrix * viewPosition;
}
