## Build Setup

``` bash
node -v （版本8.7.0以上）

npm install yarn -g

yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

yarn install

// 开发
npm start

//打包
npm run build

//打包开发环境
npm run build:develop

//打包测试环境
npm run build:test

//打包(mock)
npm run build:mock
```