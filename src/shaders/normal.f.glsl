precision highp float;

uniform sampler2D mytexture; 
uniform sampler2D normalMap; 
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBitangent;
varying vec3 vLightDir;
varying vec3 vViewDir;

void main() {

float ambientReflectance=0.2; 
float diffuseReflectance=1.0;
    vec3 ambientColor = texture2D(mytexture, vUv).xyz;
    vec3 diffuseColor = ambientColor;
     // Assuming normal map is defined in tangent space with an offset of 0.5
    vec3 normalMapValue = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
    
    // Transform normal from tangent space to world space
    vec3 normal = normalize(normalMapValue.x * vTangent + normalMapValue.y * vBitangent + normalMapValue.z * vNormal);
    float diffuseIntensity = max(dot(normal, vLightDir), 0.0);
    vec3 ambient = ambientColor * ambientReflectance;
    vec3 diffuse = diffuseIntensity * diffuseColor * diffuseReflectance;

    // Final color
    vec3 finalColor = ambient + diffuse;

    // Output final color
    gl_FragColor = vec4(finalColor, 1.0);
}
