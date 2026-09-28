import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { BRAND_BODY, BRAND_DOT } from './BrandSymbol';

// Exact gradient stops and direction from the supplied Vector.svg.
const brandStops = [[0,'#0059FF'],[.42,'#4169FF'],[.72,'#8B7CFF'],[1,'#D8D3FF']] as const;
export function brandColorAt(x:number,y:number) {
  const dx=316.757,dy=125.307-340.642;
  const t=THREE.MathUtils.clamp((x*dx+(y-340.642)*dy)/(dx*dx+dy*dy),0,1);
  let i=1;while(i<brandStops.length-1&&t>brandStops[i][0])i++;
  const [start,a]=brandStops[i-1], [end,b]=brandStops[i];
  // SVG gradients interpolate in sRGB, not in linear lighting space.
  return new THREE.Color(a).convertLinearToSRGB().lerp(new THREE.Color(b).convertLinearToSRGB(),(t-start)/(end-start)).convertSRGBToLinear();
}

const dotStops = [[0,'#7F7FFC'],[.38,'#9FA2FC'],[.68,'#B8BDFC'],[1,'#D3DDFC']] as const;
export function dotColorAt(x:number,y:number) {
  const dx=333.501-231.57,dy=119.293-221.286;
  const t=THREE.MathUtils.clamp(((x-231.57)*dx+(y-221.286)*dy)/(dx*dx+dy*dy),0,1);
  let i=1;while(i<dotStops.length-1&&t>dotStops[i][0])i++;
  const [start,a]=dotStops[i-1],[end,b]=dotStops[i];
  return new THREE.Color(a).convertLinearToSRGB().lerp(new THREE.Color(b).convertLinearToSRGB(),(t-start)/(end-start)).convertSRGBToLinear();
}

function brandTexture(dot=false) {
  const size=128,data=new Uint8Array(size*size*4);
  // Interpolate sRGB bytes once. Avoid allocating/converting Colors per pixel.
  const stops=(dot?dotStops:brandStops).map(([offset,hex])=>({offset,color:new THREE.Color(hex).convertLinearToSRGB()}));
  const dx=dot?333.501-231.57:316.757,dy=dot?119.293-221.286:125.307-340.642;
  const originX=dot?231.57:0,originY=dot?221.286:340.642;
  for(let y=0;y<size;y++)for(let x=0;x<size;x++) {
    const px=x/(size-1)*350-8,py=349-y/(size-1)*357;
    const progress=THREE.MathUtils.clamp(((px-originX)*dx+(py-originY)*dy)/(dx*dx+dy*dy),0,1);
    let i=1;while(i<stops.length-1&&progress>stops[i].offset)i++;
    const a=stops[i-1],b=stops[i],t=(progress-a.offset)/(b.offset-a.offset);
    const offset=(y*size+x)*4;
    data[offset]=Math.round(THREE.MathUtils.lerp(a.color.r,b.color.r,t)*255);
    data[offset+1]=Math.round(THREE.MathUtils.lerp(a.color.g,b.color.g,t)*255);
    data[offset+2]=Math.round(THREE.MathUtils.lerp(a.color.b,b.color.b,t)*255);
    data[offset+3]=255;
  }
  const texture=new THREE.DataTexture(data,size,size);
  texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=THREE.LinearFilter;texture.minFilter=THREE.LinearFilter;texture.needsUpdate=true;
  return texture;
}

export function heroFrustum(width: number, height: number) {
  const aspect = Math.max(1, width) / Math.max(1, height);
  const halfHeight = Math.max(2.65, 2.65 / aspect);
  return { left: -halfHeight * aspect, right: halfHeight * aspect, top: halfHeight, bottom: -halfHeight };
}

export function logoEntrance(elapsed:number) {
  const ease=(t:number)=>1-Math.pow(1-THREE.MathUtils.clamp(t,0,1),3);
  return {body:ease(elapsed/1500),dot:ease((elapsed-250)/1550)};
}

export function createLogoGeometry(dot=false) {
  const svg = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${dot?BRAND_DOT:BRAND_BODY}"/></svg>`);
  const shapes = svg.paths.flatMap(path => SVGLoader.createShapes(path));
  const geometry = new THREE.ExtrudeGeometry(shapes, { depth: 22, bevelEnabled: true, bevelSegments: 6, steps: 1, bevelSize: 8, bevelThickness: 10, curveSegments: 24 });
  geometry.translate(-167, -170, -11);
  geometry.scale(.0095, -.0095, .0095);
  // Negative Y changes handedness; restore winding so the front is lit correctly.
  const positions = geometry.getAttribute('position');
  const normals = geometry.getAttribute('normal');
  const a=new THREE.Vector3(),b=new THREE.Vector3();
  for (let i=0;i<positions.count;i+=3) {
    for (const attribute of [positions,normals]) {
      a.fromBufferAttribute(attribute,i+1);
      b.fromBufferAttribute(attribute,i+2);
      attribute.setXYZ(i+1,b.x,b.y,b.z); attribute.setXYZ(i+2,a.x,a.y,a.z);
    }
  }
  geometry.computeVertexNormals();
  const uv=new Float32Array(positions.count*2);
  for(let i=0;i<positions.count;i++) {
    const x=positions.getX(i)/.0095+167,y=170-positions.getY(i)/.0095;
    uv[i*2]=(x+8)/350;
    uv[i*2+1]=(349-y)/357;
  }
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  return geometry;
}

