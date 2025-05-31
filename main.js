const apiKey = '34a9e1cc8a43ef8f9797616f';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

async function getExchangeRate(daMoeda,paraMoeda) {
    try{
        const response = await fetch(`${apiURL}${daMoeda}`);
        const data = await response.json();

        if(data.result === 'success'){
            return data.conversion_rates[paraMoeda];
        } else {
            throw new Error('Erro ao buscar as taxas de câmbio');
        }
    } catch(error){
        console.error("Error", error);
        return null;
    } 
}

document.getElementById('currency-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const valor = document.getElementById('amount').value;
    const daMoeda = document.getElementById('daMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;

    // buscar taxa de cambio da api
    const exchangeRate = await getExchangeRate(daMoeda,paraMoeda);
    if(exchangeRate){
        const valorConvertido = valor * exchangeRate;

        const conversao = document.getElementById('conversao');
        conversao.textContent = `Resultado: ${valorConvertido.toFixed(2)} ${paraMoeda}`;

    } else{
        alert('Erro ao buscar cotação. Tente novamente');
    }
})