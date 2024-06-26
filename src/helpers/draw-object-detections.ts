import { Detection } from '@mediapipe/tasks-vision';
import { compact } from 'lodash-es';
import { combineOverlappingBoundingBoxes } from './combine-overlapping-bounding-boxes.ts';

export function drawDetections(ctx: CanvasRenderingContext2D, video: HTMLVideoElement, detections: Detection[]) {
	ctx.drawImage(video, 0, 0);

	const boundingBoxes = compact(detections.map((detection) => detection.boundingBox));

	const noOverlapBoxes = combineOverlappingBoundingBoxes(boundingBoxes);

	noOverlapBoxes.forEach((boundingBox) => {
		ctx.strokeStyle = '#FF00FF';
		ctx.lineWidth = 6;
		ctx.strokeRect(boundingBox?.originX, boundingBox?.originY, boundingBox?.width, boundingBox?.height);
	});
}
