import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//创建场景.
let scene = new THREE.Scene();
//相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//渲染器
let renderer = new THREE.WebGLRenderer();
//设置画布大小
renderer.setSize(window.innerWidth, window.innerHeight);
//加入到body
document.body.appendChild(renderer.domElement);


//第二步,创建几何体.

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
let cube = new THREE.Mesh(geometry, material);
//加入到场景
scene.add(cube);

//设置相机位置
camera.position.z = 5;


const loader = new GLTFLoader().setPath('Testgltf/george-washington-greenough-statue-(1840)-150k-4096-gltf-new/');
loader.load('george-washington-greenough-statue-(1840)-150k-4096-web.gltf', function (gltf) {
    scene.add(gltf.scene); //返回的组对象插入场景中
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            //child.material.envMap = envMap;
            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );
        }
    });
})

//渲染循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

//export default GLTFLoader;