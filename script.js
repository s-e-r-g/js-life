const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 10;
const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

let grid = createGrid(rows, cols);

// Initialize the grid with some pattern
initializeGrid(grid);

function createGrid(rows, cols) {
    let grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(0);
    }
    return grid;
}

function initializeGrid(grid) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = Math.random() > 0.8 ? 1 : 0;
        }
    }
}

function drawGrid(grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ctx.beginPath();
            ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.fillStyle = grid[i][j] ? 'black' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}

function updateGrid(grid) {
    let newGrid = createGrid(rows, cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let liveNeighbors = countLiveNeighbors(grid, i, j);
            if (grid[i][j] === 1) {
                newGrid[i][j] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
            } else {
                newGrid[i][j] = liveNeighbors === 3 ? 1 : 0;
            }
        }
    }
    return newGrid;
}

function countLiveNeighbors(grid, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let ni = x + i;
            let nj = y + j;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                count += grid[ni][nj];
            }
        }
    }
    return count;
}

function gameLoop() {
    drawGrid(grid);
    grid = updateGrid(grid);
//    requestAnimationFrame(gameLoop);
}

// Start the game loop
setInterval(gameLoop, 100);
//requestAnimationFrame(gameLoop);
