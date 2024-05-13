import './style.scss';

import { ObjectDetectorResult } from '@mediapipe/tasks-vision';
import { drawDetections } from './helpers/draw-object-detections.ts';
import { getObjectDetector } from './helpers/get-object-detector.ts';
import { initMenu } from './menu.ts';

let image: HTMLImageElement;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

async function start() {
	initMenu();

	image = document.getElementById('image') as HTMLImageElement;
	canvas = document.getElementById('canvas') as HTMLCanvasElement;
	ctx = canvas.getContext('2d');

	if (!ctx) {
		console.error('No canvas found');
		return;
	}

	const runningMode = 'IMAGE';
	const objectDetector = await getObjectDetector(runningMode);
	const detections: ObjectDetectorResult = objectDetector.detect(image);
	console.log(detections);

	drawDetections(ctx, image, detections);
}

document.addEventListener('DOMContentLoaded', start);

// const VIDEO_WIDTH = 640;
// const VIDEO_HEIGHT = 480;
//
// enum DrawableType {
// 	circle = 'circle',
// 	rect = 'rect',
// }
//
// interface DrawableBase {
// 	type: DrawableType;
//
// 	// Circle
// 	centerX?: number;
// 	centerY?: number;
// 	radius?: number;
//
// 	// Rect
// 	topLeftX?: number;
// 	topLeftY?: number;
// 	bottomRightX?: number;
// 	bottomRightY?: number;
// }

// interface CircleDrawable extends DrawableBase {
// 	type: DrawableType.circle;
// 	centerX: number;
// 	centerY: number;
// 	radius: number;
// }
//
// interface RectDrawable extends DrawableBase {
// 	type: DrawableType.rect;
// 	topLeftX: number;
// 	topLeftY: number;
// 	bottomRightX: number;
// 	bottomRightY: number;
// }

// type Drawable = CircleDrawable | RectDrawable;

// let img: CanvasImageSource;
// let isDrawing = false;
// const elements: Drawable[] = [];
//
// async function bitmapToImage(bitmap: ImageBitmap): Promise<HTMLImageElement> {
// 	// Create a canvas element
// 	const canvas = document.createElement('canvas');
// 	const ctx = canvas.getContext('2d');
//
// 	// Set the canvas dimensions to match the bitmap
// 	canvas.width = bitmap.width;
// 	canvas.height = bitmap.height;
//
// 	// Draw the ImageBitmap onto the canvas
// 	ctx.drawImage(bitmap, 0, 0);
//
// 	// Create a new Image element
// 	const image = new Image();
//
// 	// Set the source of the Image element to the data URL of the canvas
// 	image.src = canvas.toDataURL();
//
// 	// Wait for the image to load (optional)
// 	await new Promise((resolve) => {
// 		image.onload = resolve;
// 	});
//
// 	return image;
// }

// async function detectPlants() {
// 	let objectDetector: ObjectDetector;
// 	const runningMode = 'IMAGE';
//
// 	// Initialize the object detector
// 	const initializeObjectDetector = async () => {
// 		const vision = await FilesetResolver.forVisionTasks('node_modules/@mediapipe/tasks-vision/wasm');
// 		objectDetector = await ObjectDetector.createFromOptions(vision, {
// 			baseOptions: {
// 				modelAssetPath: modelPath,
// 				delegate: 'GPU',
// 			},
// 			scoreThreshold: 0.5,
// 			runningMode: runningMode,
// 		});
// 	};
// 	await initializeObjectDetector();
//
// 	/********************************************************************
//  // Demo 2: Continuously grab image from webcam stream and detect it.
// 	 ********************************************************************/

// const video = document.getElementById('webcam');
// const liveView = document.getElementById('liveView');
// let enableWebcamButton: HTMLButtonElement;
// Check if webcam access is supported.
// function hasGetUserMedia() {
// 	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
// }

// Keep a reference of all the child elements we create
// so we can remove them easilly on each render.
// const children = [];

// If webcam supported, add event listener to button for when user
// wants to activate it.
// if (hasGetUserMedia()) {
// 	enableWebcamButton = document.getElementById('webcamButton');
// 	enableWebcamButton.addEventListener('click', enableCam);
// } else {
// 	console.warn('getUserMedia() is not supported by your browser');
// }

// Enable the live webcam view and start detection.
// async function enableCam(event) {
// if (!objectDetector) {
// 	console.log('Wait! objectDetector not loaded yet.');
// 	return;
// }
//
// // Hide the button.
// enableWebcamButton.classList.add('removed');
//
// // getUsermedia parameters
// const constraints = {
// 	video: true,
// };

// Activate the webcam stream.
// navigator.mediaDevices
// 	.getUserMedia(constraints)
// 	.then(function (stream) {
// 		// video.srcObject = stream;
// setTimeout(predictWebcam, 1000);
// video.addEventListener('loadeddata', predictWebcam);
// })
// .catch((err) => {
// 	console.error(err);
// 	/* handle the error */
// });
// }

