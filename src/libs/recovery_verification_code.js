const srpassword = require('secure-random-password');

const recovery_verification_code = function recovery_verification_code() {

        /**/

        //let min = 20;
        //let max = 40;
    
        //Return integer between min and max (min is inclusive, max is Exclusive)
        //const random_number = Math.floor(
        //    Math.random() * (max - min) + min
        //);
        //console.log(random_number);
    
        const random_string = srpassword.randomString({ 
            characters: [
                srpassword.lower, 
                srpassword.upper, 
                srpassword.digits, 
                /*srpassword.symbols*/
                /*{ characters: srpassword.symbols, exactly: 10 },*/
            ], /*length: 8*/ length: 20 });
        //console.log(random_password);
    
        /**/

        return random_string;

}

module.exports = {
    recovery_verification_code
}