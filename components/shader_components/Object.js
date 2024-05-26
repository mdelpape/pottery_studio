import { useRef, useEffect, useState } from "react";
import { shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import hexRgb from 'hex-rgb';

import fragment from "./fragment.glsl";
import vertex from "./vertex.glsl";

import image from "@/public/assets/image.jpg";

export default function Object({ radius = 0.2, color = '#ff0000' }) {
  const shaderRef = useRef();
  const [time, setTime] = useState(0);
  const [loudness, setLoudness] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [rgb, setRgb] = useState(
    { red: 1, green: 0, blue: 0 }
  );
  useEffect(() => {
    //extract values out of the hex
    const { red, green, blue } = hexRgb(color);
    setRgb({ red, green, blue });
  }, [color]);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const getAudioData = () => {
          analyser.getByteFrequencyData(dataArray);

          // Compute the loudness value
          const sum = dataArray.reduce((a, b) => a + b, 0);
          const average = sum / dataArray.length;
          const normalizedLoudness = average / 255;

          setLoudness(normalizedLoudness);
          requestAnimationFrame(getAudioData);
        };

        getAudioData();
      })
      .catch(err => console.error('Error accessing audio stream:', err));

    return () => {
      audioContext.close();
    };
  }, []);

  const texture = useLoader(TextureLoader, '/assets/image.jpg');

  useFrame(() => {
    setTime((prevTime) => prevTime + 0.001);
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = time;
    }
  });
  return (
    <mesh>
      <shaderMaterial
        key={JSON.stringify(rgb) + time}
        ref={shaderRef}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={{
          uTime: { value: time },
          uRadius: { value: radius },
          uTexture: { value: texture },
          uLoudness: { value: loudness },
          uRed: { value: rgb.red / 255 },
          uGreen: { value: rgb.green / 255 },
          uBlue: { value: rgb.blue / 255 },
        }}
        // wireframe
      />
      <sphereGeometry args={[2, 1000, 1000, 100]} />
    </mesh>
  );
}
