import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.z = 8;
camera.position.y = 5;
camera.position.x = -4;

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablaDamping = true;
controls.dempingFactor = 0.05;
controls.screenSpacePanning = true;
controls.minDistance = 2;
controls.maxDistance = 20;

// raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("mousemove", onMouseMove);

// ambientLight
const ambLight = new THREE.AmbientLight({color: "white"}, 1);
scene.add(ambLight);

// ditactionalLight
const dirLight = new THREE.DirectionalLight( { color: "white" }, 10 );
dirLight.position.set(5,50,5);
scene.add(dirLight);

function createLamp( x, y, z ){

    const spoLightFive = new THREE.SpotLight( "white", 100, 50);
    spoLightFive.position.set( x, y, z );
    scene.add(spoLightFive);

    // lamp
    const lampGroup = new THREE.Group();

    const lampGeometry = new THREE.CylinderGeometry( 0.3, 0.8, 1, 32 );
    const lampMaterial = new THREE.MeshStandardMaterial( { color: 0x303030, metalness: 1, roughness: 0.15, envMapIntensity: 1.5 } );
    const lamp = new THREE.Mesh( lampGeometry, lampMaterial );

    lampGroup.add( lamp );

    // bulb
    const bulbGeometry = new THREE.SphereGeometry( 0.5, 32, 32 );
    const bulbMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);

    bulb.position.y = -0.5;
    lampGroup.add( bulb );

    lampGroup.position.set( x, y, z );

    scene.add( lampGroup );

}

createLamp( 0, 7, 0 );

function createLampY( x, y, z ){

    const lights = new THREE.Group();

    const pointLight = new THREE.PointLight("pink", 50);
    pointLight.position.set( -0.55, 0.3, 0 );

    const pointLightTwo = new THREE.PointLight("blue", 50);
    pointLightTwo.position.set( +0.55, 0.3, 0 );

    gsap.to(pointLight.position, {
        y: +0.6,
        duration: 1,
        yoyo: true,
        ease: "power1.inOut",
        repeat: -1
    })

    gsap.to(pointLightTwo.position, {
        y: +0.6,
        duration: 1,
        yoyo: true,
        ease: "power1.inOut",
        repeat: -1,
        delay: 1
    })

    lights.add(pointLight);
    lights.add(pointLightTwo);
    lights.position.set( x, y, z);

    scene.add(lights);
    // lamp
    const lampGroup = new THREE.Group();

    const lampGeometry = new THREE.CylinderGeometry( 0.4, 0.6, 0.2, 32 );
    const lampMaterial = new THREE.MeshStandardMaterial( { color: 0x303030, metalness: 1, roughness: 0.15, envMapIntensity: 1.5 } );
    const lamp = new THREE.Mesh( lampGeometry, lampMaterial );

    lampGroup.add( lamp );

    // bulb
    const bulbGeometry = new THREE.SphereGeometry( 0.3, 32, 32 );
    const bulbMaterial = new THREE.MeshBasicMaterial( { color: "pink"} );
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);

    const bulbMaterialTwo = new THREE.MeshBasicMaterial( { color: "blue"} );
    const bulbTwo = new THREE.Mesh(bulbGeometry, bulbMaterialTwo);

    bulb.position.set( -0.40, -0.5, 0 );
    bulbTwo.position.set( +0.40, -0.5, 0 );

    gsap.to( bulb.position, {
        y: -0.7,
        duration: 1,
        yoyo: true,
        ease: "power1.inOut",
        repeat: -1

    });

    gsap.to( bulbTwo.position, {
        y: -0.7,
        duration: 1,
        yoyo: true,
        ease: "power1.inOut",
        repeat: -1,
        delay: 1

    });
    lampGroup.add( bulb );
    lampGroup.add( bulbTwo );

    lampGroup.position.set( x, y, z );
    lampGroup.rotation.x = Math.PI;

    scene.add( lampGroup );

    function animate(){
        requestAnimationFrame(animate)

        lampGroup.rotation.y += 0.02;
        lights.rotation.y -= 0.02;

    }
    animate()

}

