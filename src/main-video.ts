// import { saveAs } from 'file-saver';

import './style.scss';

const VIDEO_WIDTH = 640;
// const VIDEO_HEIGHT = 480;

async function start() {
	const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
	const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
	const context = canvas.getContext('2d');

	if (!video) {
		window.alert('Failed to load video element');
		return;
	}

	if (!canvas) {
		window.alert('Failed to load canvas element');
		return;
	}

	if (!context) {
		window.alert('Failed to load canvas element (context)');
		return;
	}

	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
		await video.play();

		// video.requestVideoFrameCallback((_now, metadata) => {
		// 	console.log({ metadata });
		// });

		setInterval(async () => {
			const bitmap = await createImageBitmap(video);
			context.drawImage(bitmap, 0, 0);
			const imageData = context.getImageData(0, 0, 640, 480);
			const row = 0;
			const col = 0;
			const red = imageData.data[row * (VIDEO_WIDTH * 4) + col * 4 + 0];
			const green = imageData.data[row * (VIDEO_WIDTH * 4) + col * 4 + 1];
			const blue = imageData.data[row * (VIDEO_WIDTH * 4) + col * 4 + 2];

			console.log({ red, green, blue });

			// Save a frame
			// const blob = new Blob([JSON.stringify(imageData.data)], { type: 'text/json;charset=utf-8' });
			// saveAs(blob, 'frame.json');
		}, 100);
	} else {
		window.alert('no media device found');
	}
}

document.addEventListener('DOMContentLoaded', start);
