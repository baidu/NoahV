#!/bin/sh

FILE_NAME="noahv"

CUR_DIR=$(cd `dirname $0`; pwd)

# prepare

if [ -d $CUR_DIR/template/common/noahv ]; then
    rm -rf $CUR_DIR/template/common/noahv
fi

cd $CUR_DIR/template/common

echo "install node_module"
npm install

# build
echo "start build common project"

node scripts/build.js

if [ $? -ne 0 ]; then
    echo "common project build failed!"
    exit 1;
fi

echo "common project build success"



# prepare

if [ -d $CUR_DIR/template/dashboard/noahv ]; then
    rm -rf $CUR_DIR/template/dashboard/noahv
fi

cd $CUR_DIR/template/dashboard

echo "install node_module"
npm install

# build
echo "start build dashboard project"

node scripts/build.js

if [ $? -ne 0 ]; then
    echo "dashboard project build failed!"
    exit 1;
fi

echo "dashboard project build success"

# test:coverage
cd $CUR_DIR/components/common

echo "install node_module for common components"

npm install

# build
npm run test:coverage

echo "common components tested"

cd $CUR_DIR/components/visual

echo "install node_module for visual components"

npm install

# build
npm run test:coverage

echo "visual components tested"
