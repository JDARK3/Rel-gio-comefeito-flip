// Função para atualizar um segmento do display
function updateSegment(segmentElement, value) {
    // Seleciona os elementos dentro do segmento que serão atualizados
    const segmentDisplayTop = segmentElement.querySelector('.segment-display__top');
    const segmentDisplayBottom = segmentElement.querySelector('.segment-display__bottom');
    const segmentOverlay = segmentElement.querySelector('.segment-overlay');
    const segmentOverlayTop = segmentOverlay.querySelector('.segment-overlay__top');
    const segmentOverlayBottom = segmentOverlay.querySelector('.segment-overlay__bottom');

    // Se o valor atual do display já for o valor desejado, não faça nada
    if (segmentDisplayTop.textContent === value) return;

    // Adiciona a classe 'flip' para iniciar a animação de transição
    segmentOverlay.classList.add('flip');

    // Atualiza os valores de display superior e inferior
    segmentDisplayTop.textContent = value;
    segmentOverlayBottom.textContent = value;

    // Função que termina a animação e remove a classe 'flip'
    function finishAnimation() {
        segmentOverlay.classList.remove('flip');
        segmentDisplayBottom.textContent = value;
        segmentOverlayTop.textContent = value;
        // Remove o ouvinte de evento para evitar múltiplas chamadas
        segmentOverlay.removeEventListener('animationend', finishAnimation);
    }

    // Adiciona um ouvinte de evento para a animação terminar e então executar a função finishAnimation
    segmentOverlay.addEventListener('animationend', finishAnimation);
}

// Função para atualizar o relógio com a hora atual
function updateClock() {
    const now = new Date(); // Cria um objeto Date com a hora atual
    const hours = now.getHours().toString().padStart(2, '0'); // Obtém as horas e garante que tenham dois dígitos
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Obtém os minutos e garante que tenham dois dígitos
    const seconds = now.getSeconds().toString().padStart(2, '0'); // Obtém os segundos e garante que tenham dois dígitos

    // Atualiza cada seção do relógio (horas, minutos, segundos) com os valores formatados
    updateTimeSection('hours', hours);
    updateTimeSection('minutes', minutes);
    updateTimeSection('seconds', seconds);
}

// Função para atualizar uma seção específica do relógio
function updateTimeSection(sectionID, timeValue) {
    const sectionElement = document.getElementById(sectionID); // Seleciona o elemento da seção pelo ID
    const [firstDigit, secondDigit] = timeValue.split(''); // Divide o valor em dois dígitos

    const timeSegments = sectionElement.querySelectorAll('.time-segment'); // Seleciona todos os segmentos de tempo na seção
    updateSegment(timeSegments[0], firstDigit); // Atualiza o primeiro segmento com o primeiro dígito
    updateSegment(timeSegments[1], secondDigit); // Atualiza o segundo segmento com o segundo dígito
}

// Atualiza o relógio a cada segundo (1000 milissegundos)
setInterval(updateClock, 1000);

// Atualiza o relógio imediatamente quando a página é carregada
updateClock();
