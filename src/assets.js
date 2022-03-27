const defaultScenography = {
    pX: 0,
    pY: 0,
    pZ: 0,
    rX: 0,
    rY: 0,
    rZ: 0,
    sX: 1,
    sY: 1,
    sZ: 1
}


export default {
    statue: {
        url: './assets3D/mozartStatue/photoscan_mozart.gltf',
        pX: 0,
        pY: -0.8,
        pZ: -5,
        rX: Math.PI / 8,
        rY: - 1.6 * Math.PI,
        rZ: 0,
        sX: 0.5,
        sY: 0.5,
        sZ: 0.5
    },
    bridge: {
        url: './assets3D/bridge/bridge-v2.gltf',
        pX: 0,
        pY: -0.8,
        pZ: -1.365,
        rX: 0,
        rY: Math.PI / 2,
        rZ: 0,
        sX: 1,
        sY: 1,
        sZ: 1
    },
    flask: {
        url: './assets3D/flask/flask.gltf',
        pX: 0,
        pY: -0.5,
        pZ: -2,
        rX: 0,
        rY: 3,
        rZ: 0,
        sX: 0.5,
        sY: 0.5,
        sZ: 0.5
    },
    harpsichord: {
        url: './assets3D/harpsichord/harpsichord.gltf',
        pX: 0.360,
        pY: -0.580,
        pZ: -2.360,
        rX: -3.002,
        rY: -0.908,
        rZ: -3.101,
        sX: 1,
        sY: 1,
        sZ: 1
    },
    parchemin: {
        url: './assets3D/parchment/parchmin.gltf',
        pX: 0,
        pY: -0.460,
        pZ: -1.800,
        rX: 0,
        rY: 0,
        rZ: 0,
        sX: 0.5,
        sY: 0.5,
        sZ: 0.5
    }

}