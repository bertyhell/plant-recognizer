enum ActiveScreen {
	HOME = 'HOME',
	MENU = 'MENU',
	SET_DETECTION_AREA = 'SET_DETECTION_AREA',
}

let activeScreen: ActiveScreen = ActiveScreen.HOME;
let menuElem: HTMLDivElement | null;

export function initMenu() {
	menuElem = document.querySelector('.c-menu');
	document.querySelector('#hamburger')?.addEventListener('click', () => setActiveScreen(ActiveScreen.MENU));
	document.querySelector('#hamburgerClose')?.addEventListener('click', () => setActiveScreen(ActiveScreen.HOME));
	document.querySelector('#calibratePlants')?.addEventListener('click', calibratePlants);
	document.querySelector('#setDetectionArea')?.addEventListener('click', () => setActiveScreen(ActiveScreen.SET_DETECTION_AREA));
}

export function setActiveScreen(newActiveScreen: ActiveScreen) {
	activeScreen = newActiveScreen;
	if (activeScreen === ActiveScreen.HOME) {
		Object.values(ActiveScreen).forEach((screen) => {
			menuElem?.classList.remove('c-menu__active-screen--' + screen);
		});
	}
	menuElem?.classList.remove('c-menu__active-screen--' + newActiveScreen);

	if (newActiveScreen === ActiveScreen.SET_DETECTION_AREA) {
		initSetDetectionAreaScreen();
	}
}

export function calibratePlants() {
	console.log('calibratePlants');
}
