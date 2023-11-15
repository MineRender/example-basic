import { AssetKey, BlockStates, Entities, Models, OrbitControls, Renderer, SceneInspector, SceneObject, Skins, toRadians } from "minerender";
import { Euler, Object3D, Vector3 } from "three";

const renderContainer = document.getElementById('render-container') as HTMLDivElement;
const inspectorContainer = document.getElementById('inspector-container') as HTMLDivElement;

// create renderer and append it to the DOM
const renderer = new Renderer({
    camera: {
        near: 1,
        far: 2000,
        perspective: {
            fov: 50
        }
    },
    render: {
        stats: true,
        fpsLimit: 60,
        antialias: false,
        renderAlways: true
    },
    composer: {
        enabled: false,
    },
    debug: {
        grid: false,
        axes: false
    }
});
renderer.appendTo(renderContainer);

// create controls & register events
const controls = new OrbitControls(renderer.camera, renderer.renderer.domElement);
renderer.registerEventDispatcher(controls);
controls.update();

const inspector = new SceneInspector(renderer);
inspector.appendTo(inspectorContainer);

// start the renderer!
renderer.start();

// add some things to the scene

Skins.fromUuidOrUsername("inventivetalent")
    .then(skinUrl => renderer.scene.addSkin(skinUrl, {
        wireframe: true
    }))
    .then(skinObject => {
        skinObject.setPosition(toBlockPos(0, .5, 0));

        const leftArm = skinObject.getGroupByName('leftArm') as Object3D;
        leftArm.rotateX(toRadians(170));
        leftArm.rotateZ(toRadians(330))

        const rightArm = skinObject.getGroupByName('rightArm') as Object3D;
        rightArm.rotateX(toRadians(60));
    });

for (let x = -1; x < 2; x++) {
    for (let z = -1; z < 2; z++) {
        BlockStates.get(AssetKey.parse("blockstates", Math.random() > 0.4 ? "stone" : "water"))
            .then(blockState => renderer.scene.addBlock(blockState!, {
                wireframe: true,
                instanceMeshes: true
            }))
            .then(blockObject => {
                blockObject.setPosition(toBlockPos(x, 0, z));
            });
    }
}

Models.get(AssetKey.parse("models", "item/diamond_sword"))
    .then(model => renderer.scene.addModel(model!, {
        wireframe: true,
    }))
    .then(modelObject => {
        modelObject.setPosition(new Vector3(6, 33, -11));
        modelObject.setRotation(new Euler(toRadians(14), toRadians(90), 0));
    })

Models.get(AssetKey.parse("models", "block/sea_lantern"))
    .then(model => renderer.scene.addModel(model!, {
        wireframe: true,
        instanceMeshes: true
    }))
    .then(modelObject => {
        modelObject.setPosition(toBlockPos(2, 0, 2));
    })
Models.get(AssetKey.parse("models", "block/sea_lantern"))
    .then(model => renderer.scene.addModel(model!, {
        wireframe: true,
        instanceMeshes: true
    }))
    .then(modelObject => {
        modelObject.setPosition(toBlockPos(1, 0, 2));
    })
Models.get(AssetKey.parse("models", "block/sea_lantern"))
    .then(model => renderer.scene.addModel(model!, {
        wireframe: true,
        instanceMeshes: true
    }))
    .then(modelObject => {
        modelObject.setPosition(toBlockPos(3, 0, 2));
    })
Models.get(AssetKey.parse("models", "block/lava"))
    .then(model => renderer.scene.addModel(model!, {
        wireframe: true,
        instanceMeshes: true
    }))
    .then(modelObject => {
        modelObject.setPosition(toBlockPos(2, 0, 3));
    })


Entities.getBlock(AssetKey.parse("entities", "sign"), new AssetKey("minecraft", "signs/acacia","textures", "entity"))
    .then(entity => renderer.scene.addEntity(entity!, {
        wireframe: true,
    }))
    .then(entityObject => {
        entityObject.setPosition(toBlockPos(0, 0, 3));
    })

Entities.getBlock(AssetKey.parse("entities", "banner"), new AssetKey("minecraft", "banner/base","textures", "entity"))
    .then(entity => renderer.scene.addEntity(entity!, {
        wireframe: true,
    }))
    .then(entityObject => {
        entityObject.setPosition(toBlockPos(0, 0, 4));
    })

function toBlockPos(x: number, y: number, z: number) {
    return new Vector3(x, y, z).multiplyScalar(16);
}