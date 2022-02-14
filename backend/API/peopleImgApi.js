const axios = require('axios');

exports.getPersonImg = async() => {
    try{     
       const imgJson=await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.API_PEOPLE_KEY}&collections=VFPYMQVoptA`);
       return imgJson.data.urls.regular;
    }
    catch(err){
        throw "picture not available";
    }
        
    
}



