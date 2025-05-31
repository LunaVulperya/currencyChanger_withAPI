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
    } catch{

    } 
}