export async function mountHeroScene(host: HTMLDivElement, signal: AbortSignal, onReady:()=>void, onError:()=>void) {
  if(signal.aborted)return ()=>{};
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power',failIfMajorPerformanceCaveat:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
  renderer.setClearColor(0xfcfcfa,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1;
  host.append(renderer.domElement);
  const scene=new THREE.Scene();
  // Transparent canvas: only the brand is rendered, no backdrop or tiles.
  const camera=new THREE.OrthographicCamera(-3,3,3,-3,.1,30);
  camera.position.set(0,0,10);
  const pmrem=new THREE.PMREMGenerator(renderer);
  const room=new RoomEnvironment();
  const environment=pmrem.fromScene(room,.04);
  scene.environment=environment.texture;
  room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff,0xabc3ff,.7));
  const key=new THREE.DirectionalLight(0xffffff,1.4);key.position.set(-3,4,5);scene.add(key);
  const rim=new THREE.DirectionalLight(0xd9ceff,.8);rim.position.set(4,-1,3);scene.add(rim);
  const group=new THREE.Group();scene.add(group);
  // Keep the SVG colors unlit on the front. Light only the rounded sides,
  // so the 3D treatment cannot bleach or shift the brand's gradient.
  const gradient=brandTexture(),dotGradient=brandTexture(true);
  const face=new THREE.MeshBasicMaterial({map:gradient,toneMapped:false});
  const dotFace=new THREE.MeshBasicMaterial({map:dotGradient,toneMapped:false});
  const edge=new THREE.MeshPhysicalMaterial({map:gradient,roughness:.2,metalness:0,clearcoat:1,envMapIntensity:.5});
  const dotEdge=new THREE.MeshPhysicalMaterial({map:dotGradient,roughness:.2,metalness:0,clearcoat:1,envMapIntensity:.5});
  const logo=new THREE.Mesh(createLogoGeometry(),[face,edge]);
  const dot=new THREE.Mesh(createLogoGeometry(true),[dotFace,dotEdge]);
  group.add(logo,dot);
  let disposed=false,frame=0,visible=true,targetX=0,targetY=0,scroll=0;
  let elapsed=0,lastTime=0,currentX=0,currentY=0,currentScroll=0;
  let announced=false,slowFrames=0,renderedFrames=0;
  const render=(now=performance.now())=>{
    frame=0;if(disposed||!visible||document.hidden)return;
    const delta=lastTime?Math.min(now-lastTime,50):16;lastTime=now;
    elapsed+=delta;
    const damping=1-Math.exp(-delta/115);
    currentX=THREE.MathUtils.lerp(currentX,targetX,damping);
    currentY=THREE.MathUtils.lerp(currentY,targetY,damping);
    currentScroll=THREE.MathUtils.lerp(currentScroll,scroll,damping);
    const entrance=logoEntrance(elapsed);
    group.rotation.set(-.05+currentX+currentScroll*.12,-.12+currentY+(1-entrance.body)*.65,-.035-currentScroll*.05);
    group.position.y=(1-entrance.body)*-.32+currentScroll*.12;
    group.scale.setScalar(.88+entrance.body*.12);
    logo.position.z=(1-entrance.body)*-.7;
    // The detached dot assembles after the body, then responds at a different
    // depth to the pointer. Motion settles completely once input stops.
    dot.position.set((1-entrance.dot)*.46+currentY*.18,(1-entrance.dot)*.48-currentX*.22,(1-entrance.dot)*1.1+currentY*.35);
    const renderStart=performance.now();
    renderer.render(scene,camera);
    renderedFrames++;
    const renderCost=performance.now()-renderStart;
    if(renderedFrames>3)slowFrames=renderCost>40?slowFrames+1:0;
    if(slowFrames>=4){onError();return;}
    if(!announced){announced=true;onReady();}
    if(elapsed<1800||Math.abs(currentX-targetX)+Math.abs(currentY-targetY)+Math.abs(currentScroll-scroll)>.0005)frame=requestAnimationFrame(render);
  };
  const request=()=>{if(!frame&&!disposed)frame=requestAnimationFrame(render);};
  const resize=()=>{const {width,height}=host.getBoundingClientRect();if(!width||!height)return;Object.assign(camera,heroFrustum(width,height));camera.updateProjectionMatrix();renderer.setSize(width,height);request();};
  const pointer=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;const r=host.getBoundingClientRect();targetY=THREE.MathUtils.clamp((e.clientX-r.left)/r.width-.5,-.5,.5)*.8;targetX=THREE.MathUtils.clamp((e.clientY-r.top)/r.height-.5,-.5,.5)*.5;request();};
  const reset=()=>{targetX=0;targetY=0;request();};
  const onScroll=()=>{scroll=THREE.MathUtils.clamp(-host.getBoundingClientRect().top/window.innerHeight,-.5,1);if(visible)request();};
  const lost=(e:Event)=>{e.preventDefault();onError();};
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;if(visible)request();});observer.observe(host);
  host.addEventListener('pointermove',pointer);host.addEventListener('pointerleave',reset);
  renderer.domElement.addEventListener('webglcontextlost',lost);
  document.addEventListener('visibilitychange',request);
  window.addEventListener('scroll',onScroll,{passive:true});
  resize();onScroll();
  const dispose=()=>{if(disposed)return;disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();host.removeEventListener('pointermove',pointer);host.removeEventListener('pointerleave',reset);document.removeEventListener('visibilitychange',request);renderer.domElement.removeEventListener('webglcontextlost',lost);logo.geometry.dispose();dot.geometry.dispose();face.dispose();edge.dispose();dotFace.dispose();dotEdge.dispose();gradient.dispose();dotGradient.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();signal.removeEventListener('abort',dispose);};
  const cleanup=()=>{window.removeEventListener('scroll',onScroll);dispose();};
  signal.addEventListener('abort',cleanup,{once:true});
  return ()=>{signal.removeEventListener('abort',cleanup);cleanup();};
}
