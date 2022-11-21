document.addEventListener('DOMContentLoaded', () => {
	createBoard(16);
	canDraw();
});

let draw = false;
let colour = '#000';
const btnBlack = document.querySelector('.btn-black');
const btnRainbow = document.querySelector('.btn-rainbow');
const btnErase = document.querySelector('.btn-erase');
const btnClear = document.querySelector('.btn-clear');
const btnSetSize = document.querySelector('.btn-set-size');

const createBoard = (size) => {
	removeCells();
	let board = document.querySelector('.board');
	board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	let numCells = size * size;

	for (let i = 0; i < numCells; i++) {
		let cell = document.createElement('div');
		cell.classList.add('cell');
		cell.addEventListener('mouseover', drawCell);
		board.insertAdjacentElement('beforeend', cell);
	}
};

const getSize = () => {
	let size = prompt('Enter cell size (2 - 100)');

	if (size === '') {
		alert('Cell size cannot be blank.');
		getSize();
	} else if (size <= 1 || size > 100) {
		alert('Size needs to be between 2 and 100');
		getSize();
	} else {
		return size;
	}
};

const removeCells = () => {
	const cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		cell.remove();
	});
};

const clearCells = () => {
	const cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		cell.style.backgroundColor = '#eee';
	});
};

function drawCell() {
	if (draw) {
		if (colour === 'rainbow') {
			this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
		} else if (colour === 'erase') {
			this.style.backgroundColor = '#eee';
		} else {
			this.style.backgroundColor = colour;
		}
	}

	this.addEventListener('click', () => {
		if (!draw) {
			if (colour === 'rainbow') {
				this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
			} else if (colour === 'erase') {
				this.style.backgroundColor = '#eee';
			} else {
				this.style.backgroundColor = colour;
			}
		}
	});
}

const canDraw = () => {
	document.addEventListener('click', (e) => {
		if (e.target.nodeName != 'BUTTON') {
			draw = !draw;
		}
	});
};

// Event Listeners
btnBlack.addEventListener('click', () => {
	colour = '#000';
});

btnRainbow.addEventListener('click', () => {
	colour = 'rainbow';
});

btnErase.addEventListener('click', () => {
	colour = 'erase';
});

btnClear.addEventListener('click', clearCells);

btnSetSize.addEventListener('click', () => {
	draw = false;
	let size = getSize();
	createBoard(size);
});
