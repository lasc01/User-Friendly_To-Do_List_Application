// cut from app.js to generate date

module.exports = getDate;

function getDate(){
    const options = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',  
        year: 'numeric'
    }

    const today  = new Date();
    
    const day = today.toLocaleDateString("en-US", options);

    return day;

}
 