createLampY( 4, 0.10, +4 );
createLampY( 4, 0.10, -4 );
createLampY( -4, 0.10, +4 );
createLampY( -4, 0.10, -4 );

// plane
const planeGeometry = new THREE.PlaneGeometry( 10, 10 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: "#303030", side: THREE.DoubleSide } );
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
scene.add(plane);

const gridHelper = new THREE.GridHelper( 10, 10, 0x000000, 0x000000);

gridHelper.position.y = 0.01;
scene.add(gridHelper);

// figuri box
const originalMaterial = new THREE.MeshStandardMaterial({color: 0xc0c0c0, metalness: 1.0, roughness: 0.15, envMapIntensity: 1.5});
const updateMaterial = new THREE.MeshStandardMaterial({color: "yellow",emissive: "white", emissiveIntensity: 0.05});
const updateMaterial2 = new THREE.MeshStandardMaterial({color: "yellow",emissive: "white", emissiveIntensity: 0});

const boxGeometry = new THREE.BoxGeometry();
const box = new THREE.Mesh(boxGeometry,originalMaterial);
box.position.set( -1.5, +0.5, +1.5 );
scene.add(box)

const boxtwo = new THREE.BoxGeometry();
const box2 = new THREE.Mesh(boxtwo, originalMaterial);
box2.position.set( -0.5, +0.5, +1.5 );
scene.add(box2);

const boxthree = new THREE.BoxGeometry();
const box3 = new THREE.Mesh(boxthree, originalMaterial);
box3.position.set( +0.5, +0.5, +1.5 );
scene.add(box3);

const boxfour = new THREE.BoxGeometry();
const box4 = new THREE.Mesh(boxfour, originalMaterial);
box4.position.set( +1.5, +0.5, +1.5 );
scene.add(box4);

const boxfive = new THREE.BoxGeometry();
const box5 = new THREE.Mesh(boxfive, originalMaterial);
box5.position.set( +1.5, +0.5, +0.5 );
scene.add(box5);

const boxsix = new THREE.BoxGeometry();
const box6 = new THREE.Mesh(boxsix, originalMaterial);
box6.position.set( +1.5, +0.5, -0.5 );
scene.add(box6);

const boxseven = new THREE.BoxGeometry();
const box7 = new THREE.Mesh(boxseven, originalMaterial);
box7.position.set( +1.5, +0.5, -1.5 );
scene.add(box7);

const boxeight = new THREE.BoxGeometry();
const box8 = new THREE.Mesh(boxeight, originalMaterial);
box8.position.set( +0.5, +0.5, -1.5 );
scene.add(box8);

const boxnine = new THREE.BoxGeometry();
const box9 = new THREE.Mesh(boxnine, originalMaterial);
box9.position.set( -0.5, +0.5, -1.5 );
scene.add(box9);

const boxten = new THREE.BoxGeometry();
const box10 = new THREE.Mesh(boxten, originalMaterial);
box10.position.set( -1.5, +0.5, -1.5 );
scene.add(box10);

const boxeleven = new THREE.BoxGeometry();
const box11 = new THREE.Mesh(boxeleven, originalMaterial);
box11.position.set( -1.5, +0.5, -0.5 );
scene.add(box11);

const boxtwelve = new THREE.BoxGeometry();
const box12 = new THREE.Mesh(boxtwelve, originalMaterial);
box12.position.set( -1.5, +0.5, +0.5 );
scene.add(box12);

// main box
const boxfGeometry = new THREE.BoxGeometry();
const boxf = new THREE.Mesh(boxfGeometry,originalMaterial);
boxf.position.set( -1.5, +1.5, +1.5 );
scene.add(boxf)

const boxtwof = new THREE.BoxGeometry();
const box2f = new THREE.Mesh(boxtwof, originalMaterial);
box2f.position.set( -0.5, +1.5, +1.5 );
scene.add(box2f);

