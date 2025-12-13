import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.z = 7;
camera.position.y = 6;
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

// figuri box
const originalMaterial = new THREE.MeshStandardMaterial({color: 0xc0c0c0, metalness: 1.0, roughness: 0.15, envMapIntensity: 1.5});
const updateMaterial = new THREE.MeshStandardMaterial({color: "yellow",emissive: "white", emissiveIntensity: 0.05});
const updateMaterial2 = new THREE.MeshStandardMaterial({color: "yellow",emissive: "white", emissiveIntensity: 0});

const boxGeometry = new THREE.BoxGeometry();
const box = new THREE.Mesh( boxGeometry, originalMaterial );
box.position.set( -1, +1.5, +1 );
scene.add(box)

const boxtwo = new THREE.BoxGeometry();
const box2 = new THREE.Mesh( boxtwo, originalMaterial );
box2.position.set( 0, +1.5, +1 );
scene.add(box2);

const boxthree = new THREE.BoxGeometry();
const box3 = new THREE.Mesh( boxthree, originalMaterial );
box3.position.set( +1, +1.5, +1 );
scene.add(box3);

const boxfour = new THREE.BoxGeometry();
const box4 = new THREE.Mesh( boxfour, originalMaterial );
box4.position.set( +1, +1.5, 0 );
scene.add( box4 )

const boxfive = new THREE.BoxGeometry();
const box5 = new THREE.Mesh( boxfive, originalMaterial );
box5.position.set( +1, +1.5, -1 );
scene.add( box5 )

const boxsix = new THREE.BoxGeometry();
const box6 = new THREE.Mesh( boxsix, originalMaterial );
box6.position.set( 0, +1.5, -1 );
scene.add( box6 )

const boxseven = new THREE.BoxGeometry();
const box7 = new THREE.Mesh( boxseven, originalMaterial );
box7.position.set( -1, +1.5, -1 );
scene.add(box7);

const boxeight = new THREE.BoxGeometry();
const box8 = new THREE.Mesh( boxeight, originalMaterial );
box8.position.set( -1, +1.5, 0 ); //
scene.add(box8);

const boxnine = new THREE.BoxGeometry();
const box9 = new THREE.Mesh( boxnine, originalMaterial );
box9.position.set( 0, +1.5, 0 );
scene.add(box9);

// main box
const boxfGeometry = new THREE.BoxGeometry();
const boxf = new THREE.Mesh( boxfGeometry, originalMaterial );
boxf.position.set( -1, +2.5, +1 );
scene.add(boxf)

const boxtwof = new THREE.BoxGeometry();
const box2f = new THREE.Mesh( boxtwof, originalMaterial) ;
box2f.position.set( 0, +2.5, +1 );
scene.add(box2f);

const boxthreef = new THREE.BoxGeometry();
const box3f = new THREE.Mesh( boxthreef, originalMaterial );
box3f.position.set( +1, +2.5, +1 );
scene.add(box3f);

const boxfourf = new THREE.BoxGeometry();
const box4f = new THREE.Mesh( boxfourf, originalMaterial );
box4f.position.set( +1, +2.5, 0 );
scene.add(box4f);

const boxfivef = new THREE.BoxGeometry();
const box5f = new THREE.Mesh( boxfivef, originalMaterial );
box5f.position.set( +1, +2.5, -1 );
scene.add(box5f);

const boxsixf = new THREE.BoxGeometry();
const box6f = new THREE.Mesh( boxsixf, originalMaterial );
box6f.position.set( 0, +2.5, -1 );
scene.add(box6f);

const boxsevenf = new THREE.BoxGeometry();
const box7f = new THREE.Mesh(boxsevenf, originalMaterial);
box7f.position.set( -1, +2.5, -1 );
scene.add(box7f);

const boxeightf = new THREE.BoxGeometry();
const box8f = new THREE.Mesh(boxeightf, originalMaterial);
box8f.position.set( -1, +2.5, 0 );
scene.add(box8f);

// header box
const boxGeometryh = new THREE.BoxGeometry();
const boxh = new THREE.Mesh(boxGeometryh,originalMaterial);
boxh.position.set( -1, +3.5, +1 );
scene.add(boxh)

