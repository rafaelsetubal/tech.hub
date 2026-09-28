import {describe,expect,it} from 'vitest';
import {brandColorAt,dotColorAt,createLogoGeometry,heroFrustum,logoEntrance} from '../src/components/ui/heroSceneRenderer';
import {readFileSync} from 'node:fs';

describe('Hero geometry and responsive camera',()=>{
  it('assembles body before dot and finishes without an endless animation',()=>{
    expect(logoEntrance(0)).toEqual({body:0,dot:0});
    expect(logoEntrance(250).body).toBeGreaterThan(0);
    expect(logoEntrance(250).dot).toBe(0);
    expect(logoEntrance(1000).body).toBeGreaterThan(logoEntrance(1000).dot);
    expect(logoEntrance(1800)).toEqual({body:1,dot:1});
    expect(logoEntrance(10000)).toEqual({body:1,dot:1});
  });
  it.each([[0,'7f7ffc'],[.38,'9fa2fc'],[.68,'b8bdfc'],[1,'d3ddfc']])('matches the separate dot gradient at %s',(t,hex)=>{
    const p=Number(t);
    expect(dotColorAt(231.57+(333.501-231.57)*p,221.286+(119.293-221.286)*p).getHexString()).toBe(hex);
  });
  it('keeps the dot at its original SVG position instead of using a substitute sphere',()=>{
    const geometry=createLogoGeometry(true);geometry.computeBoundingBox();
    expect(geometry.boundingBox!.min.x).toBeGreaterThan(.4);
    expect(geometry.boundingBox!.max.x).toBeLessThan(1.8);
    geometry.dispose();
  });
  it.each([[0,'0059ff'],[.42,'4169ff'],[.72,'8b7cff'],[1,'d8d3ff']])('matches the supplied SVG gradient at stop %s',(t,hex)=>{
    const progress=Number(t);
    expect(brandColorAt(316.757*progress,340.642+(125.307-340.642)*progress).getHexString()).toBe(hex);
  });
  it.each([[360,360],[390,400],[600,520],[900,520]])('keeps the full composition inside the camera at %sx%s',(w,h)=>{
    const frame=heroFrustum(w,h);
    expect(frame.right).toBeGreaterThanOrEqual(2.65);
    expect(frame.top).toBeGreaterThanOrEqual(2.65);
    expect((frame.right-frame.left)/(frame.top-frame.bottom)).toBeCloseTo(w/h);
  });
  it('builds a finite, extruded brand silhouette',()=>{
    const geometry=createLogoGeometry();geometry.computeBoundingBox();
    expect(geometry.boundingBox!.max.z-geometry.boundingBox!.min.z).toBeGreaterThan(.3);
    expect(Array.from(geometry.attributes.position.array).every(Number.isFinite)).toBe(true);
    expect(geometry.attributes.uv.count).toBe(geometry.attributes.position.count);
    expect(Array.from(geometry.attributes.uv.array).every(Number.isFinite)).toBe(true);
    geometry.dispose();
  });
  it('has a self-contained local model with no remote textures or buffers',()=>{
    const model=JSON.parse(readFileSync('public/models/techhub-hero.gltf','utf8'));
    expect(model.meshes.length).toBe(4);
    expect(model.buffers.every((b:{uri:string})=>b.uri.startsWith('data:'))).toBe(true);
    expect(model.images??[]).toHaveLength(0);
  });
});
