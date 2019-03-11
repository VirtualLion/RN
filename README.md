# 开发流程

## 一、初始化React Native项目

```sh
react-native init CustomProject
cd CustomProject
```

## 二、添加TypeScript

```sh
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
yarn add --dev @types/react @types/react-native
```

取消 `tsconfig.json` 文件中此行注释

```js
{
  ...
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
  ...
}
```

`rn-cli.config.js` 添加 `React Native TypeScript Transformer` 的设置

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  }
};
```

将 `App.js` 需改成 `App.tsx`

```diff
-import React, { Component } from 'react';
+import React from 'react'
+import { Component } from 'react';
```

## 三、添加TypeScript测试基础结构

```sh
yarn add --dev ts-jest
```

将 `package.json` 中的 `jest` 字段，替换成下面内容

```json
"jest": {
  "preset": "react-native",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "testPathIgnorePatterns": [
    "\\.snap$",
    "<rootDir>/node_modules/"
  ],
  "cacheDirectory": ".jest/cache"
}
```

安装类型声明依赖项

```sh
yarn add --dev @types/jest @types/react @types/react-native @types/react-test-renderer
```

对于Git源代码管理，需要忽略 `.jest` 文件夹，在 `.gitignore` 文件中添加条目即可。

```config
# Jest
#
.jest/
```

将 `.gitignore` 文件提交到版本控制。

```sh
git init
git add .gitignore # import to do this first, to ignore our files
git add .
git commit -am "Initial commit."
```

添加组件测试

```sh
yarn add --dev react-addons-test-utils
```

创建测试文件，在对应目录添加 `__tests__` 文件夹，并添加与被测试组件相同名称 `.tsx` 测试文件，示例代码如下

```js
// components/__tests__/Hello.tsx
import React from 'react'
import renderer from 'react-test-renderer'

import { Hello } from "../Hello"

it("renders correctly with defaults", () => {
  const button = renderer.create(<Hello name="World" enthusiasmLevel={1} />).toJSON()
  expect(button).toMatchSnapshot()
})
```

第一次运行测试时，它将创建渲染组件的快照并将其存储在 `components/__tests__/__snapshots__/Hello.tsx.snap` 文件中。
当您修改组件时，您将需要更新快照，并检查更新是否有意更改。
您可以 [在此处](https://facebook.github.io/jest/docs/en/tutorial-react-native.html)阅读有关测试React Native组件的更多信息。

## 四、进一步配置

在项目根目录创建 `src` 文件夹，作为以后开发目录。
在 `src` 目录下：
创建 `img` 文件夹，用于存储图片资源；
创建 `redux` 文件夹，作为单向数据流目录；
创建 `navigator` 作为导航路由目录；
创建 `pages` 文件夹，并添加 `components` 组件目录和 `containers` 容器目录，来存放自定义的组件和页面。

接下来是一些现成的配置文件：

`package.json`

```json
{
  "name": "Community",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest",
    "tsc": "tsc",
    "ios": "react-native run-ios && tsc -w",
    "android": "react-native run-android && tsc -w",
    "clean": "rm -rf build && rimraf artifacts",
    "build": "npm run clean && npm run tsc --",
    "lint": "tslint src/**/*.ts"
  },
  "dependencies": {
    "@types/node": "^10.12.10",
    "antd-mobile-rn": "^2.3.1",
    "react": "16.6.1",
    "react-native": "0.57.6",
    "react-native-gesture-handler": "^1.0.9",
    "react-native-maps": "^0.22.1",
    "react-navigation": "^3.0.1",
    "react-redux": "^5.1.1",
    "redux": "^4.0.1",
    "redux-persist": "^5.10.0",
    "redux-thunk": "^2.3.0",
    "ts-import-plugin": "^1.5.5",
    "tslib": "^1.9.3"
  },
  "devDependencies": {
    "babel-jest": "23.6.0",
    "babel-plugin-import": "^1.11.0",
    "jest": "23.6.0",
    "metro-react-native-babel-preset": "0.49.2",
    "react-test-renderer": "16.6.1"
  },
  "jest": {
    "preset": "react-native"
  }
}
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "jsx": "react",
    "outDir": "build",
    "rootDir": "src",
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": false,
    "preserveConstEnums": true,
    "allowJs": false,
    "sourceMap": true,
    "noImplicitReturns": true,
    "noUnusedParameters": true,
    "noUnusedLocals": true,
    "typeRoots": ["node_modules/@types"],
  },
  "filesGlob": [
      "typings/**/*.d.ts",
      "src/**/*.ts",
      "src/**/*.tsx",
      "node_modules/**/**/*.d.ts",
      "node_modules/**/*.d.ts"
  ],
  "types": [
    "react",
    "react-native",
    "jest"
  ],
  "exclude": [
    "android",
    "ios",
    "build",
    "node_modules"
  ],
  "compileOnSave": false
}
```

## 五、添加其他三方依赖

1. `Redux`
[RN中的redux的集成](https://www.jianshu.com/p/dc5f57d6a551)
[React Native Typescript Redux快速搭建](https://www.jianshu.com/p/a72e1e835577)

```sh
yarn add redux
yarn add react-redux
yarn add redux-persist
yarn add redux-thunk
```

`redux-persist` 本地持久化 
`redux-thunk` 异步
然后再安装TypeScript类型声明依赖

```sh
yarn add --dev @types/redux @types/react-redux @types/redux-persist @types/redux-thunk
```

2. `Navigation`
[React Navigation](https://reactnavigation.org/zh-Hans/)

```sh
yarn add react-navigation
yarn add react-native-gesture-handler
react-native link
```

然后再安装TypeScript类型声明依赖

```sh
yarn add --dev @types/react-navigation
```

3. `AntD`
[Ant Design Mobile RN of React](https://rn.mobile.ant.design/docs/react/introduce-cn)

```sh
yarn add @ant-design/react-native
react-native link @ant-design/icons-react-native
```


# 遇到的坑

Ant Design Mobile RN of React组件

3.0.5 tab-bar组件不能正常工作的bug

`./node_modules/@ant-design/react-native/lib/tab-bar/index.js`第73行修改为：

```js
...
{ key: idx, style: [styles.contentItem, idx === selectedIndex ? styles.contentItemSelected : {opacity:0}] },
...
```

`./node_modules/@ant-design/react-native/lib/tab-bar/style/index.js`第49行修改为：

```js
...
height: '100%'
...
```


网络请求封装

'Promise' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the `lib` compiler option to es2015 or later.

`tsconfig.json`里添加字段:

```json
"lib": [
  "es6"
],
```