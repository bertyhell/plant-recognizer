import { FilesetResolver, ObjectDetector } from '@mediapipe/tasks-vision';

const modelPath = new URL('../../public/efficientdet_lite0.tflite', import.meta.url).href;

export async function getObjectDetector(runningMode: 'IMAGE' | 'VIDEO'): Promise<ObjectDetector> {
	const vision = await FilesetResolver.forVisionTasks('node_modules/@mediapipe/tasks-vision/wasm');
	return await ObjectDetector.createFromOptions(vision, {
		baseOptions: {
			modelAssetPath: modelPath,
			delegate: 'GPU',
		},
		scoreThreshold: 0.1,
		runningMode: runningMode,
	});
}
