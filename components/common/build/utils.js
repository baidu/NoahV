const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.cssLoaders = function (options) {
    options = options || {};

    var cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader];
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }
        if (options.extract) {
            return [MiniCssExtractPlugin.loader].concat(loaders);
        }
        else {
            return ['vue-style-loader'].concat(loaders);
        }
    }
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {indentedSyntax: true}),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    };
};
// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    var output = [];
    var loaders = exports.cssLoaders(options);

    for (var extension in loaders) {
        var loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        });
    }
    return output;
};
