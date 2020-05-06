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

    var controls = new function()
    {
        this.particleNumb = 500;
        this.useSprites = false;

        this.redraw = function() {
            if(scene.getObjectByName("points")){
                scene.remove(scene.getObjectByName("points"));
            }
            if(scene.getObjectByName("sprites")){
                scene.remove(scene.getObjectByName("sprites"));
            }

            if(controls.useSprites) {
                createSprites(controls.particleNumb);
            }
            else {
                createPoints(controls.particleNumb);
            }
        };
    }

    var gui = new dat.GUI();
    gui.add(controls, 'particleNumb', 100, 10000).onChange(controls.redraw);
    gui.add(controls, 'useSprites').onChange(controls.redraw);

    var points, group;

    //POINTS
    function createPoints(particleNumb)
    {
        var particles = new THREE.Geometry();
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
        points = new THREE.Points( particles, material );
        points.name = "points";
        scene.add(points);
    }


    // SPRITE
    function createSprites(particleNumb)
    {
        scene.fog = new THREE.FogExp2( 	0xFF0000, 0.0008 );
        var spriteMaterial = new THREE.SpriteMaterial( { 
            color: 0xffffff,
            fog: true,
            rotation: 0,
            sizeAttenuation: true ,
        } );
        group = new THREE.Group();
        for(var x=0;x<particleNumb;x++){
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250);
            //sprite.scale.set(5, 5, 5);
            group.add(sprite)
        }
        group.name = "sprites";
        scene.add(group);
    }

    createPoints(controls.particleNumb);
    function render()
    {
        requestAnimationFrame(render);
        if(controls.useSprites) group.rotation.y -= 0.01// SPRITE
        else points.rotation.y -= 0.01; // POINTS

        renderer.render(scene, camera);
    }

    render();
}