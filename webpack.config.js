module.exports ={
    entry: './app/index.js',
    output: {
        path: __dirname + '/api/public',
        filename: 'chat.js'
    },
    mode: 'development',
    module: {
        rules:[
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }	
}