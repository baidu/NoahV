#!/bin/sh

FILE_NAME="noahv"

CUR_DIR=$(cd `dirname $0`; pwd)

# prepare
if [ -d $CUR_DIR/output ]; then
    rm -rf $CUR_DIR/output
fi

if [ -d $CUR_DIR/noahv ]; then
    rm -rf $CUR_DIR/noahv
fi

echo "install node_module"
npm install

# build
echo "npm build start"

node scripts/build.js

if [ $? -ne 0 ]; then
    echo "build failed!"
    exit 1;
fi
echo "npm build success"

mv noahv output

# tar
cd output
tar -zcf $FILE_NAME.tar.gz *
ls . | fgrep -v $FILE_NAME.tar.gz | xargs rm -rf

echo "build success"
exit 0;
