
export default function Water() {

  const vertexShader = `

  uniform mat4 textureMatrix;
  varying vec4 vUv;

  #include <common>
  #include <logdepthbuf_pars_vertex>

  void main() {

    vUv = textureMatrix * vec4( position, 1.0 );

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    #include <logdepthbuf_vertex>

  }
`;

  // Fragment Shader
  const fragmentShader = `
  uniform vec3 color;
  uniform sampler2D tDiffuse;
  uniform sampler2D tDudv;
  uniform float time;
  varying vec4 vUv;

  #include <logdepthbuf_pars_fragment>

  void main() {

    #include <logdepthbuf_fragment>

    float waveStrength = .1;
    float waveSpeed = 0.03;

     // simple distortion (ripple) via dudv map (see https://www.youtube.com/watch?v=6B7IF6GOu7s)

     vec2 distortedUv = texture2D( tDudv, vec2( vUv.x + time * waveSpeed, vUv.y ) ).rg * waveStrength;
     distortedUv = vUv.xy + vec2( distortedUv.x, distortedUv.y + time * waveSpeed );
     vec2 distortion = ( texture2D( tDudv, distortedUv ).rg * 2.0 - 1.0 ) * waveStrength;

     // new uv coords

     vec4 uv = vec4( vUv );
     uv.xy += distortion;

    vec4 base = texture2DProj( tDiffuse, uv );
    gl_FragColor = vec4( mix( base.rgb, color, 0.7 ), 1.0 );

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

  }
`;

  // Creating Custom Shader
  const customShader = {
    uniforms: {
      color: { value: null },
      textureMatrix: { value: null },
      tDiffuse: { value: null },
      mirrorSampler: { value: null },
      tDudv: { value: null },
      time: { value: null },
      customTexture: { value: null }, // Add custom texture uniform
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };

  return (
    <mesh
    >
    </mesh>
  )
}