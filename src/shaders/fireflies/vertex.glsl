attribute float aRandom;

uniform float uPixelRatio;
uniform float uTime;

varying vec2 vUv;
varying float vRandom;

float elevation;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += sin(uTime + modelPosition.y * 20.0) * 0.02;

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_PointSize = (sin(uTime * aRandom * 2.0) * 20.0 + 20.0) * aRandom * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);

    gl_Position = projectedPosition;

    vUv = uv;
    vRandom = aRandom;
}
