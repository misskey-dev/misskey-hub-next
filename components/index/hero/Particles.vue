<template>
<div ref="container" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import tinycolor from 'tinycolor2';
import * as Calc from './calc';
import * as Ease from './ease';

const container = useTemplateRef('container');

function hexToInt(rrggbb: string): number {
	if (rrggbb.startsWith('#')) rrggbb = rrggbb.substr(1);
	return parseInt(rrggbb, 16);
}

class Ripple {
	private loader: Loader;
	private system: System;

	private array: Ripple[];
	private group: THREE.Object3D;
	private sphere: THREE.Sphere;
	private strength: number; // 波の高さ
	private threshold: number;
	private growth: number;
	private life: number;
	private decay: number;
	private influence: THREE.Vector3;
	private geometry: THREE.TubeGeometry;
	private material: THREE.LineBasicMaterial;
	private mesh: THREE.Mesh;

	constructor(config, system) {
		this.system = system;
		this.loader = this.system.loader;

		this.array = config.array;
		this.group = config.group;
		this.sphere = new THREE.Sphere(new THREE.Vector3(config.x, config.y, config.z), 0);
		this.strength = config.strength ? config.strength : Calc.rand(7, 15);
		this.threshold = Calc.rand(10, 30);
		this.growth = Calc.rand(0.2, 0.5);
		this.life = 1;
		this.decay = Calc.rand(0.01, 0.02);
		this.influence = new THREE.Vector3();
		const points: THREE.Vector3[] = [];
		const resolution = 64;
		for (let j = 0; j < (Math.PI * 2) + ((Math.PI) / resolution); j += (2 * Math.PI) / resolution) {
			points.push(new THREE.Vector3(Math.cos(j), Math.sin(j), 0));
		}
		const path = new THREE.CatmullRomCurve3(points, true);
		this.geometry = new THREE.TubeGeometry(path, resolution, 0.01, 16);

		this.material = new THREE.MeshBasicMaterial({
			color: config.color,
			opacity: 1,
			transparent: true,
			depthTest: false,
		});
		//this.material.onBeforeRender = () => {};
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.rotation.x = Math.PI / 2;
		this.mesh.position.x = this.sphere.center.x;
		this.mesh.position.y = 0;
		this.mesh.position.z = this.sphere.center.z;
		this.group.add(this.mesh);
	}

	getInfluenceVector(vec) {
		this.influence.set(0, 0, 0);
		let distance = this.sphere.distanceToPoint(vec);

		if(distance <= this.threshold ) {
			let ease = Ease.inOutSine(this.threshold - distance, 0, 1, this.threshold);
			let power = (this.strength * ease * this.life);
			this.influence.addVectors(vec, this.sphere.center).multiplyScalar(power);
		}

		return this.influence;
	}

	update(i) {
		this.sphere.radius += (this.growth * this.life) * this.loader.deltaTimeNormal;
		this.life -= this.decay * this.loader.deltaTimeNormal;

		this.mesh.position.y = (1 - this.life) * -2;
		let newScale = 0.001 + this.sphere.radius;
		this.mesh.scale.set(newScale, newScale, newScale);
		this.mesh.material.opacity = this.life / 3;

		if(this.life <= 0) {
			this.destroy(i);
		}
	}

	destroy(i) {
		this.geometry.dispose();
		this.material.dispose();
		this.group.remove(this.mesh);
		this.array.splice(i, 1);
	}
}


class Particle {
	private loader: Loader;
	private system: System;

	private lerpFactor = 0.3;
	private dampFactor = 0.3;

	private group: THREE.Object3D;
	private x: number;
	private y: number;
	private z: number;
	private size: number;
	private color: number;
	private opacity: number;

	public base: THREE.Vector3;
	public velocity: THREE.Vector3;
	private geometry: THREE.SphereGeometry;
	private material: THREE.MeshBasicMaterial;
	private mesh: THREE.Mesh;

	constructor(config, system) {
		this.system = system;
		this.loader = this.system.loader;

		this.group = config.group;
		this.x = config.x;
		this.y = config.y;
		this.z = config.z;
		this.size = config.size;
		this.color = config.color;
		this.opacity = config.opacity;

		this.createMesh();

		this.base = new THREE.Vector3(config.x, config.y, config.z);
		this.velocity = new THREE.Vector3(0, 0, 0);
	}

