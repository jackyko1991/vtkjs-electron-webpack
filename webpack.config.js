var path = require('path');
var webpack = require('webpack');

var entry = path.join(__dirname, './src/app.js');
const sourcePath = path.join(__dirname, './src');

module.exports = (env) =>  {
  const isProduction = env==='production';
  console.log('env='+env);

  return{
    entry: entry,
    // target: 'electron-renderer', //not sure if this line needs to remain
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
          { test: entry, loader: "expose-loader?bundle" },
          { test: /\.html$/, loader: 'html-loader' },
          {
            loader: 'babel-loader',
            test: /\.js(x)?$/,
            exclude: /node_modules/
          },
          {
            test: /\.glsl$/i,
            include: /node_modules(\/|\\)vtk\.js(\/|\\)/,
            loader: 'shader-loader',
          },
          {
            test: /\.js$/,
            include: /node_modules(\/|\\)vtk\.js(\/|\\)/,
            loader: 'babel-loader',
          },
          {
            test: /\.worker\.js$/,
            include: /node_modules(\/|\\)vtk\.js(\/|\\)/,
            use: [
            {
              loader: 'worker-loader',
              options: { inline: true, fallback: false },
            },
            ],
          },
      ],
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath,
      ],
    },
    devtool: isProduction ? 'source-map':'inline-source-map',
    devServer:{
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback:true,
      publicPath:'/dist/'
    }
  }
};