// // let lastVideoTime = -1;
// async function predictWebcam() {
// 	// if image mode is initialized, create a new classifier with video runningMode.
// 	// if (runningMode === 'IMAGE') {
// 	// 	runningMode = 'VIDEO';
// 	// 	await objectDetector.setOptions({ runningMode: 'VIDEO' });
// 	// }
//
// 	// Detect objects using detectForVideo.
// 	// if (video.currentTime !== lastVideoTime) {
// 	// 	lastVideoTime = video.currentTime;
// 	const img = document.querySelector('img');
// 	// const bitmap = await createImageBitmap(video);
// 	// const imageElement = await bitmapToImage(bitmap);
// 	// document.body.appendChild(imageElement);
// 	const detections = objectDetector.detect(img as HTMLImageElement);
// 	console.log({ detections });
// 	// displayVideoDetections(detections);
// 	// }
// 	// Call this function again to keep predicting when the browser is ready.
// 	window.requestAnimationFrame(predictWebcam);
// }

// function displayVideoDetections(result: any) {
// // Remove any highlighting from previous frame.
// for (const child of children) {
// 	liveView.removeChild(child);
// }
// children.splice(0);
// Iterate through predictions and draw them to the live view
// 	for (const detection of result.detections) {
// 		console.log({ detection });
// 		// const p = document.createElement('p');
// 		// p.innerText = detection.categories[0].categoryName + ' - with ' + Math.round(parseFloat(detection.categories[0].score) * 100) + '% confidence.';
// 		// p.style =
// 		// 	'left: ' +
// 		// 	(video.offsetWidth - detection.boundingBox.width - detection.boundingBox.originX) +
// 		// 	'px;' +
// 		// 	'top: ' +
// 		// 	detection.boundingBox.originY +
// 		// 	'px; ' +
// 		// 	'width: ' +
// 		// 	(detection.boundingBox.width - 10) +
// 		// 	'px;';
// 		//
// 		// const highlighter = document.createElement('div');
// 		// highlighter.setAttribute('class', 'highlighter');
// 		// highlighter.style =
// 		// 	'left: ' +
// 		// 	(video.offsetWidth - detection.boundingBox.width - detection.boundingBox.originX) +
// 		// 	'px;' +
// 		// 	'top: ' +
// 		// 	detection.boundingBox.originY +
// 		// 	'px;' +
// 		// 	'width: ' +
// 		// 	(detection.boundingBox.width - 10) +
// 		// 	'px;' +
// 		// 	'height: ' +
// 		// 	detection.boundingBox.height +
// 		// 	'px;';
// 		//
// 		// liveView.appendChild(highlighter);
// 		// liveView.appendChild(p);
// 		//
// 		// // Store drawn objects in memory so they are queued to delete at next call.
// 		// children.push(highlighter);
// 		// children.push(p);
// 	}
// }
// }

// async function start() {
// 	const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
// 	canvas = document.getElementById('canvas') as HTMLCanvasElement;
// 	ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
//
// 	// canvas.addEventListener('click', handleCanvasClick);
//
// 	// if (!video) {
// 	// 	window.alert('Failed to load video element');
// 	// 	return;
// 	// }
//
// 	if (!canvas) {
// 		window.alert('Failed to load canvas element');
// 		return;
// 	}
//
// 	if (!ctx) {
// 		window.alert('Failed to load canvas element (context)');
// 		return;
// 	}
//
// 	await detectPlants();
// video.addEventListener('loadeddata', async () => {
// 	await detectPlants(video);
// });
//
// if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
// 	video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
// 	await video.play();

// video.requestVideoFrameCallback((_now, metadata) => {
// 	console.log({ metadata });
// });
//
// setInterval(async () => {
// 	const bitmap = await createImageBitmap(video);
// 	ctx.drawImage(bitmap, 0, 0);
// 	const imageData = ctx.getImageData(0, 0, 640, 480);
// 	const row = 0;
// 	const col = 0;
// 	const red = imageData.data[row * (VIDEO_WIDTH * 4) + col * 4 + 0];
// 	const green = imageData.data[row * (VIDEO_WIDTH * 4) + col * 4 + 1];
// 	const blue = imageData.data[row * (VIDEO_WIDTH * 4) + col * 4 + 2];
// 	// console.log({ red, green, blue });
// 	// Save a frame
// 	// const blob = new Blob([canvas.toDataURL()], { type: 'text/json;charset=utf-8' });
// 	// saveAs(blob, 'frame.json');
// 	//
// 	// const res = await fetch('/public/frame.txt');
// 	// const frameDataUrl = await res.text();
// 	// img = new Image();
// 	// img.onload = function () {
// 	// 	ctx.drawImage(img, 0, 0);
// 	// 	startDrawLoop();
// 	// };
// 	// img.src = frameDataUrl;
//
// 	//
// 	// for (let row = 0; row < VIDEO_HEIGHT; row++) {
// 	// 	for (let col = 0; col < VIDEO_WIDTH; col++) {
// 	// 		const pixelIndex = row * VIDEO_WIDTH * 4 + col * 4;
// 	// 		frameData[pixelIndex] = 0;
// 	// 	}
// 	// }
// 	//
// 	// const augmentedImageData = ctx.createImageData(new ImageData(new Uint8ClampedArray(frameData), VIDEO_WIDTH, VIDEO_HEIGHT));
// 	// ctx.putImageData(augmentedImageData, 0, 0);
// }, 100);
// } else {
// 	window.alert('no media device found');
// }
// }