	createMesh() {
		this.geometry = this.system.sphereGeometry;

		this.material = new THREE.MeshBasicMaterial({
			color: this.color,
			transparent: true,
			opacity: this.opacity,
			depthTest: false,
			precision: 'lowp'
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.mesh.position.x = this.x;
		this.mesh.position.y = this.y;
		this.mesh.position.z = this.z;

		this.mesh.scale.set(this.size, this.size, this.size);

		this.group.add(this.mesh);
	}

	update() {
		const scale = 0.075 + (Math.abs(this.velocity.y) / 25)
		this.mesh.scale.set(scale, scale, scale);

		//const opacity = 0.15 + (Math.abs(this.velocity.y) / 1)
		//this.mesh.material.opacity = Calc.clamp(opacity, 0.15, 1);
		const opacity = 0 + (Math.abs(this.velocity.y) / 1)
		this.mesh.material.opacity = Calc.clamp(opacity, 0, 1);

		this.velocity.y += (this.base.y - this.mesh.position.y) * this.lerpFactor;
		this.velocity.multiplyScalar(this.dampFactor);
		this.mesh.position.add(this.velocity);
	}

}

class Drop {
	private loader: Loader;
	private system: System;

	private array: Drop[];
	private group: THREE.Object3D;
	private x: number;
	private y: number;
	private z: number;
	private size: number;
	private color: number;
	private opacity: number;
	private strength: number;
	private yBase: number;

	private progress: number = 0;
	private rate: number = 0.01;

	private geometry: System['boxGeometry'];
	private material: THREE.MeshBasicMaterial;
	private mesh: THREE.Mesh;

	constructor(config, system) {
		this.system = system;
		this.loader = this.system.loader;

		this.array = config.array;
		this.group = config.group;
		this.x = config.x;
		this.y = config.y;
		this.z = config.z;
		this.size = config.size;
		this.color = config.color;
		this.opacity = config.opacity;
		this.strength = config.strength;
		this.progress = config.progress ?? 0;

		this.yBase = config.y;

		this.createMesh();
	}

	createMesh() {
		this.geometry = this.system.boxGeometry;

		this.material = new THREE.MeshBasicMaterial({
			color: this.color,
			transparent: true,
			opacity: this.opacity,
			depthTest: false,
			precision: 'lowp'
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.mesh.position.x = this.x;
		this.mesh.position.y = this.y;
		this.mesh.position.z = this.z;

		this.mesh.scale.set(this.size, this.size, this.size);

		this.group.add(this.mesh);
	}

	update(i) {
		this.progress += this.rate * this.loader.deltaTimeNormal;
		this.mesh.position.y = this.yBase - Ease.inExpo(this.progress, 0, 1, 1) * this.yBase;
		this.mesh.scale.set(this.size, this.size + this.size * 16 * Ease.inExpo(this.progress, 0, 1, 1), this.size);
		this.mesh.material.opacity = Ease.inExpo(this.progress, 0, 1, 1);

		if(this.progress >= 1) {
			this.geometry.dispose();
			this.material.dispose();
			this.group.remove(this.mesh);
			this.array.splice(i, 1);
			this.system.createRipple(this.mesh.position.x, this.mesh.position.z, this.strength);
		}
	}
}

class System {
	public loader: Loader;
	private drops: Drop[] = [];
	private ripples: Ripple[] = [];
	private particles: Particle[] = [];

	public sphereGeometry: THREE.SphereGeometry;
	public boxGeometry: THREE.BoxGeometry;
	private center: THREE.Vector3;
	private particleGroup: THREE.Object3D;

	private size = 96;
	private cols = 32;
	private rows = 32;

	private tick: number = 0;
	private dropTick = 0;
	private dropTickMin = 20;
	private dropTickMax = 25;

	private particleColor: number;
	private rippleColor: number;
	private dropColor: number;

	constructor(loader, config: { particleColor: string; rippleColor: string; dropColor: string; }) {
		this.loader = loader;

		this.particleColor = hexToInt(config.particleColor);
		this.rippleColor = hexToInt(config.rippleColor);
		this.dropColor = hexToInt(config.dropColor);

		this.sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
		this.boxGeometry = new THREE.BoxGeometry(1, 1, 1);
		this.center = new THREE.Vector3();
		this.loader.camera.lookAt(this.center);

		this.particleGroup = new THREE.Object3D();
		this.particleGroup.scale.set(1, 1, 1);

		this.loader.scene.add(this.particleGroup);

		for (let col = 0; col < this.cols; col++) {
			for (let row = 0; row < this.rows; row++) {
				let x = Calc.map(col, 0, this.cols - 1, -this.size / 2, this.size / 2);
				let y = 0;
				let z = Calc.map(row, 0, this.rows - 1, -this.size / 2, this.size / 2);

				this.particles.push(new Particle({
					group: this.particleGroup,
					x: x,
					y: y,
					z: z,
					size: 0.01,
					color: this.particleColor,
					opacity: 0.01
				}, this));
			}
		}

		for (let i = 0; i < 5; i++) {
			this.createDrop(Math.random());
		}
	}

	createDrop(progress = 0) {
		this.drops.push(new Drop({
			array: this.drops,
			group: this.particleGroup,
			x: Calc.rand(-this.size / 2, this.size / 2),
			y: Calc.rand(30, 50),
			z: Calc.rand(-this.size / 2, this.size / 2),
			size: 0.15,
			color: this.dropColor,
			opacity: 0,
			progress
		}, this));
	}

	updateDrops() {
		let i = this.drops.length;
		while(i--) {
			this.drops[i].update(i);
		}
	}

	createRipple(x, z, strength) {
		this.ripples.push(new Ripple({
			array: this.ripples,
			group: this.particleGroup,
			x: x,
			y: -0.1,
			z: z,
			color: this.rippleColor,
			strength: strength
		}, this));
	}

	updateRipples() {
		let i = this.ripples.length;
		while(i--) {
			this.ripples[i].update(i);
		}
	}

	update() {
		{
			let i = this.particles.length;
			while(i--) {
				this.particles[i].update();
			}
		}

		if(this.tick >= this.dropTick) {
			this.createDrop();
			this.dropTick = Calc.randInt(this.dropTickMin, this.dropTickMax);
			this.tick = 0;
		}

		this.updateDrops();
		this.updateRipples();
	
		{
			let i = this.particles.length;
			while(i--) {
				let j = this.ripples.length;
				while(j--) {
					let particle = this.particles[i];
					let ripple = this.ripples[j];
					let influence = ripple.getInfluenceVector(particle.base);
					influence.setX(0);
					influence.setZ(0);
					particle.velocity.add(influence);
				}
			}
		}

		this.particleGroup.rotation.x = Math.cos(this.loader.elapsedMilliseconds * 0.0005) * 0.1;
		this.particleGroup.rotation.y = Math.PI * 0.25 + Math.sin(this.loader.elapsedMilliseconds * 0.0005) * -0.2;
	
		this.tick += this.loader.deltaTimeNormal;
	}
}

class Loader {
	public timescale: number = 0.75;
	public camera: THREE.PerspectiveCamera;
	public clock: THREE.Clock;
	public deltaTimeSeconds: number;
	public deltaTimeMilliseconds: number;
	public deltaTimeNormal: number;
	public elapsedMilliseconds: number;
	public system: System;
	public scene: THREE.Scene;
	public renderer: THREE.WebGLRenderer;
	private diffTime: number;
	private raf: ReturnType<typeof window.requestAnimationFrame>;
	private dom: HTMLElement;

	constructor(container: HTMLElement) {
		this.dom = container;

		this.raf = null;

		this.setupTime();
		this.setupScene();
		this.setupCamera();
		this.setupRenderer();
		this.listen();
		this.onResize();

		this.system = new System(this, {
			particleColor: '#86b300',
			dropColor: '#86b300',
			rippleColor: '#86b300',
		});
		this.loop();
	}

	setupTime() {
		this.clock = new THREE.Clock();
		this.deltaTimeSeconds = this.clock.getDelta() * this.timescale;
		this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
		this.deltaTimeNormal = this.deltaTimeMilliseconds / (1000 / 60);
		this.elapsedMilliseconds = 0;
	}

	setupScene() {
		this.scene = new THREE.Scene();
	}

	setupCamera() {
		this.camera = new THREE.PerspectiveCamera(70, 0, 0.0001, 10000);

		//this.camera.position.x = 0;
		//this.camera.position.y = 0;
		//this.camera.position.z = 20;

		this.camera.position.x = 0;
		this.camera.position.y = -30;
		this.camera.position.z = 0;
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});

		this.dom.appendChild(this.renderer.domElement);
	}

	update() {
		this.deltaTimeSeconds = this.clock.getDelta();
		if(this.diffTime) {
			this.deltaTimeSeconds -= this.diffTime;
			this.diffTime = 0;
		}
		this.deltaTimeSeconds *= this.timescale;
		this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
		this.deltaTimeNormal = this.deltaTimeMilliseconds / (1000 / 60);
		this.elapsedMilliseconds += this.deltaTimeMilliseconds;

		this.system.update();
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	listen() {
		window.addEventListener('resize', (e) => this.onResize(e));
	}

	onResize() {
		const width = this.dom.offsetWidth;
		const height = this.dom.offsetHeight;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
		this.renderer.setSize(width, height);
	}

	loop() {
		this.update();
		this.render();
		this.raf = window.requestAnimationFrame(() => this.loop());
	}

	destroy() {
		window.cancelAnimationFrame(this.raf);
	}
}

let loder: any;

onMounted(() => {
	loder = new Loader(container.value);
});

onUnmounted(() => {
	loder.destroy();
});
</script>

<style module>

</style>
