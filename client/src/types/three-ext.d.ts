declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher, Object3D } from 'three'

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement)
    enabled: boolean
    target: import('three').Vector3
    enableDamping: boolean
    dampingFactor: number
    autoRotate: boolean
    autoRotateSpeed: number
    enableZoom: boolean
    enablePan: boolean
    minDistance: number
    maxDistance: number
    update(): void
    dispose(): void
  }
}
