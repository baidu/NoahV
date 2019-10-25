/* eslint-disable */
var path = require('path')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
    options = options || {}

    var cssLoader = { 
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders (loader, loaderOptions) { 
        var loaders = [cssLoader]
        if (loader) { 
          loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, loaderOptions, { 
                sourceMap: options.sourceMap
            })
          })
        }
        if (options.extract) { 
          return ExtractTextPlugin.extract({  
            use: loaders,  
            fallback: 'vue-style-loader' 
          })
        } else {
          return ['vue-style-loader'].concat(loaders)
        }
    }
    return {  
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }

}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    var output = []
    var loaders = exports.cssLoaders(options)

    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        })
    }
    return output
}