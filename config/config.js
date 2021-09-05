const config = {
    production: {        
        SMTP_USER: 'oladipupooladokun@gmail.com',
        SMTP_PASS: 'wrjtbtiwhnzloiuf',
        PORT: '5500'
    },
    default: {
        SMTP_USER: process.env.SERVER_USER,
        SMTP_PASS: process.env.SERVER_PASS,
        PORT: process.env.PORT
    }
}


exports.get = function get(env) {
    return config[env] || config.default
}