// function startDrawLoop() {
// 	isDrawing = true;
// 	setTimeout(draw, 100);
// }
//
// function getObjectFitSize(contains: boolean, containerWidth: number, containerHeight: number, width: number, height: number) {
// 	const doRatio = width / height;
// 	const cRatio = containerWidth / containerHeight;
// 	let targetWidth = 0;
// 	let targetHeight = 0;
// 	const test = contains ? doRatio > cRatio : doRatio < cRatio;
//
// 	if (test) {
// 		targetWidth = containerWidth;
// 		targetHeight = targetWidth / doRatio;
// 	} else {
// 		targetHeight = containerHeight;
// 		targetWidth = targetHeight * doRatio;
// 	}
//
// 	return {
// 		width: targetWidth,
// 		height: targetHeight,
// 		x: (containerWidth - targetWidth) / 2,
// 		y: (containerHeight - targetHeight) / 2,
// 	};
// }

// function getMousePos(evt: MouseEvent) {
// 	const windowWidth = window.innerWidth;
// 	const windowHeight = window.innerHeight;
//
// 	const canvasSize = getObjectFitSize(true, windowWidth, windowHeight, VIDEO_WIDTH, VIDEO_HEIGHT);
//
// 	return {
// 		x: (evt.clientX - canvasSize.x) * (VIDEO_WIDTH / canvasSize.width),
// 		y: (evt.clientY - canvasSize.y) * (VIDEO_HEIGHT / canvasSize.height),
// 	};
// }

// function handleCanvasClick(evt: MouseEvent) {
// 	const canvasMouseCoordinates = getMousePos(evt);
//
// 	elements.push({
// 		type: DrawableType.circle,
// 		centerX: canvasMouseCoordinates.x,
// 		centerY: canvasMouseCoordinates.y,
// 		radius: 60,
// 	});
//
// 	startDrawLoop();
// }

// function draw() {
// 	if (!isDrawing) {
// 		return;
// 	}
//
// 	ctx.drawImage(img, 0, 0);
//
// 	// process image
// 	const imageData = ctx.getImageData(0, 0, 640, 480);
// 	const hues = [];
// 	for (let row = 0; row < VIDEO_HEIGHT; row++) {
// 		for (let col = 0; col < VIDEO_WIDTH; col++) {
// 			const pixelIndex = row * VIDEO_WIDTH * 4 + col * 4;
// 			const pixelColor = Color({ r: imageData.data[pixelIndex], g: imageData.data[pixelIndex + 1], b: imageData.data[pixelIndex + 2] });
// 			const hue = pixelColor.hue();
// 			hues.push(hue);
// 			const artificialColor = Color.hsl(hue, 100, 50).rgb();
// 			imageData.data[pixelIndex] = artificialColor.red();
// 			imageData.data[pixelIndex + 1] = artificialColor.green();
// 			imageData.data[pixelIndex + 2] = artificialColor.blue();
// 		}
// 	}
// 	ctx.putImageData(imageData, 0, 0);
// 	const histogram = groupBy(hues, (hue) => Math.floor(hue / 32));
// 	const histogramCounts = map(histogram, (histogramValues) => {
// 		return histogramValues.length;
// 	});
// 	const maxOccurrence = max(histogramCounts) || 0;
//
// 	// filter out the most prevalent colors
// 	const histogramCountsFiltered = histogramCounts.map((histogramCount) => {
// 		if (histogramCount > 0.3 * maxOccurrence) {
// 			return 0;
// 		} else {
// 			return histogramCount;
// 		}
// 	});
//
// 	const maxOccurrenceFiltered = max(histogramCountsFiltered) || 0;
// 	histogramCountsFiltered.forEach((histogramOccurrence, index) => {
// 		console.log(index + 1 + ' - ' + pad('', Math.ceil((histogramOccurrence / maxOccurrenceFiltered) * 30), '#'));
// 	});
//
// 	// Draw ui
// 	elements.forEach((elem) => {
// 		switch (elem.type) {
// 			case 'circle':
// 				ctx.lineWidth = 4;
// 				ctx.strokeStyle = 'red';
// 				ctx.beginPath();
// 				ctx.arc(elem.centerX, elem.centerY, elem.radius, 0, 2 * Math.PI);
// 				ctx.stroke();
// 		}
// 	});
// }
