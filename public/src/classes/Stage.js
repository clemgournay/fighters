import * as THREE from '../vendors/three/three.module.js'; 
import { FBXLoader } from '../vendors/three/loaders/FBXLoader.js'

class Stage {

    constructor(game) {
        this.game = game;
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 10000);
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.clock = new THREE.Clock();
        this.textureLoader  = new THREE.TextureLoader();
        this.mixer = null;
        this.animations = {};
        this.character = null;
        this.speed = 100;
        this.skybox = null;
        this.actions = {};
    }

    init () {
        this.build();
        this.events();
    }

    build() {

        this.scene.background = new THREE.Color('rgb(100, 100, 100)');

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xb1b1b1);
        this.scene.add(hemiLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
        this.scene.add(directionalLight);

        /*const light = new THREE.AmbientLight( 0x404040, ); // soft white light
        this.scene.add( light );*/

        const floorGeo = new THREE.PlaneGeometry(1500, 500);
        const floorTexture = this.textureLoader.load('./assets/images/textures/ground.png');
        const normalMap = this.textureLoader.load('./assets/images/textures/NormalMap.jpg');
        floorTexture.wrapS = THREE.RepeatWrapping;
        floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(5, 5);
        const floorMat = new THREE.MeshPhongMaterial({
            map: floorTexture,
            normalMap: normalMap,
            metal: false,
            skining: true
        });
        console.log(floorMat)
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI/2;
        floor.castShadow = true;
	    floor.receiveShadow = true;
        this.scene.add(floor);
        

        const skyGeo = new THREE.SphereGeometry(800, 25, 25);
        const skyboxTexture = this.textureLoader.load('./assets/images/skyboxes/sky1.jpg');
        const material = new THREE.MeshPhongMaterial({
            map: skyboxTexture
        });
        this.skybox = new THREE.Mesh(skyGeo, material);
        //this.skybox.rotation.z = Math.PI/2;
        this.skybox.material.side = THREE.BackSide;
        this.scene.add(this.skybox);

        const loader = new FBXLoader();
        loader.load('./assets/models/character.fbx', (object) => {

            console.log(object)
            this.mixer = new THREE.AnimationMixer(object);
            console.log(object.animations);

            this.animations.all = [];
            object.animations.forEach((animation, index) => {
                this.animations.all[index] = this.mixer.clipAction(animation);
            });
            /*this.animations.iddle = this.mixer.clipAction(object.animations[0]);
            this.animations.walking = this.mixer.clipAction(object.animations[1]);
            this.animations.walkingBackwards = this.mixer.clipAction(object.animations[2]);
            this.animations.iddle.play();*/
            this.animations.all[2].play();

            object.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    //child.receiveShadow = true;
                }
            });
            object.rotateY(Math.PI/2);
            object.position.set(-300, 0, 0);
            this.character = object;
            this.scene.add(this.character);
        });

        this.camera.position.set(0, 200, 400)
        
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

    }
    

    update() {

        const delta = this.clock.getDelta();
        
        const moveDistance = this.speed * delta;
        /*const actions = this.game.controls.actions;*/
        /*if (this.animations.iddle && this.animations.walking) {
            if (this.actions.FORWARD) {
                this.character.translateZ(moveDistance);
                this.animations.walking.play();
                this.animations.iddle.stop();
            } else {
                this.animations.iddle.play();
                this.animations.walking.stop();
            }
        }*/

        this.skybox.rotateY(0.1*delta);
        
		if (this.mixer) this.mixer.update(delta);

        this.renderer.render(this.scene, this.camera);
    }

    events() {
        window.onresize = () => {
            this.resize();
        }
        window.playAnim = (i) => {
            this.animations.all.forEach((animation) => {
                animation.stop();
            });
            this.animations.all[i].play();
        }

    }

    resize() {
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
}

export { Stage };