const boxthreef = new THREE.BoxGeometry();
const box3f = new THREE.Mesh(boxthreef, originalMaterial);
box3f.position.set( +0.5, +1.5, +1.5 );
scene.add(box3f);

const boxfourf = new THREE.BoxGeometry();
const box4f = new THREE.Mesh(boxfourf, originalMaterial);
box4f.position.set( +1.5, +1.5, +1.5 );
scene.add(box4f);

const boxfivef = new THREE.BoxGeometry();
const box5f = new THREE.Mesh(boxfivef, originalMaterial);
box5f.position.set( +1.5, +1.5, +0.5 );
scene.add(box5f);

const boxsixf = new THREE.BoxGeometry();
const box6f = new THREE.Mesh(boxsixf, originalMaterial);
box6f.position.set( +1.5, +1.5, -0.5 );
scene.add(box6f);

const boxsevenf = new THREE.BoxGeometry();
const box7f = new THREE.Mesh(boxsevenf, originalMaterial);
box7f.position.set( +1.5, +1.5, -1.5 );
scene.add(box7f);

const boxeightf = new THREE.BoxGeometry();
const box8f = new THREE.Mesh(boxeightf, originalMaterial);
box8f.position.set( +0.5, +1.5, -1.5 );
scene.add(box8f);

const boxninef = new THREE.BoxGeometry();
const box9f = new THREE.Mesh(boxninef, originalMaterial);
box9f.position.set( -0.5, +1.5, -1.5 );
scene.add(box9f);

const boxtenf = new THREE.BoxGeometry();
const box10f = new THREE.Mesh(boxtenf, originalMaterial);
box10f.position.set( -1.5, +1.5, -1.5 );
scene.add(box10f);

const boxelevenf = new THREE.BoxGeometry();
const box11f = new THREE.Mesh(boxelevenf, originalMaterial);
box11f.position.set( -1.5, +1.5, -0.5 );
scene.add(box11f);

const boxtwelvef = new THREE.BoxGeometry();
const box12f = new THREE.Mesh(boxtwelvef, originalMaterial);
box12f.position.set( -1.5, +1.5, +0.5 );
scene.add(box12f);

// header box
const boxGeometryh = new THREE.BoxGeometry();
const boxh = new THREE.Mesh(boxGeometryh,originalMaterial);
boxh.position.set( -1.5, +2.5, +1.5 );
scene.add(boxh)

const boxtwoh = new THREE.BoxGeometry();
const box2h = new THREE.Mesh(boxtwoh, originalMaterial);
box2h.position.set( -0.5, +2.5, +1.5 );
scene.add(box2h);

const boxthreeh = new THREE.BoxGeometry();
const box3h = new THREE.Mesh(boxthreeh, originalMaterial);
box3h.position.set( +0.5, +2.5, +1.5 );
scene.add(box3h);

const boxfourh = new THREE.BoxGeometry();
const box4h = new THREE.Mesh(boxfourh, originalMaterial);
box4h.position.set( +1.5, +2.5, +1.5 );
scene.add(box4h);

const boxfiveh = new THREE.BoxGeometry();
const box5h = new THREE.Mesh(boxfiveh, originalMaterial);
box5h.position.set( +1.5, +2.5, +0.5 );
scene.add(box5h);

const boxsixh = new THREE.BoxGeometry();
const box6h = new THREE.Mesh(boxsixh, originalMaterial);
box6h.position.set( +1.5, +2.5, -0.5 );
scene.add(box6h);

const boxsevenh = new THREE.BoxGeometry();
const box7h = new THREE.Mesh(boxsevenh, originalMaterial);
box7h.position.set( +1.5, +2.5, -1.5 );
scene.add(box7h);

const boxeighth = new THREE.BoxGeometry();
const box8h = new THREE.Mesh(boxeighth, originalMaterial);
box8h.position.set( +0.5, +2.5, -1.5 );
scene.add(box8h);

