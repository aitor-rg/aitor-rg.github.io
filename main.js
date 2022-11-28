const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector('#bg')
const renderer = new THREE.WebGLRenderer({canvas, alpha: true});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

const earthtexture = new THREE.TextureLoader().load('texture.jpg');
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(8, 64, 32),
    new THREE.MeshStandardMaterial({map: earthtexture}),
);
scene.add(earth);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 50);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.x += 0.01;
  earth.rotation.y += 0.005;
  earth.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
