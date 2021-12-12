# @sunday9787/load-script

> 异步加载script

## Install

Using npm:

```sh
npm install @sunday9787/load-script --save
```

or using yarn:

```sh
yarn add @sunday9787/load-script --dev
```

## example

```js
var loadScript = new LoadScript()
loadScript.load('./js/moduleA.js').then(() => {
  fnA('A js 已加载完毕')
})

loadScript.load('./js/moduleB.js').then(() => {
  fnA('B js 已加载完毕')
})
```
