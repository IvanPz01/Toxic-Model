const text = document.getElementById('text');
const button = document.getElementById('analyze');
const predictions = document.getElementById('predictions');

const threshold = 0.5;

async function toxicidad(texto) {
    const model = await toxicity.load(threshold);
    const predictions = await model.classify(texto);
    console.log(predictions);
    return predictions;
}

button.addEventListener('click', async () => {
    const texto = text.value;
    const predicciones = await toxicidad(texto);

    let sumProbabilities = 0;
    let html = '';

    predicciones.forEach((prediction) => {
        sumProbabilities += prediction.results[0].probabilities[1];
        html += `<div>${prediction.label}: ${prediction.results[0].probabilities[1]}</div>`;
    });

    const averageProbability = sumProbabilities / predicciones.length;
    const isToxic = averageProbability >= 0.09;

    const cardHtml = `
        <div class="card mt-3">
            <div class="card-body">
                ${html}
                <div class="p-2 ${isToxic ? 'bg-success' : 'bg-danger'} text-white ">Texto Tóxico: ${isToxic ? 'Verdadero' : 'Falso'}</div>
            </div>
        </div>
    `;

    predictions.innerHTML = cardHtml;
});