const boxtwoh = new THREE.BoxGeometry();
const box2h = new THREE.Mesh(boxtwoh, originalMaterial);
box2h.position.set( 0, +3.5, +1 );
scene.add(box2h);

const boxthreeh = new THREE.BoxGeometry();
const box3h = new THREE.Mesh(boxthreeh, originalMaterial);
box3h.position.set( +1, +3.5, +1 );
scene.add(box3h);

const boxfourh = new THREE.BoxGeometry();
const box4h = new THREE.Mesh(boxfourh, originalMaterial);
box4h.position.set( +1, +3.5, -1 );
scene.add(box4h);

const boxfiveh = new THREE.BoxGeometry();
const box5h = new THREE.Mesh( boxfiveh, originalMaterial );
box5h.position.set( +1, +3.5, 0 );
scene.add(box5h);

const boxsixh = new THREE.BoxGeometry();
const box6h = new THREE.Mesh( boxsixh, originalMaterial );
box6h.position.set( 0, +3.5, 0 );
scene.add(box6h);

const boxsevenh = new THREE.BoxGeometry();
const box7h = new THREE.Mesh( boxsevenh, originalMaterial );
box7h.position.set( -1, +3.5, 0 );
scene.add(box7h);

const boxeighth = new THREE.BoxGeometry();
const box8h = new THREE.Mesh( boxeighth, originalMaterial );
box8h.position.set( -1, +3.5, -1 );
scene.add(box8h);

const boxnineh = new THREE.BoxGeometry();
const box9h = new THREE.Mesh( boxnineh, originalMaterial );
box9h.position.set( 0, +3.5, -1 );
scene.add(box9h);

let lock = false;

function startAnim(){
    if(lock) return;
    lock = true;
    animationBoxes();
    setTimeout(() => lock = false, 6000);
}

window.addEventListener("keydown", e => {
    if( e.code === "Space"){
        startAnim();
    }
});

window.addEventListener("touchstart", startAnim);

