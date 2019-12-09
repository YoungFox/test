const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const glob = require('glob');
const feaEntry = require('fea-entry');
let entry = feaEntry('./src/', ['lib', 'components', 'conf']);

console.log(entry)
let config = {
  entry,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {   // 抽离第三方插件
          test: /node_modules/,   // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor',  // 打包后的文件名，任意命名    
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        }
      }
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Caching'
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.ProvidePlugin({
      join: ['lodash', 'join']
    })
  ],
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}


//获取指定类型所有views文件
let getEntry = (globPath = 'pages/') => {
  let files = glob.sync(globPath + '**/*.html');
  let pages = {},
    page, dirname, entryName, basename, pathname, extname;

  for (let i = 0; i < files.length; i++) {
    page = files[i];
    dirname = path.dirname(page);
    extname = path.extname(page);
    basename = path.basename(page, extname);
    entryName = path.join(dirname.replace(/pages\/?/, ''), basename);
    pages[entryName] = [path.join('./', page)];
  }
  return pages;
}
let pages = Object.keys(getEntry());
// console.log(getEntry('dev/views/'));
// console.log(pages)

pages.forEach((entryName) => {
  // console.log(path.resolve('dev/views/',entryName+'.html'));
  let conf = {
    // filename: path.join('../views/', entryName + '.html'), //生成的html存放路径，相对于path
    filename: entryName + '.html',
    template: path.resolve('pages/', entryName + '.html'), //html模板路径
    // inject: true, //js插入的位置，true/'head'/'body'/false
    chunks: ['vendor'], //默认引用模块
    // hash: true
    /*
     * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
     * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
     * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
     * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
     */
    // minify: { //压缩HTML文件
    //     removeComments: true, //移除HTML中的注释
    //     collapseWhitespace: false //删除空白符与换行符
    // }
  };
  if (entryName in config.entry) {
    // conf.favicon = 'src/imgs/favicon.ico';
    conf.chunks = ['vendor', entryName];
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
});



module.exports = config