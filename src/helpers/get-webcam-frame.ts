// let track: MediaStreamTrack;

async function getWebcam(video: HTMLVideoElement) {
	await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
	const devices = await navigator.mediaDevices.enumerateDevices();
	let device = devices.find((device) => device.kind === 'videoinput' && device.label?.toLowerCase().includes('obs'));
	if (!device) {
		device = devices.find((device) => device.kind === 'videoinput');
	}
	console.log(device);

	video.srcObject = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: device?.deviceId } } });
	// track = stream.getTracks()[0];
}

export async function initWebcam(ctx: CanvasRenderingContext2D, video: HTMLVideoElement): Promise<void> {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		try {
			// if (window.location.protocol !== 'https:') {
			// 	throw new Error('Failed to init webcam on http protocol');
			// }

			if (!navigator.mediaDevices.getUserMedia) {
				throw new Error('Failed to get camera reference');
			}

			// let width = 0, height = 0;

			if (!video) {
				throw new Error('Failed to find video element on the page with id: #video');
			}

			await getWebcam(video);

			video.addEventListener('loadeddata', function (evt) {
				// width = canvas.width = video.videoWidth;
				// height = canvas.height = video.videoHeight;
				// centerX = width / 2;
				// centerY = height / 2;
				// startLoop();
				console.log({
					videoWidth: video.videoWidth,
					videoHeight: video.videoHeight,
					evt,
				});
				ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, 1280, 720);
				resolve();
			});
		} catch (err) {
			reject(err);
		}
	});

	//
	// let rotation = 0,
	// 		loopFrame,
	// 		centerX,
	// 		centerY,
	// 		twoPI = Math.PI * 2;
	//
	// function loop() {
	//
	// 	loopFrame = requestAnimationFrame(loop);
	//
	// 	//ctx.clearRect(0, 0, width, height);
	//
	// 	// ctx.globalAlpha = 0.005;
	// 	// ctx.fillStyle = "#FFF";
	// 	// ctx.fillRect(0, 0, width, height);
	//
	// 	ctx.save();
	//
	//
	// 	// ctx.beginPath();
	// 	// ctx.arc( centerX, centerY, 140, 0, twoPI , false);
	// 	// //ctx.rect(0, 0, width/2, height/2);
	// 	// ctx.closePath();
	// 	// ctx.clip();
	//
	// 	//ctx.fillStyle = "#FFF";
	// 	//ctx.fillRect(0, 0, width, height);
	//
	// 	// ctx.translate( centerX, centerY );
	// 	// rotation += 0.005;
	// 	// rotation = rotation > 360 ? 0 : rotation;
	// 	// ctx.rotate(rotation);
	// 	// ctx.translate( -centerX, -centerY );
	//
	// 	ctx.globalAlpha = 0.1;
	// 	ctx.drawImage(video, 0, 0, width, height);
	//
	// 	ctx.restore();
	//
	// }
	//
	// function startLoop() {
	// 	loopFrame = loopFrame || requestAnimationFrame(loop);
	// }
	//
	//
	//
	// canvas.addEventListener('click', function() {
	// 	if (track) {
	// 		if (track.stop) {
	// 			track.stop();
	// 		}
	// 		track = null;
	// 	} else {
	// 		getWebcam();
	// 	}
	// });
}
//
// export function getWebcamFrame() {}
