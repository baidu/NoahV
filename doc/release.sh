#!/bin/sh

FILE_NAME="noahv-doc"

CUR_DIR=$(cd `dirname $0`; pwd)

# prepare
if [ -d $CUR_DIR/output ]; then
    rm -rf $CUR_DIR/output
fi

if [ -d $CUR_DIR/noahv ]; then
    rm -rf $CUR_DIR/noahv
fi

if [ -f $CUR_DIR/dep.tar.gz ]; then
    if [ -d $CUR_DIR/node_modules ]; then
        rm -rf $CUR_DIR/node_modules
    fi
    mkdir -p $CUR_DIR/node_modules
    tar -zxvf $CUR_DIR/dep.tar.gz -C $CUR_DIR/node_modules

fi

echo "install node_modules"
npm install

# build
echo "npm build start"

node scripts/build.js


if [ $? -ne 0 ]; then
    echo "build failed!"
    exit 1;
fi
echo "npm build success"

# tar
# cd output
# tar -zcf $FILE_NAME.tar.gz *
# ls . | fgrep -v $FILE_NAME.tar.gz | xargs rm -rf

echo "build success"
exit 0;
