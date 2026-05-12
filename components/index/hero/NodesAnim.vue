<template>
<canvas ref="canvasEl" style="display: block; width: 100%; height: 100%; pointer-events: none;"></canvas>
</template>

<script setup lang="ts">
const canvasEl = useTemplateRef('canvasEl');

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
	const shader = gl.createShader(type);
	if (shader == null) return null;

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(
			`falied to compile shader: ${gl.getShaderInfoLog(shader)}`,
		);
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

	const shaderProgram = gl.createProgram();
	if (shaderProgram == null || vertexShader == null || fragmentShader == null) return null;

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert(
			`failed to init shader: ${gl.getProgramInfoLog(
				shaderProgram,
			)}`,
		);
		return null;
	}

	return shaderProgram;
}

type Node = {
	// 0 ... hidden
	// 1 ... filled circle
	// 2 ... circle
	state: 0 | 1 | 2;
}

const nodes: Node[][] = [];

const NODES_X_COUNT = 50;
const NODES_Y_COUNT = 30;

for (let x = 0; x < NODES_X_COUNT; x++) {
	nodes[x] = [];
	for (let y = 0; y < NODES_Y_COUNT; y++) {
		nodes[x][y] = { state: Math.floor(Math.random() * 4) };
	}
}

type Line = {
	id: number;
	from: [x: number, y: number];
	to: [x: number, y: number];

	// -1 ~ +1
	progress: number;
};

const lines: Line[] = [];

let handle: ReturnType<typeof window['requestAnimationFrame']> | null = null;

onMounted(() => {
	const canvas = canvasEl.value!;
	let width = canvas.offsetWidth;
	let height = canvas.offsetHeight;
	canvas.width = width;
	canvas.height = height;

	const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false });
	if (gl == null) return;

	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

	const VERTICES = new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]);
	const vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);

	gl.clearColor(0.0, 0.0, 0.0, 0.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	const shaderProgram = initShaderProgram(gl, `#version 300 es
		in vec2 position;
		out vec2 in_uv;

		void main() {
			in_uv = (position + 1.0) / 2.0;
			gl_Position = vec4(position, 0.0, 1.0);
		}
	`, `#version 300 es
		precision highp float;

		in vec2 in_uv;
		uniform float u_nodesX;
		uniform float u_nodesY;
		out vec4 out_color;

		void main() {
			out_color = vec4(1.0, 0.0, 0.0, 1.0);
		}
	`);
	if (shaderProgram == null) return;

	gl.useProgram(shaderProgram);

	const u_resolution = gl.getUniformLocation(shaderProgram, 'u_resolution');
	gl.uniform2fv(u_resolution, [width, height]);

	const positionLocation = gl.getAttribLocation(shaderProgram, 'position');
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionLocation);

	const u_nodesX = gl.getUniformLocation(shaderProgram, 'u_nodesX');
	gl.uniform1i(u_nodesX, NODES_X_COUNT);
	const u_nodesY = gl.getUniformLocation(shaderProgram, 'u_nodesY');
	gl.uniform1i(u_nodesY, NODES_Y_COUNT);

	function render(timestamp: number) {
		let sizeChanged = false;
		if (Math.abs(height - canvas.offsetHeight) > 2) {
			height = canvas.offsetHeight;
			canvas.height = height;
			sizeChanged = true;
		}
		if (Math.abs(width - canvas.offsetWidth) > 2) {
			width = canvas.offsetWidth;
			canvas.width = width;
			sizeChanged = true;
		}
		if (sizeChanged && gl) {
			gl.uniform2fv(u_resolution, [width, height]);
			gl.viewport(0, 0, width, height);
		}

		//gl!.uniform1f(u_time, timeStamp);
		gl!.drawArrays(gl!.TRIANGLES, 0, 6);

		handle = window.requestAnimationFrame(render);
	}

	handle = window.requestAnimationFrame(render);
});

onUnmounted(() => {
	if (handle) {
		window.cancelAnimationFrame(handle);
	}
});
</script>

<style module>

</style>
