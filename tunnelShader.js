import * as THREE from 'three';

export const tunnelVertexShader = `
    varying vec2 vUv;
    
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const tunnelFragmentShader = `
    precision highp float;
    
    uniform sampler2D uTexture;
    uniform sampler2D uTexture2;
    uniform float uBlendFactor;
    uniform float uProgress;
    uniform vec2 uFocalPoint;
    uniform float uZoomIntensity;
    uniform float uTime;
    uniform vec2 uResolution;
    
    varying vec2 vUv;
    
    vec2 lensDistortion(vec2 uv, vec2 focal, float intensity) {
        vec2 delta = uv - focal;
        float dist = length(delta);
        float distortion = 1.0 + intensity * dist * dist;
        return focal + delta * distortion;
    }
    
    float filmGrain(vec2 uv, float time) {
        float noise = fract(sin(dot(uv * time, vec2(12.9898, 78.233))) * 43758.5453);
        return noise * 0.03;
    }
    
    void main() {
        vec2 distortedUV = lensDistortion(vUv, uFocalPoint, uZoomIntensity * uProgress);
        distortedUV = clamp(distortedUV, 0.0, 1.0);
        
        vec4 tex1 = texture2D(uTexture, distortedUV);
        
        vec4 finalColor = tex1;
        
        if (uBlendFactor > 0.0 && uTexture2 != uTexture) {
            vec2 distortedUV2 = lensDistortion(vUv, uFocalPoint, uZoomIntensity * uProgress);
            distortedUV2 = clamp(distortedUV2, 0.0, 1.0);
            vec4 tex2 = texture2D(uTexture2, distortedUV2);
            finalColor = mix(tex1, tex2, uBlendFactor);
        }
        
        float vignette = 1.0 - smoothstep(0.3, 1.0, length(vUv - 0.5) * 1.2);
        finalColor.rgb *= mix(0.6, 1.0, vignette);
        
        float grain = filmGrain(vUv, uTime * 0.5);
        finalColor.rgb += grain - 0.015;
        
        gl_FragColor = finalColor;
    }
`;

export function createTunnelMaterial(texture) {
    return {
        uniforms: {
            uTexture: { value: texture },
            uTexture2: { value: texture },
            uBlendFactor: { value: 0.0 },
            uProgress: { value: 0.0 },
            uFocalPoint: { value: new THREE.Vector2(0.5, 0.51) },
            uZoomIntensity: { value: 0.15 },
            uTime: { value: 0.0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: tunnelVertexShader,
        fragmentShader: tunnelFragmentShader
    };
}
