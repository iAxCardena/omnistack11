const generateUniqueId = require('../utils/generateUniqueId');   
const connection = require('../database/connection');

module.exports = {
    async index(request, response)  {
        const ongs = await connection('ongs').select('*');  //realiza a busca de todas as ONGs cadastradas 
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();   //chama uma funcao que gera 4 bytes de caracteres hexadecimais para o id da ong
        
        await connection('ongs').insert({   //como a insercao pode demorar, o await (junto com asynt na definicao da funcao) faz com que espere o termino da execucao da insercao para depois continuar
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });  //retorna uma resposta no formato json ao acessar
            
    }
}