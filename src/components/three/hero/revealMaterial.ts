import * as THREE from 'three';

/**
 * Two-stage "design → colour" look for one hero object. All its materials share these uniforms:
 *  - `uBuild` 0 → 1: the object is drawn into existence from left to right (a designer cursor sweeps it),
 *  - `uReveal` 0 → 1: grey clay is painted with its real print colours from the top down (a colourist cursor).
 */
export interface RevealUniforms {
  uBuild: { value: number };
  uReveal: { value: number };
  /** world position of the object origin (updated every frame) */
  uOriginX: { value: number };
  uOriginY: { value: number };
  /** radius of the object's bounding sphere (already multiplied by its scale) */
  uRadius: { value: number };
  /** colour of the glowing edge while an object is being drawn */
  uEdge: { value: THREE.Color };
}

export function createRevealUniforms(edgeColor: THREE.ColorRepresentation): RevealUniforms {
  return {
    uBuild: { value: 0 },
    uReveal: { value: 0 },
    uOriginX: { value: 0 },
    uOriginY: { value: 0 },
    uRadius: { value: 1 },
    uEdge: { value: new THREE.Color(edgeColor) },
  };
}

/** Where the build front is, relative to the object centre, for a given build value. */
export function buildFrontOffset(radius: number, build: number): number {
  return -radius - 0.25 + (radius * 2 + 0.5) * build;
}

/** Where the paint front is, relative to the object centre, for a given reveal value. */
export function paintFrontOffset(radius: number, reveal: number): number {
  return radius + 0.3 - (radius * 2 + 0.75) * reveal;
}

const SHARED_UNIFORMS = `
  varying vec2 vRevealPos;
  uniform float uBuild;
  uniform float uReveal;
  uniform float uOriginX;
  uniform float uOriginY;
  uniform float uRadius;
  uniform vec3 uEdge;
`;

function patchVertex(shader: THREE.WebGLProgramParametersWithUniforms): void {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec2 vRevealPos;')
    .replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\nvec4 revealWorld = modelMatrix * vec4(transformed, 1.0);\nvRevealPos = revealWorld.xy;',
    );
}

function bindUniforms(shader: THREE.WebGLProgramParametersWithUniforms, uniforms: RevealUniforms): void {
  shader.uniforms.uBuild = uniforms.uBuild;
  shader.uniforms.uReveal = uniforms.uReveal;
  shader.uniforms.uOriginX = uniforms.uOriginX;
  shader.uniforms.uOriginY = uniforms.uOriginY;
  shader.uniforms.uRadius = uniforms.uRadius;
  shader.uniforms.uEdge = uniforms.uEdge;
}

const BUILD_CLIP = `
  float buildRelativeX = vRevealPos.x - uOriginX;
  float buildFront = -uRadius - 0.25 + (uRadius * 2.0 + 0.5) * uBuild;
  if (uBuild < 0.001 || buildRelativeX > buildFront) discard;
`;

/** Patches a standard/physical material: drawn in by `uBuild`, then painted by `uReveal`. */
export function applyReveal<T extends THREE.MeshStandardMaterial>(material: T, uniforms: RevealUniforms): T {
  material.onBeforeCompile = (shader) => {
    bindUniforms(shader, uniforms);
    patchVertex(shader);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${SHARED_UNIFORMS}`)
      .replace('void main() {', `void main() {\n${BUILD_CLIP}`)
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        {
          float relativeY = vRevealPos.y - uOriginY;
          float front = uRadius + 0.3 - (uRadius * 2.0 + 0.75) * uReveal;
          float painted = smoothstep(front - 0.18, front + 0.18, relativeY);
          float luminance = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
          vec3 clay = vec3(mix(0.58, 0.9, luminance));
          diffuseColor.rgb = mix(clay, diffuseColor.rgb, painted);
          float drawGlow = smoothstep(buildFront - 0.22, buildFront, buildRelativeX) * step(uBuild, 0.999);
          diffuseColor.rgb = mix(diffuseColor.rgb, uEdge, drawGlow * 0.55);
        }`,
      );
  };
  material.customProgramCacheKey = () => 'hero-reveal-v2';
  return material;
}

/** Patches a line material (blueprint edges) so it is drawn in by the same `uBuild` front. */
export function applyBuildClip<T extends THREE.Material>(material: T, uniforms: RevealUniforms): T {
  material.onBeforeCompile = (shader) => {
    bindUniforms(shader, uniforms);
    patchVertex(shader);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${SHARED_UNIFORMS}`)
      .replace('void main() {', `void main() {\n${BUILD_CLIP}`);
  };
  material.customProgramCacheKey = () => 'hero-clip-v2';
  return material;
}