function animationBoxes(){
    function animationOne(){
        if (animationOne){
            gsap.to(box.position, {
                y: 4.5,
                duration: 0.2,
                ease: "power1.in",
                delay: 1,
            })
            gsap.to(box2h.position, {
                y: 4.5,
                duration: 0.2,
                ease: "power1.in",
            })
            gsap.to(boxh.position, {
                x: 0,
                duration: 0.2,
                ease: "power1.in",
                delay: 0.5
            })
            gsap.to(boxf.position, {
                x: -2,
                duration: 0.2,
                ease: "power1.in",
            })
            gsap.to(box2f.position, {
                z: 0,
                duration: 0.2,
                ease: "power1.in",
                delay: 0.5
            })
            gsap.to(box2.position, {
                y: 2.5,
                duration: 0.2,
                ease: "power1.in",
                delay: 1
            })
            gsap.to(box3.position, {
                x: -1,
                duration: 0.2,
                ease: "power2.in",
                delay: 1.5
            })
            gsap.to(box3f.position, {
                y: 1.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 2
            })
            gsap.to(box8f.position, {
                z: 1,
                duration: 0.2,
                ease: "power2.in", //
                delay: 2
            })
            gsap.to(box8.position, {
                y: +0.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 1
            })
            gsap.to(box7.position, {
                z: 1,
                duration: 0.2,
                ease: "power2.in",
                delay: 1
            })
            gsap.to(box7.position, {
                x: -2,
                duration: 0.2,
                ease: "power2.in",
                delay: 1.5
            })
            gsap.to(box2.position, {
                y: 1.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 2
            })
            gsap.to(box3h.position, {
                y: 2.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 2.5
            })
            gsap.to(boxf.position, {
                y: 3.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 2.5
            })
            gsap.to(boxh.position, {
                x: 1,
                duration: 0.2,
                ease: "power2.in",
                delay: 3
            })
            gsap.to(box3.position, {
                z: 0,
                duration: 0.2,
                ease: "power2.in",
                delay: 3
            })
            gsap.to(box7.position, {
                x: -1,
                duration: 0.2,
                ease: "power2.in",
                delay: 3.5
            })
            gsap.to(box3.position, {
                y: 2.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 3.5
            })
            gsap.to(box8.position, {
                y: 1.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 3.5
            })
            gsap.to(box7.position, {
                z: 0,
                duration: 0.2,
                ease: "power2.in",
                delay: 4
            })
            gsap.to(box8.position, {
                z: -1,
                duration: 0.2,
                ease: "power2.in",
                delay: 4
            })
            gsap.to(box2h.position, {
                y: 3.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 4
            })
            gsap.to(box2f.position, {
                z: 1,
                duration: 0.2,
                ease: "power2.in",
                delay: 4
            })
            gsap.to(boxf.position, {
                x: -1,
                duration: 0.2,
                ease: "power2.in",
                delay: 4.5
            })
            gsap.to(boxf.position, {
                y: 2.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 5
            })
            gsap.to(box.position, {
                y: 3.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 5
            })
            gsap.to(box8f.position, {
                y: 1.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 5,
            })
            gsap.to(box8f.position, {
                y: 1.5,
                duration: 0.2,
                ease: "power2.in",
                delay: 5.5,
            })
            gsap.to(box8h.position, {
                y: 4,
                x: -1.5,
                duration: 0.2,
                ease: "power2.in", //
            })
            gsap.to(box9h.position, {
                y: 4,
                duration: 0.2,
                ease: "power2.in",
            })
            gsap.to(box4h.position, {
                y: 4,
                x: 1.5, 
                duration: 0.2,
                ease: "power2.in",
            })
            gsap.to(box7f.position, {
                x: -1.5,
                duration: 0.2,
                ease: "power2.in",
            })
            gsap.to(box5f.position, {
                x: 1.5,
                duration: 0.2,
                ease: "power2.in",
            })
            gsap.to(box5.position, {
                x: 1.5,
                y: 1,
                duration: 0.2,
                ease: "power2.in",
            })
            gsap.to(box6.position, {
                y: 1,
                duration: 0.2,
                ease: "power2.in",
            })
            gsap.to(box6f.rotation, {
                y: 1.57,
                x: 1.57 ,
                duration: 1,
                ease: "power1.inOut",
                repeat: 4
            })
            gsap.to(box8h.rotation, {
                y: -1.57,
                duration: 0.5,
                ease: "power1.in",
                delay: 0.5
            })
            gsap.to(box9h.rotation, {
                y: -1.57,
                duration: 0.5,
                ease: "power1.in",
                delay: 0.7
            })
            gsap.to(box4h.rotation, { 
                y: -1.57,
                duration: 0.5,
                ease: "power1.in",
                delay: 0.9
            })
            gsap.to(box8h.rotation, {
                x: -1.57 ,
                duration: 0.5,
                ease: "power1.in",
                delay: 1.2
            })
            gsap.to(box7f.rotation, {
                x: -1.57,
                duration: 0.5,
                ease: "power1.in",
                delay: 1.4,
                repeat: 4
            })
            gsap.to(box5.rotation, {
                x: 1.57,
                duration: 0.5,
                ease: "power1.in",
                delay: 1
            })
            gsap.to(box5f.rotation, {
                x: 1.57,
                duration: 0.5,
                ease: "power1.in",
                delay: 1.2,
            })
            gsap.to(box4h.rotation, {
                x: 1.57,
                duration: 0.5,
                ease: "power1.in",
                delay: 1.4,
                repeat: 2
            })
            gsap.to(box5f.rotation, {
                x: -1.57,
                duration: 1,
                ease: "power1.inOut",
                delay: 1.8,
                repeat: 2
            })
            gsap.to(box5.rotation, {
                x: -1.57,
                duration: 1,
                ease: "power1.inOut",
                delay: 2,
                repeat: 2
            })
            gsap.to(box9h.rotation, {
                x: -1.57,
                duration: 0.5,
                ease: "power1.in",
                delay: 5
            })
            gsap.to(box9h.position, {
                y: 3.5,
                duration: 0.5,
                ease: "power1.in",
                delay: 5
            })
            gsap.to(box8h.rotation, {
                x: 1.57,
                y: 1.57,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5
            })
            gsap.to(box8h.position, {
                y: 3.5,
                x: -1,
                duration: 0.5,
                ease: "power1.in",
                delay: 5
            })
            gsap.to(box4h.rotation, { 
                y: 1.57,
                x: 1.57,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5  
            })
            gsap.to(box4h.position, { 
                y: 3.5,
                x: 1, 
                duration: 0.5,
                ease: "power1.in",
                delay: 5 
            })
            gsap.to(box5f.rotation, {
                z : 1.57 ,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box5f.position , {
                x: 1,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box5.rotation, {
                z: 1.57,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box5.position, {
                x: 1,
                y: 1.5,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box5.rotation, {
                x: 1.57,
                y: 1.57,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box5.position, {
                x: 1,
                y: 1.5,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box6 .rotation, {
                x:  1.57,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box6.position, {
                y: 1.5,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box7f.rotation, {
                z: -1.57,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5
            })
            gsap.to(box7f.position, {
                y: 2.5,
                x: -1,
                duration: 0.5,
                ease: "power1.inOut",
                delay: 5,
            })
            gsap.to(box7f.position, {
                onComplite: animationTwo,
                delay: 0.5
            })

        }
        function animationTwo(){
        gsap.to(box.position, { x: -1, y: 1.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box2.position, { x: 0, y: 1.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box3.position, { x: 1, y: 1.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box4.position, { x: 1, y: 1.5, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box5.position, { x: 1, y: 1.5, z: -1, duration: 0.5, delay: 5.5 });
        gsap.to(box6.position, { x: 0, y: 1.5, z: -1, duration: 0.5, delay: 5.5 });
        gsap.to(box7.position, { x: -1, y: 1.5, z: -1, duration: 0.5, delay: 5.5 });
        gsap.to(box8.position, { x: -1, y: 1.5, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box9.position, { x: 0, y: 1.5, z: 0, duration: 0.5, delay: 5.5 });
        
        // Middle layer
        gsap.to(boxf.position, { x: -1, y: 2.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box2f.position, { x: 0, y: 2.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box3f.position, { x: 1, y: 2.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box4f.position, { x: 1, y: 2.5, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box5f.position, { x: 1, y: 2.5, z: -1, duration: 0.5, delay: 5.5 });
        gsap.to(box6f.position, { x: 0, y: 2.5, z: -1, duration: 0.5, delay: 5.5 });
        gsap.to(box7f.position, { x: -1, y: 2.5, z: -1, duration: 0.5, delay: 5.5 });
        gsap.to(box8f.position, { x: -1, y: 2.5, z: 0, duration: 0.5, delay: 5.5 });
        
        // Top layer
        gsap.to(boxh.position, { x: -1, y: 3.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box2h.position, { x: 0, y: 3.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box3h.position, { x: 1, y: 3.5, z: 1, duration: 0.5, delay: 5.5 });
        gsap.to(box4h.position, { x: 1, y: 3.5, z: -1, duration: 0.5, delay: 5.5 });
        gsap.to(box5h.position, { x: 1, y: 3.5, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box6h.position, { x: 0, y: 3.5, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box7h.position, { x: -1, y: 3.5, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box8h.position, { x: -1, y: 3.5, z: -1, duration: 0.5, delay: 5.5 });
        gsap.to(box9h.position, { x: 0, y: 3.5, z: -1, duration: 0.5, delay: 5.5 });
        
        // Rotationlarni ham qaytarish
        gsap.to(box5.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box5f.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box6.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box6f.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box7f.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box4h.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box8h.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay: 5.5 });
        gsap.to(box9h.rotation, { x: 0, y: 0, z: 0, duration: 0.5, delay: 5.5 });

        }

    }    animationOne()
}

// always on animate
function animate(){
    requestAnimationFrame(animate);

    controls.autoRotate = false;
    controls.autoRotateSpeed = -2.0;
    controls.update();
    renderer.render(scene,camera);

}

animate()
