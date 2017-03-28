var webpack = require('webpack');

module.exports = {
	entry:{
		index:'./src/js/index.js',
		hotel:'./src/js/hotel.js',
		detail:'./src/js/detail.js',
		finished:'./src/js/finished.js',
		order:'./src/js/order.js'
	},
	output:{
		path:'dist/js',
		filename:'[name].js'
	},
	module:{
		loaders:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['es2015']}
            },

        ]
	}
}