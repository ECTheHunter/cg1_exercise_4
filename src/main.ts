// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// local from us provided utilities
import * as utils from './lib/utils';
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';
import ImageWidget from './imageWidget';
import uvFragmentShader from './shaders/uv.f.glsl?raw';
import uvVertexShader from './shaders/uv.v.glsl?raw';
import sphereFragmentShader from './shaders/sphere.f.glsl?raw';
import sphereVertexShader from './shaders/sphere.v.glsl?raw';
import fixedsphereFragmentShader from './shaders/fixedsphere.f.glsl?raw';
import fixedsphereVertexShader from './shaders/fixedsphere.v.glsl?raw';
import environementFragmentShader from './shaders/environment.f.glsl?raw';
import environmentVertexShader from './shaders/environment.v.glsl?raw';
import normalFragmentShader from './shaders/normal.f.glsl?raw';
import normalVertexShader from './shaders/normal.v.glsl?raw';


function createQuadGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  // Define the vertices of the quad
  const vertices = new Float32Array([
    -1, -1, 0,  
    1, -1, 0,   
    -1, 1, 0,   
    1, -1, 0,   
    1, 1, 0,    
    -1, 1, 0    
  ]);

  const uvs = new Float32Array([
    0, 0,  
    1, 0,  
    0, 1,  

    1, 0,  
    1, 1,  
    0, 1  
  ]);

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  return geometry;
}
function getTexturePath(texture: helper.Textures): string {

  return `./src/textures/${texture}.jpg`;
}
function getMapPath(map: helper.NormalMaps | boolean): string {
  if (typeof map === 'boolean') {

    return '';
  } else {
    return `./src/textures/${map}_normals.jpg`;
  }
}
function main(){
  let root = Application("Texturing");
  root.setLayout([["texture", "renderer"]]);
  root.setLayoutColumns(["50%", "50%"]);
  root.setLayoutRows(["100%"]);
  let loader = new THREE.TextureLoader();
  
  let currenttexture = loader.load('./src/textures/earth.jpg');
  let currentmap = loader.load('./src/textures/uniform_normals.jpg');
  // ---------------------------------------------------------------------------
  // create Settings and create GUI settings
  let settings = new helper.Settings();
  let gui = helper.createGUI(settings);
  gui.show();
  // adds the callback that gets called on settings change
  settings.addCallback(callback);
  
  // ---------------------------------------------------------------------------
  let textureDiv = createWindow("texture");
  let ImgWid = new ImageWidget(textureDiv);
  root.appendChild(textureDiv);
  const customMaterial = new THREE.RawShaderMaterial({
    vertexShader: uvVertexShader,
    fragmentShader: uvFragmentShader,
    uniforms: {
      mytexture: { value: currenttexture },
      drawingtexture: { value: createDrawingTexture()},
      normalMap: { value: currentmap}
    },
  });

  // the image widget. Change the image with setImage
  // you can enable drawing with enableDrawing
  // and it triggers the event "updated" while drawing
  
  ImgWid.setImage("./src/textures/earth.jpg")
  function callback(changed: utils.KeyValuePair<helper.Settings>) {
    switch (changed.key) {
      case "geometry":
        scene.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
              scene.remove(child);
          }
      });
        switch (changed.value){
          case "Box":
            const boxGeometry = helper.createBox();
            
            const boxMesh = new THREE.Mesh(boxGeometry, customMaterial);
            scene.add(boxMesh);
          break;
          case "Sphere":
            const sphereGeometry = helper.createSphere();
            const sphereMesh = new THREE.Mesh(sphereGeometry, customMaterial);
            scene.add(sphereMesh);
          break;
          case "Knot":
            const knotGeometry = helper.createKnot();
            const knotMesh = new THREE.Mesh(knotGeometry, customMaterial);
            scene.add(knotMesh);
          break;
          case "Quad":
            const quadGeometry = createQuadGeometry();
            const quadMesh = new THREE.Mesh(quadGeometry, customMaterial);
            scene.add(quadMesh);
            break;
            case "Bunny":
              const bunnyGeometry = helper.createBunny();
              const bunnyMesh = new THREE.Mesh(bunnyGeometry, customMaterial);
              scene.add(bunnyMesh);
              break;
        }
     
        break;
      case "texture":
        const selectedTexturePath = getTexturePath(changed.value);

        currenttexture = loader.load(selectedTexturePath, (loadedTexture) => {
          customMaterial.uniforms.mytexture.value = currenttexture;
          console.log('Texture loaded successfully:', loadedTexture);
          customMaterial.uniforms.mytexture.value.needsUpdate=true;
      });
        ImgWid.setImage(selectedTexturePath);
        
        currenttexture.mapping = THREE.EquirectangularReflectionMapping;
        if(settings.environment){
           
            scene.background = currenttexture;
        };
 
   
        break;
      case "shader":
        switch(changed.value){
          case "UV attribute":
            customMaterial.vertexShader = uvVertexShader;
            customMaterial.fragmentShader = uvFragmentShader;
            customMaterial.needsUpdate=true;
            customMaterial.uniforms.mytexture.value.needsUpdate=true;
            break;
            case "Spherical":
            customMaterial.vertexShader = sphereVertexShader;
            customMaterial.fragmentShader = sphereFragmentShader;
            customMaterial.needsUpdate=true;
            customMaterial.uniforms.mytexture.value.needsUpdate=true;
            break;
            case "Spherical (fixed)":
            customMaterial.vertexShader = fixedsphereVertexShader;
            customMaterial.fragmentShader = fixedsphereFragmentShader;
            customMaterial.needsUpdate=true;
            customMaterial.uniforms.mytexture.value.needsUpdate=true;
            break;
            case "Environment Mapping":
        
              customMaterial.vertexShader = environmentVertexShader;
              customMaterial.fragmentShader = environementFragmentShader;
              customMaterial.needsUpdate=true; 
              customMaterial.uniforms.mytexture.value.needsUpdate=true;
              break; 
              case "Normal Map":
        
              customMaterial.vertexShader = normalVertexShader;
              customMaterial.fragmentShader = normalFragmentShader;
              customMaterial.needsUpdate=true;  
              customMaterial.uniforms.mytexture.value.needsUpdate=true;
              customMaterial.uniforms.normalMap.value.needsUpdate=true;
              break;
        }
        break;
      case "environment":
        if (changed.value) {

          scene.background = currenttexture;
          currenttexture.mapping = THREE.EquirectangularReflectionMapping;
      } else {

          scene.background = new THREE.Color(0x000000);
        break;
      }
      case "normalmap":
        const selectedmapPath = getMapPath(changed.value);
      
        loader.load(selectedmapPath, (loadedmap) => {
          console.log('Normal Map loaded successfully:', loadedmap);
          customMaterial.uniforms.normalMap.value = loadedmap;
          customMaterial.uniforms.normalMap.value.needsUpdate = true;
        });
        break;
      default:
        break;
    }
  }
  ImgWid.DrawingCanvas.addEventListener("updated", () => {
    // Update the drawing texture uniform when the drawing is updated
    customMaterial.uniforms.drawingtexture.value = createDrawingTexture();
});

