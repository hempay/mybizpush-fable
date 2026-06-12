import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Flowing "aurora silk" built from layered simplex-style FBM noise,
// tinted with the brand magenta/violet palette and warped by the cursor.
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uMouse;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.55;
    for (int i = 0; i < 4; i++) {
      f += amp * snoise(p);
      p *= 2.04;
      amp *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.09;

    // cursor warps the field gently
    vec2 m = uMouse * 2.0 - 1.0;
    float mouseDist = length(p - vec2(m.x * (uResolution.x / uResolution.y), -m.y));
    float warp = 0.35 * exp(-mouseDist * 1.6);

    vec2 q = vec2(
      fbm(p * 1.1 + t),
      fbm(p * 1.1 - t * 0.7)
    );
    vec2 r = vec2(
      fbm(p * 1.3 + q * 1.4 + vec2(1.7, 9.2) + t * 0.8),
      fbm(p * 1.3 + q * 1.4 + vec2(8.3, 2.8) - t * 0.6)
    );
    float field = fbm(p * 1.2 + r * (1.6 + warp));

    // brand palette: deep ink -> violet -> magenta -> electric blue highlights
    vec3 ink     = vec3(0.031, 0.008, 0.051);
    vec3 violet  = vec3(0.23, 0.06, 0.40);
    vec3 magenta = vec3(0.83, 0.0, 0.82);
    vec3 volt    = vec3(0.36, 0.19, 1.0);

    float band = smoothstep(-0.6, 0.9, field);
    vec3 col = mix(ink, violet, band);
    col = mix(col, magenta, smoothstep(0.35, 0.95, field) * 0.75);
    col = mix(col, volt, smoothstep(0.55, 1.1, length(q) * field) * 0.55);

    // mouse glow
    col += magenta * warp * 0.45;

    // vignette
    float vig = smoothstep(1.6, 0.35, length(p));
    col *= mix(0.55, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function HeroCanvas({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uResolution: {
        value: new THREE.Vector2(
          mount.clientWidth * renderer.getPixelRatio(),
          mount.clientHeight * renderer.getPixelRatio()
        ),
      },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const onPointer = (e: PointerEvent) => {
      targetMouse.set(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      );
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let visible = true;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      uniforms.uTime.value = prefersReduced ? 10 : clock.getElapsedTime();
      uniforms.uMouse.value.lerp(targetMouse, 0.04);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      uniforms.uResolution.value.set(
        mount.clientWidth * renderer.getPixelRatio(),
        mount.clientHeight * renderer.getPixelRatio()
      );
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} />;
}
