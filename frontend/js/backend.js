let videoElement = document.getElementById('stream');  // Elemento de imagem com o feed da câmera
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

// Função para capturar um frame do feed de vídeo
function captureFrame() {
    // Ajusta o tamanho do canvas para a imagem
    canvas.width = videoElement.naturalWidth;
    canvas.height = videoElement.naturalHeight;
    
    // Desenha a imagem do feed da câmera no canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Converte a imagem para base64
    let imageData = canvas.toDataURL('image/jpeg');  // Pode ser outro formato se necessário

    // Envia o frame para o backend
    fetch('/process_video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData })  // Envia o frame como base64
    })
    .then(response => response.json())
    .then(data => {
        // Processamento da resposta do backend, como mostrar os pontos-chave
        console.log(data);
        drawKeypoints(data.keypoints);  // Função para desenhar os pontos-chave
    })
    .catch(error => console.error('Erro ao enviar o frame:', error));
}

// Captura a cada intervalo (por exemplo, a cada 500 ms)
setInterval(captureFrame, 500);  // Ajuste o intervalo conforme necessário

// Função para desenhar os pontos-chave
function drawKeypoints(keypoints) {
    // Limpa o canvas antes de desenhar novamente
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha os pontos-chave no canvas
    keypoints.forEach(keypoint => {
        if (keypoint[2] > 0.1) {  // Verifica se o ponto é visível (confiança maior que 0.1)
            ctx.beginPath();
            ctx.arc(keypoint[0], keypoint[1], 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    });
}
