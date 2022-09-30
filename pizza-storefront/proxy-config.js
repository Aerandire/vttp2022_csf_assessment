module.exports = [
    {
        context: [ '/api/**' ], //match this request
        target: 'http://localhost:8080', //Springboot
        secure: false
    }
]