// ...

function createDrawingTexture(): THREE.Texture {
    // Convert the drawing canvas to a texture using CanvasTexture
    const drawingTexture = new THREE.CanvasTexture(ImgWid.getDrawingCanvas());
    drawingTexture.needsUpdate = true; // Ensure the texture is updated

    return drawingTexture;
}
  settings.pen = ()=>ImgWid.clearDrawing();
  ImgWid.DrawingCanvas.addEventListener("mouseenter", () => ImgWid.enableDrawing());
  ImgWid.DrawingCanvas.addEventListener("mouseleave", () => ImgWid.disableDrawing());

  // ---------------------------------------------------------------------------
  // create RenderDiv
	let rendererDiv = createWindow("renderer");
  root.appendChild(rendererDiv);

  // create renderer
  let renderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });

  // create scene
  let scene = new THREE.Scene();

  // create camera
  let camera = new THREE.PerspectiveCamera();
  helper.setupCamera(camera, scene);
  //scene.background = new THREE.Color(0x1fffff);
  // create controls
  let controls = new OrbitControls(camera, rendererDiv);
  helper.setupControls(controls);
  const quadGeometry = createQuadGeometry();
            const quadMesh = new THREE.Mesh(quadGeometry, customMaterial);
            scene.add(quadMesh);
  let wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
  wid.animate();
}


// call main entrypoint
main();
