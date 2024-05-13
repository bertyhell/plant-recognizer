import { BoundingBox } from '@mediapipe/tasks-vision';

export function combineOverlappingBoundingBoxes(boxes: BoundingBox[]): BoundingBox[] {
	// Array to store combined bounding boxes
	const combinedBoxes: BoundingBox[] = [];

	// Helper function to check if two bounding boxes overlap
	const doBoxesOverlap = (boxA: BoundingBox, boxB: BoundingBox) => {
		return (
			boxA.originX < boxB.originX + boxB.width && boxA.originX + boxA.width > boxB.originX && boxA.originY < boxB.originY + boxB.height && boxA.originY + boxA.height > boxB.originY
		);
	};

	// Iterate over each bounding box
	for (const box of boxes) {
		let combined = false;

		// Check if the current box overlaps with any existing combined box
		for (const combinedBox of combinedBoxes) {
			if (doBoxesOverlap(box, combinedBox)) {
				// If the boxes overlap, update the combined box to include both
				combinedBox.originX = Math.min(combinedBox.originX, box.originX);
				combinedBox.originY = Math.min(combinedBox.originY, box.originY);
				const maxX = Math.max(combinedBox.originX + combinedBox.width, box.originX + box.width);
				const maxY = Math.max(combinedBox.originY + combinedBox.height, box.originY + box.height);
				combinedBox.width = maxX - combinedBox.originX;
				combinedBox.height = maxY - combinedBox.originY;
				combined = true;
				break;
			}
		}

		// If the current box doesn't overlap with any existing combined box, add it as a new combined box
		if (!combined) {
			combinedBoxes.push({ ...box });
		}
	}

	return combinedBoxes;
}
