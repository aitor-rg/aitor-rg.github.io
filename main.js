// scene instance
const scene = new THREE.Scene();

// create canvas and provide html id
const canvas = document.querySelector('#bg')
// canvas.style.zIndex = -10;

// create renderer and pass canvas, alpha=background transparency
const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
// set the renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// camera instance (fov, aspect ratio, view fustrum min, view fustrum max)
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// set the camera
camera.position.setZ(0.0015*canvas.width);

// orbit controls instance
const control = new THREE.OrbitControls(camera,renderer.domElement);
// set controls
control.enableDamping = true;
control.dampingFactor = 0.3;

renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// add object - EARTH
// load texture maps
const textureLoader = new THREE.TextureLoader()
const earthTexture = textureLoader.load('texture.jpg');
// Mesh( geometry, material )
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({map: earthTexture}),
);

const cloudMap = textureLoader.load('cloudMap.jpg');
// Mesh( geometry, material )
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.01,32,32),
    new THREE.MeshLambertMaterial({alphaMap:cloudMap,map:cloudMap,transparent:true,blending:1}),
);

earth.rotation.x = Math.PI/7;
earth.rotation.y = -Math.PI/2;
clouds.rotation.x = Math.PI/7;
scene.add(earth,clouds);

// TODO: add Fresnel shader for atmosphere
//       add click events

// add light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-1.0, 1.0, 1.0);
pointLight.intensity=3;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// var earthDir = new THREE.Vector3( );
// function showText() {
//     earth.getWorldDirection(earthDir);
//     console.log(earthDir.z);
// }

const BarcelonaTitle = "Barcelona, Spain";
const BarcelonaInfo = "Barcelona is the place where I grew up. I graduated with a B.Sc. degree from <b>Barcelona School of Industrial Engineering</b>, while teaching Linear Algebra and Differential Equations to large groups of bachelor students. I also spent some time at the <b>Institute of Robotics and Industrial Informatics</b>, an accomplished research institution from the Spanish National Research Council (CSIC),  before I embarked myself on an international journey.";
const AalborgTitle = "Aalborg, Denmark";

var Title = document.createElement('div');
Title.style.position = 'absolute';
Title.style.width = 500 + 'px';
Title.style.backgroundColor = "transparent";
Title.style.top = 500 + 'px';
Title.style.left = 0.6*canvas.width + 'px';
Title.style.textAlign = "justify";
Title.innerHTML = BarcelonaTitle.bold() +"<br><br>"+ BarcelonaInfo;
document.body.appendChild(Title);

function getEuler() {
    // make sure the matrix world is up to date
    obj.updateMatrixWorld();

    // extract the rotation matrix
    const rotMat = new THREE.Matrix4();
    obj.matrixWorld.extractRotation(rotMat);

    // extract the rotation
    const euler = new THREE.Euler();
    euler.setFromRotationMatrix(rotMat);

    Title.innerHTML = AalborgTitle.bold()+"<br><br>"+ BarcelonaInfo;
    if (euler.z < 0.5) {
        // Title.innerHTML = AalborgTitle.bold()+"<br><br>"+ BarcelonaInfo;
        Title.innerHTML = euler.z;
    }
}

// animation
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.0007;
    clouds.rotation.y += 0.0009;

    // showText();

    control.update();
    renderer.render(scene, camera);
    // Title.innerHTML = euler.z;
    // getEuler();

}

animate();
Title.innerHTML = AalborgTitle.bold()+"<br><br>";
