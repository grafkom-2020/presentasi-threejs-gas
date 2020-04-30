var renderer, camera, scene;
function main()
{
    // set the scene size
    var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

    // set some camera attributes
    var VIEW_ANGLE = 75,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 1000;

    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene = new THREE.Scene();
    camera.position.z = 300;

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

    function render()
    {
        requestAnimationFrame(render);
        points.rotation.y -= 0.01;
        renderer.render(scene, camera);
    }

    render();
}