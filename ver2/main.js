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

// earth.rotation.x = Math.PI/7;
// earth.rotation.y = -Math.PI/2;
// clouds.rotation.x = Math.PI/7;
scene.add(earth,clouds);


// TODO: add Fresnel shader for atmosphere
//       add click events

// add light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1.0, 1.0, 1.0);
pointLight.intensity=3;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// city coordinates
const AAL_lon = -5*Math.PI/180;
const AAL_lat = 57*Math.PI/180;
const BCN_lon = 0*Math.PI/180;
const BCN_lat = 41*Math.PI/180;

var bcnDir = new THREE.Vector3(1*Math.cos(BCN_lon)*Math.cos(BCN_lat), 1*Math.cos(BCN_lon)*Math.sin(BCN_lat), 1*Math.sin(BCN_lon));
var aalDir = new THREE.Vector3(1*Math.cos(AAL_lon)*Math.cos(AAL_lat), 1*Math.cos(AAL_lon)*Math.sin(AAL_lat), 1*Math.sin(AAL_lon));

const points = [];
points.push( new THREE.Vector3( bcnDir ) );
points.push( new THREE.Vector3( 4*bcnDir ) );
let geometry = new THREE.BufferGeometry().setFromPoints( points );
let material = new THREE.LineBasicMaterial( { color: 0xffffff } );
let line = new THREE.Line( geometry, material );

scene.add(line);


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

function location_update() {

    var cameracenter = new THREE.Vector3(0,0,-1).unproject(camera);
    var bcn = cameracenter.distanceTo(bcnDir);
    var aal = cameracenter.distanceTo(aalDir);
    // var bcnDirProj = bcnDir.project( camera );
    // var aalDirProj = aalDir.project( camera );
    if ( bcn > aal) {
        longitude = AAL_lon;
        latitude = AAL_lat;
        Title.innerHTML = AalborgTitle.bold()+"<br><br>";
    } else {
        longitude = BCN_lon;
        latitude = BCN_lat;
        Title.innerHTML = BarcelonaTitle.bold() +"<br><br>"+ BarcelonaInfo;
    }

    //update line
    var positions = line.geometry.attributes.position.array;
    positions[0] = 1*Math.cos(longitude)*Math.cos(latitude);
    positions[1] = 1*Math.cos(longitude)*Math.sin(latitude);
    positions[2] = 1*Math.sin(longitude);
    positions[3] = 1.2*Math.cos(longitude)*Math.cos(latitude);
    positions[4] = 1.2*Math.cos(longitude)*Math.sin(latitude);
    positions[5] = 1.2*Math.sin(longitude);
    line.geometry.attributes.position.needsUpdate = true;
    //update text
}

// animation
function animate() {
    line.rotation.y += 0.0007;
    earth.rotation.y += 0.0007;
    clouds.rotation.y += 0.0009;

    bcnDir.applyAxisAngle( new THREE.Vector3(-1,0,0), 0.0007 );
    console.log(bcnDir)

    location_update();

    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);
    camera.updateMatrixWorld()
}

animate();