const boxnineh = new THREE.BoxGeometry();
const box9h = new THREE.Mesh(boxnineh, originalMaterial);
box9h.position.set( -0.5, +2.5, -1.5 );
scene.add(box9h);

const boxtenh = new THREE.BoxGeometry();
const box10h = new THREE.Mesh(boxtenh, originalMaterial);
box10h.position.set( -1.5, +2.5, -1.5 );
scene.add(box10h);

const boxelevenh = new THREE.BoxGeometry();
const box11h = new THREE.Mesh(boxelevenh, originalMaterial);
box11h.position.set( -1.5, +2.5, -0.5 );
scene.add(box11h);

const boxtwelveh = new THREE.BoxGeometry();
const box12h = new THREE.Mesh(boxtwelveh, originalMaterial);
box12h.position.set( -1.5, +2.5, +0.5 );
scene.add(box12h);

const boxthirteenh = new THREE.BoxGeometry();
const box13h = new THREE.Mesh(boxthirteenh, originalMaterial);
box13h.position.set( -0.5, +2.5, +0.5 );
scene.add(box13h);

const boxfourteenh = new THREE.BoxGeometry();
const box14h = new THREE.Mesh(boxfourteenh, originalMaterial);
box14h.position.set( +0.5, +2.5, +0.5 );
scene.add(box14h);

const boxfifteenh = new THREE.BoxGeometry();
const box15h = new THREE.Mesh(boxfifteenh, originalMaterial);
box15h.position.set( +0.5, +2.5, -0.5 );
scene.add(box15h);

const boxsixteenh = new THREE.BoxGeometry();
const box16h = new THREE.Mesh(boxsixteenh, originalMaterial);
box16h.position.set( -0.5, +2.5, -0.5 );
scene.add(box16h);

const isHover = false;

// always on animate
function animate(){
    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject( box );

    if( intersects.length > 0 ){
        if( intersects[0].object === box ){
            box.position.set( -1.9, +0.5, +1.9 );
            box2.position.set( -0.8, +0.5, +1.8 );
            box3.position.set( +0.3, +0.5, +1.7 );
            box4.position.set( +1.4, +0.5, +1.6 );
            box10.position.set( -1.6, +0.5, -1.4 );
            box11.position.set( -1.7, +0.5, -0.3 );
            box12.position.set( -1.8, +0.5, +0.8 );
            boxf.position.set( -1.8, +1.5, +1.8 );
            box2f.position.set( -0.7, +1.5, +1.7 );
            box3f.position.set( +0.4, +1.5, +1.6 );
            box11f.position.set( -1.6, +1.5, -0.4 );
            box12f.position.set( -1.7, +1.5, +0.7 );
            boxh.position.set( -1.7, +2.5, +1.7 );
            box2h.position.set( -0.6, +2.5, +1.6 );
            box12h.position.set( -1.6, +2.5, +0.6 );

        }
    }
    else{
        box.position.set( -1.5, +0.5, +1.5 );
        box2.position.set( -0.5, +0.5, +1.5 );
        boxf.position.set( -1.5, +1.5, +1.5 );
        box12.position.set( -1.5, +0.5, +0.5 );
        box11.position.set( -1.5, +0.5, -0.5 );
        box3.position.set( +0.5, +0.5, +1.5 );
        boxh.position.set( -1.5, +2.5, +1.5 );
        box2f.position.set( -0.5, +1.5, +1.5 );
        box12f.position.set( -1.5, +1.5, +0.5 );
        box4.position.set( +1.5, +0.5, +1.5 );
        box10.position.set( -1.5, +0.5, -1.5 );
        box3f.position.set( +0.5, +1.5, +1.5 );
        box11f.position.set( -1.5, +1.5, -0.5 );
        box2h.position.set( -0.5, +2.5, +1.5 );
        box12h.position.set( -1.5, +2.5, +0.5 );
        box4f.position.set( +1.5, +1.5, +1.5 );
    }


    controls.update();
    renderer.render(scene,camera);

}

animate()
