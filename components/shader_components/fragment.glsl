uniform float uTime;
uniform float uRed;
uniform float uGreen;
uniform float uBlue;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;

void main() {
	float disaplacementFactor = 1.0 / vDisplacement;
	gl_FragColor = vec4(uRed * disaplacementFactor, uGreen * disaplacementFactor, uBlue * disaplacementFactor, 1);
}
