# Tech Hub hero

`techhub-hero.gltf` is a local copy of the GLTF supplied for this project.
Its geometry buffers are embedded; it has no external texture dependencies.
The export contains geometry but no materials. The original `.spline` file is
not shipped because it is not needed by the native renderer.

The GLTF is retained as a source reference but is no longer loaded by the hero.
The hero extrudes both exact paths from the complete Tech Hub SVG, with separate
gradients for the body and dot. Front faces preserve the SVG colors without
lighting or tone mapping; rounded edges receive the 3D lighting. There are no
background blocks or substitute spheres.

Rendering: `src/components/ui/heroSceneRenderer.ts`. No Spline viewer, remote
scene URL, account, attribution overlay manipulation, or camera controls.
The camera fits the composition automatically. Pointer motion is bounded;
there is no continuous idle animation. Reduced motion uses the SVG fallback.
