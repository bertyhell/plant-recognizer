const dragTL = false;
const dragBL = false;
const dragTR = false;
const dragBR = false;
const dragWholeRect = false;

export function initSetDetectionAreaScreen() {
	canvas.addEventListener('mousedown', mouseDown, false);
	canvas.addEventListener('mouseup', mouseUp, false);
	canvas.addEventListener('mousemove', mouseMove, false);
	canvas.addEventListener('touchstart', mouseDown);
	canvas.addEventListener('touchmove', mouseMove);
	canvas.addEventListener('touchend', mouseUp);
}

export function destroySetDetectionAreaScreen() {
	canvas.removeEventListener('mousedown', mouseDown, false);
	canvas.removeEventListener('mouseup', mouseUp, false);
	canvas.removeEventListener('mousemove', mouseMove, false);
	canvas.removeEventListener('touchstart', mouseDown);
	canvas.removeEventListener('touchmove', mouseMove);
	canvas.removeEventListener('touchend', mouseUp);
}

function mouseDown() {}
function mouseUp() {}
function mouseMove() {}
