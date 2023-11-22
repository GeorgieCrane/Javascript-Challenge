const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

function drawLine(start, end, style) {
  ctx.beginPath();
  ctx.strokeStyle = style || 'black';
  ctx.moveTo(...start);
  ctx.lineTo(...end);
  ctx.stroke();
}

function drawTriangle(apex1, apex2, apex3) {
  ctx.beginPath();
  ctx.moveTo(...apex1);
  ctx.lineTo(...apex2);
  ctx.lineTo(...apex3);
  ctx.fill();
}

function spinSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.style.animation = 'spin 1s linear infinite';
}

function stopSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.style.animation = 'none';
}

async function drawStockChart() {
  // Start spinning the spinner
  spinSpinner();

  try {
    // Fetch the list of available stocks
    const stocksResponse = await fetch('/stocks');
    const stockSymbols = await stocksResponse.json();

    console.log('Available stocks:', stockSymbols);

    // Fetch data for each stock
    for (const symbol of stockSymbols) {
      console.log('Current symbol:', symbol);
      const stockDataResponse = await fetch(`/stocks/${symbol}`);
      const stockData = await stockDataResponse.json();
      console.log(`Stock data for ${symbol}:`, stockData);
    }

    // Hide the spinner after all data is loaded
    stopSpinner();

  } catch (error) {
    console.error('Failed to fetch stock symbols or data:', error.message);

    // Stop spinning the spinner if there is an error
    stopSpinner();
  }
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])
