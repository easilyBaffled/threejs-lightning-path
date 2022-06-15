import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
var renderer, scene, camera, controls;
var geometry, material, mesh;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({
    alpha: 1,
    antialias: true,
    clearColor: 0xffffff,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(100, 100, 100);

  controls = new OrbitControls(camera, renderer.domElement);

  scene = new THREE.Scene();

  // Shape
  var radius = 10;
  var material = new THREE.MeshNormalMaterial();

  const pt1 = new THREE.Vector3(40, 50, 0);
  const pt2 = new THREE.Vector3(-40, 0, 0);
  const pt3 = new THREE.Vector3(30, -20, 0);

  let p = pt3.clone().sub(pt1);
  let a1 = Math.atan2(p.y, p.x) + Math.PI / 2;

  p = pt2.clone().sub(pt1);
  let a2 = Math.atan2(p.y, p.x) - Math.PI / 2;

  p = pt1.clone().sub(pt2);
  let a3 = Math.atan2(p.y, p.x) + Math.PI / 2;

  p = pt3.clone().sub(pt2);
  let a4 = Math.atan2(p.y, p.x) - Math.PI / 2;

  const path = new THREE.Path(); // <============================= changed

  path.absarc(pt1.x, pt1.y, radius, a1, a2, false);

  path.absarc(pt2.x, pt2.y, radius, a3, a4, false);

  path.absarc(pt3.x, pt3.y, radius, a4, a1, false);

  var points = path.getSpacedPoints(100);

  var shape = new THREE.Shape(points);

  var geometry = new THREE.ExtrudeGeometry(shape, {
    amount: 10,
    bevelEnabled: false,
  });

  var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  //controls.update(); // <===================================== not required
  renderer.render(scene, camera);
}
