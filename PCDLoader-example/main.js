var renderer, camera, scene, camX, camY, camZ;
import * as THREE from './three.module.js';
import { PCDLoader } from "./PCDLoader.js";
import * as dat from './dat.gui.module.js';
main();
function main()
{
    // set the scene size
    var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

    // gui and controls
    var controls = new function()
    {
        this.cameraX = 0;
        this.cameraY = 0;
        this.cameraZ = 300;
    } 
    var gui = new dat.GUI();
    gui.add(controls, 'cameraX', -100, 100);
    gui.add(controls, 'cameraY', -100, 100);
    gui.add(controls, 'cameraZ', -100, 300);

    // set some camera attributes
    var VIEW_ANGLE = 75,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 1000;
    
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene = new THREE.Scene();

    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    
    var particles = new THREE.Geometry();
    var particleNumb = 200;
    for(let i = 0; i < particleNumb; i++)
    {
        var x = Math.random() * 500 - 250;
        var y = Math.random() * 500 - 250;
        var z = Math.random() * 500 - 250;
        var particle = new THREE.Vector3(x,y,z);

        particle.velocity = new THREE.Vector3(
			0,				// x
			-Math.random(),	// y
            0);				// z
            
            particles.vertices.push(particle);
        }
    var material = new THREE.PointsMaterial({color: 0xFFFFFF, size: 1});
    var points = new THREE.Points( particles, material );
    
    scene.add(points);
    
    var center;
    var loader;
    function loadPCD(pointSize)
    {
        loader = new PCDLoader();
        loader.load(
            'rys1.pcd',
            function(points) {
                points.material.size = pointSize;
                points.name = "pcd";
                scene.add(points);
                center = points;
                console.log("pcd loaded");
                render();
            }
            );

    }
    loadPCD(0.5);
    function render()
    {
        requestAnimationFrame(render);
        camera.position.x = controls.cameraX;
        camera.position.y = controls.cameraY;
        camera.position.z = controls.cameraZ;
    
        points.rotation.y -= 0.01;
        center.rotation.y -= 0.01;
        // camera.position.z -= 1;
        renderer.render(scene, camera);
    }
    // render();
}
