# typescript 基础

## 类型

相比JavaScript，typescript拥有超级强大类型系统，包括但不限于：

- 基本类型：number、string、boolean、symbol、null、undefined、void
- 对象类型：object、array、tuple、enum、any、unknown、never
- 类型推断：自动推断类型
- 类型断言：手动指定类型
- 类型守卫：类型判断
- 类型别名：给类型起一个新名字
- 类型合并：多个类型合并成一个类型

## 基本类型

```ts
// 字符串类型
//普通声明
let a: string = '123'
//也可以使用es6的字符串模板
let str: string = `dddd${a}`

// 数字类型
let notANumber: number = NaN;//Nan
let num: number = 123;//普通数字
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制s

// 布尔类型
let booleand: boolean = true //可以直接使用布尔值
let booleand2: boolean = Boolean(1) //也可以通过函数返回布尔值
// let createdBoolean: boolean = new Boolean(1)//报错 new Boolean() 返回的是一个 Boolean 对象 
let createdBoolean: Boolean = new Boolean(1) //这样就是正确的了

// 空值类型
// 代表该函数返回值为空
function voidFn(): void {
    console.log('test void')
}
// 也可以将 undefined 和 null 赋值给 void
let u: void = undefined
let n: void = null;

// null 和 undefined 与 void 的区别是 undefined 和 null 是所有类型的子类型
let u: undefined = undefined;//定义undefined
let n: null = null;//定义null
// undefined null 类型的变量，可以赋值给 string 类型的变量 void不可以
// !!! 注意严格模式下  null 不能 赋予 void 类型 （undefined可以）
// tsconfig.json
{
    "compilerOptions":{
        "strict": true // 开启严格模式
    }
}
```

## 任意类型

typescript 又名 anyscript 😏
，所以它允许我们声明任意类型的变量，但是这并不是一个好的实践，因为这样会失去typescript的类型检查功能

```ts
// any
let anys: any = '123'
// 声明变量的时候没有指定任意类型默认为any
let anys2;
anys = 123
anys2 = true

// unkown 比 any 更加严格 只能作为父类型， any 可以作为父类型和子类型
// 也就是不能把 unkown 类型的值赋值给其他类型的变量
let unkown: unknown = '123'
// let str: string = unkown // 报错

// 只能够赋值给 unknow 类型 和 any 类型
let unkown2: unknown = unkown // 不报错
let anys3: any = unkown // 不报错

// any 类型在在对象没有这个属性时去获取不会有报错提示
let anys4: any = { name: '123' }
console.log(anys4.age) // undefined

// unkown 类型在对象没有这个属性时去获取会有报错提示
let unkown5: unknown = { name: '123' }
console.log(unkown5.age) // 会在此处提示“unkown5”的类型为“未知”，打印结果为 undefined
```

## 接口和对象类型

接口就是关键字 `interface` ,用来给对象定义类型

```ts
// 定义的对象各个属性必须与接口定义的属性、类型保持一致
interface Person {
    a:string,
    b:string,
    d?:string, //?修饰符可以出现该属性也可以没有该属性
    readonly e:string, // readonly 设置只读属性
    f:()=>void, // 我是一个函数属性，并且没有返回值
    [key: string]: any; // 索引签名也就是 任意属性 定义的属性必须是这里属性的子集 也就是 any 的子集
}
const person:Person  = {
    a:"213",
    // b:"别把我落下", //不能少哦
    c:"我是新来的",
    d:"我可有可无", 
    e:"我只能被读取不可被修改",
    f:()=>{console.log('我是一个没有返回值的函数')},
    g1: "我是任意属性来的",
    g2: 123,
}

// 遇到重名的 interface 会自动合并
interface Person {
    c:string
}
```

## 数组类型

使用 `[]` 来定义数组

```ts
//类型加中括号
let arr:number[] = [123]; //数字类型的数组
//这样会报错定义了数字类型出现字符串是不允许的
// let arr:number[] = [1,2,3,'1']
//操作方法添加非指定类型的也是不允许的
// arr.unshift('1')

var arr2: string[] = ["1", "2"]; //字符串类型的数组
var arr3: any[] = [1, "2", true]; //任意类型的数组

// 数组泛型
let arr4: Array<number> = [1, 2, 3]

// 接口表示数组 一般用来描述类数组 
interface NumberArray {
    //只要索引的类型是数字时，那么值的类型必须是数字
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

// 多维数组
let arr5: number[][] = [[1, 2], [3, 4]];

// arguments 数组
function Arr(...args:any): void {
    console.log(arguments) 
    //ts内置对象IArguments 定义
    let arr:IArguments = arguments //这里如果用 number[]会报错，arguments 是类数组不是真数组
}
Arr(111, 222, 333)
 
//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
[index: number]: any;
length: number;
callee: Function;
}

// any[]
let list: any[] = [1, true, "free", false];//就很爽回归到js了属于是
```

## 元组

元组类型（变异数组）允许表示一个已知元素数量和类型的数组，各元素的类型不必相同

```ts
let arr:[number,string] = [1,'string']
let arr2: readonly [number,boolean,string,undefined] = [1,
true,'sring',undefined]

// 当赋值或访问一个已知索引的元素时，会得到正确的类型
let arr: [number, string] = [1, 'string']
console.log(arr[0].length) // 类型“number”上不存在属性“length”
console.log(arr[1].length) //6

// 元组类型还可以支持自定义名称和变为可选的
let arr3:[x:number,y?:boolean] = [1]

// 越界元素 给上面 arr 添加没有声明的类型
arr.push(true) //类型“boolean”的参数不能赋给类型“string | number”的参数 可以看到变成了联合类型
```

## 函数扩展

```ts
// 参数传入时必须一致
//注意，参数不能多传，也不能少传 必须按照约定的类型来 
// ?可选参数 =默认值
const fn = (name: string, age:number=24,nb?:boolen,): string => {
    return name + age
}
fn('张三',18)

// 接口定义函数
interface Add {
    //定义参数 num 和 num2  ：后面定义返回值的类型
    (num:  number, num2: number): number
}
const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
fn(5, 5)
 
//  定义形参的类型
interface User{
    name: string;
    age: number;
}
function getUserInfo(user: User): User { //返回值也是 User定义的
  return user
}
console.log(getUserInfo({name:'天才',age:18}))

// 定义剩余参数
const fn = (array:number[],...items:any[]):any[] => {
       console.log(array,items)
       return items
}
let a:number[] = [1,2,3]
fn(a,'4','5','6')

// 函数重载 函数名字相同但参数变了，返回的类型可以相同也可以不同
// 定义两个函数重载签名
function good(name: string): string
function good(age: number): number
// 此处实现函数 
function good(param: string | number): any { // 返回值类型不同可以定义成 any
  if (typeof param === 'string') {
    return `hello ${param}`
  } else {
    return param
  }
}
console.log(good('天才'));
console.log(good(24));
```

## 联合类型|交叉类型|类型断言

### 联合类型

实际上在上面的例子里已经有了联合类型，这里写个别的例子

```ts
//例如我们的手机号通常是13XXXXXXX 为数字类型 这时候产品说需要支持座机
//所以我们就可以使用联合类型支持座机字符串
let myPhone: number | string  = '010-820' //可以接收纯数字也可以接受字符串
myPhone = 12345646
console.log(myPhone);
//当然了你给它赋值其他类型就会报错了
// myPhone = true //报错
```

### 交叉类型

交叉类型就是将多个类型合并成一个类型，使用 `&` 符号

```ts
// 定义两个接口
interface A {
    name: string;
}
interface B {
    age: number;
}
// 合并类型
const obj: A & B = {
    name: "张三",
    age: 18
}
```

### 类型断言

类型断言可以用来告诉编译器变量的实际类型，可以绕过编译器的类型检查，但是它不会真的改变变量的类型,滥用类型断言可能会导致运行时错误

```ts
// 类型断言有两种写法 (只能断言成联合类型中的一种)
let someValue: any = "this is a string";
//第一种方式
let strLength: number = (someValue as string).length; 
//第二种方式
let strLength2: number = (<string>someValue).length; 


// as const 断言字面量
// 普通类型  效果相同
const nb = '蜗牛'
nb='牛蛙'//无法修改

let bnb = '瓜牛' as const
bnb = '牛蛙' //无法修改

// 引用类型 数组
let a1 = [10, 20] as const;
const a2 = [10, 20];
a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针

// 对象
const obj = {
    name: '张三',
}
const obj2 = {...obj, age: 18} as const //这样 obj2 的类型就变成了 readonly {name: string, age: number}
console.log(obj2.name); //张三
// obj2.name = '李四' //无法为“name”赋值，因为它是只读属性
```

## 内置对象

- ECMAScript 的内置对象
Boolean、Number、string、RegExp、Date、Error
```ts
let b: Boolean = new Boolean(1)
console.log(b)
let n: Number = new Number(true)
console.log(n)
let s: String = new String('哔哩哔哩关注小满zs')
console.log(s)
let d: Date = new Date()
console.log(d)
let r: RegExp = /^1/
console.log(r)
let e: Error = new Error("error!")
console.log(e)
```

- DOM 和 BOM 的内置对象
Document、HTMLElement、Event、NodeList 等
```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {
});
//dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}
```

- 定义Promise
不指定返回类型 TS 是无法推断出来的，所以需要手动指定类型

```ts
function promise():Promise<number> {
  return new Promise<number>((resolve, reject) => {
    resolve(1)
  })
}
```

## class类

### 普通定义

```ts
class Person {
  name: string // 默认修饰符是 public 也就是可以自由访问
  age: number = 0 //在类中定义了不使用也会报错可以给个默认值来解决
  // private 修饰符 的变量只能在内部访问
  private sex: string
  //protected 修饰符 只能在内部和继承的子类中访问
  protected some: any
  // static 定义的不能用this访问 只能用类名访问
  static nb: string
  constructor(name: string, age: number, sex: string, some: any) {
    this.name = name,
      // this.age = age
      this.sex = sex
    this.some = some
    // this.nb=nb //static定义的
  }
  // 如果是两个 static 定义的函数互相可以通过this调用
  static fun() {
    return this.hh()
  }
  static hh() {
    return 'hh'
  }
}
class Man extends Person {
  constructor() {
    super('牢大', 24, '男', '牢大的some')
    console.log(this.some)
  }
  create() {
    console.log(this.some)
  }
}
let me = new Person('天才', 18, '男', '123')
let man = new Man()

console.log(me);
console.log(me.name);
// console.log(me.sex); //怪了虽然报错但仍然能打印出来
// console.log(me.nb)
console.log(Person.nb)// 只能用 Person来访问

console.log(man);
console.log(man.name);
// console.log(man.sex);
// console.log(man.some);
```

### 用 interface 定义类

interface 定义类 使用关键字 `implements` ,后面跟interface的名字多个用逗号隔开 继承还是用 `extends`



```ts
interface PersonClass {
    get(type: boolean): boolean
}
 
interface PersonClass2{
    set():void,
    asd:string
}
 
class A {
    name: string
    constructor() {
        this.name = "123"
    }
}
 
class Person extends A implements PersonClass,PersonClass2 {
    asd: string
    constructor() {
        super()
        this.asd = '123'
    }
    get(type:boolean) {
        return type
    }
    set () {
 
    }
}
```

### 抽象类

用 `abstract` 关键字,如果你写的类实例化之后毫无用处此时我可以把他定义为抽象类 额...

```ts
// 定义一个抽象类
abstract class Animal {
  // 抽象方法
  abstract makeSound(): void;

  // 具体方法
  move(): void {
    console.log("Moving...");
  }
}

// 定义一个继承自抽象类的子类
class Dog extends Animal {
  // 实现抽象方法 不实现会报错
  makeSound(): void {
    console.log("Bark");
  }
}

// 不能直接实例化抽象类
// const animal = new Animal(); // 错误: 无法创建抽象类的实例。

// 实例化子类
const dog = new Dog();

// 调用子类的方法
dog.makeSound(); // 输出: Bark
dog.move(); // 输出: Moving...
```

## 枚举类型

通过关键字 `enum` 定义枚举类

### 数字枚举

会自行默认从 0 开始增长

```ts
enum Types {
  a, b, c 
}
console.log(Types.a, Types.b, Types.c); // 0 1 2

enum Types {
  a, b = 3, c //如果设置了默认值 那么该值后面的会从改值自行增长
}
console.log(Types.a, Types.b, Types.c); // 0 3 4
```

### 字符串枚举

每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化

```ts
enum Types{
   Red = 'red',
   Green = 'green',
   BLue = 'blue'
}
```

### 异构枚举

混合字符串和数字

```ts
enum Types {
  NB = "NB",
  YES = 666,
}
```

### 接口枚举

遵循规则使用就行了，混合使用

```ts
enum Types {
  yyds,// 默认 0 自增
  fl = '佛了' // 字符串没有自增
}
interface A {
  red: Types.yyds
}

let obj: A = {
  red: Types.yyds // 和接口 A 保持类型一致
}

console.log(obj.red);// 0
```

### const 枚举

用 const 声明编译后会是个变量，普通枚举编译后会是个对象

```ts
const enum Types {
  NB = "NB",
  YES = 666,
}
```

### 反向映射

可以通过 key 读取 value，也可以通过 value 读取 key

```ts
enum Types {
  success // 默认值从 0 开始递增
}
let success: number = Types.success
let key = Types[success]
console.log(success);// 0
console.log(key);// success
```

## 类型推论

明了一个变量但是没有定义类型,TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论

```ts
// 申明不赋值 会推断成 any
let nb;

// 声明赋值没有类型 会根据值自己推断
let nb2 = 1;
let nb3 = '挺牛逼';
let nb4 = true;
let nb5 = [1, 2, 3];
let nb6 = { a: 1, b: 2 };
```

##  类型别名

就是给给定的类型起个别的名字

与 interface 的区别：
- interface 可以继承，type 只能通过 & 合并
- type 可以定义联合类型以及使用一些操作符，interface 不行
- interface 遇到重名会合并，type 不行

```ts
type nb = string | number | boolean
let a: nb = '123'
let b: nb = 123
let c: nb = true


// 左边值会作为右边类型的子集 属性由上到下
// 1. any unknow
// 2.Object
// 3.Number String Boolean
// 4.number string boolean
// 5. 1 'test' true
// 6.never
type a = 1 extends number ? 1 : 0 //1
type a = 1 extends Number ? 1 : 0 //1
type a = 1 extends Object ? 1 : 0 //1
type a = 1 extends any ? 1 : 0 //1
type a = 1 extends unknow ? 1 : 0 //1
type a = 1 extends never ? 1 : 0 //0
```

## never类型

表示的是那些永不存在的值的类型。例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

与 void 区别：
- void 本身不会出错只是没有返回值，never 会抛出异常也没有返回值
- never 是所有类型的子类型，可以赋值给任何类型，但是除了 never 本身
- 在联合类型中会被移除
```ts
// 鼠标悬浮在 A 可以看到 没有 never
type A = void | number | never

// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
    throw new Error(message);
}
 
// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
    while (true) {
    }
```

应用场景：

```ts
// 逻辑兜底
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case 'string':
      break;
    case 'number':
      break;
    case
      'boolean':
      break;
    default: // 进入这种情况时就抛出异常
      const exhaustiveCheck: never = message;
      throw new Error(`Unknown message type: ${exhaustiveCheck}`);
  }
}
```

## symbol类型

可以传递参做为唯一标识 只支持 string 和 number类型的参数 （ES6的详见js基本数据类型）

```ts
// 传入的都是 a 但并不是同一个
let a: symbol = Symbol('a')
let b: symbol = Symbol('a')
console.log(a === b); // false

// 如何让两个 symbol 相等
// 使用 symbol.for
let a: symbol = Symbol.for('a')
let b: symbol = Symbol.for('a')
console.log(a === b); // true

// 使用symbol定义的属性，是不能通过如下方式遍历拿到的
const symbol1: symbol = Symbol('110')
const symbol2: symbol = Symbol('119')
const obj1 = {
  [symbol1]: 'z张三',
  [symbol2]: '李四',
  age: 24,
  sex: '男'
}

// 1. for in 遍历
for (const key in obj1) {
  console.log(key) // 没有读取到 symbol 类型的key
  console.log('-----');
}
// 2. Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3. getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4. JSON.stringfy
console.log(JSON.stringify(obj1))

// 下面方法可以读取到
// 1. 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2. es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```

### Symbol.iterator

用法与生成器一样也有 `next` 方法

`Symbol.iterator` 是一个内置的 Symbol 值，它是遍历器生成函数，也称为迭代器接口。在 数组、set、map、函数的arguments伪数组、querySelectorAll获取的伪数组上，都存在这个 `Symbol.iterator`

这里用 `map` 和 `set` 来举例:

```ts
// 创建一个set和一个map
let set: Set<number> = new Set([1, 2, 3]);// set能够去重只支持数字和字符串
let map: Map<string, number> = new Map([['a', 1], ['b', 2]]);

// 可以这样使用
console.log(set[Symbol.iterator]().next());// {value: 1, done: false}
console.log(map[Symbol.iterator]().next());// {value: Array(2), done: false}

// 写一个方法来遍历 set
// 方便演示使用any类型
const each = (value: any) => {
  let syIt: any = value[Symbol.iterator]();// 获取值 不要忘了 iterator 要调用一下
  let next: any = { done: false } // 是否迭代完毕
  while (!next.done) { // 没有迭代完就一直循环 直到 done:true
    next = syIt.next() // 当前迭代状态赋值给写死next来进行下一轮的判断
    if (!next.done) {
      console.log(next.value)
    }
  }
}
each(set) // 1 2 3
each(map)// ['a', 1] ['b', 2]

// 实际上 for of 方法就是这样的运行逻辑 cool 我们竟然实现了for of
for (const item of set) {
  console.log(item)
}

for (const item of map) {
  console.log(item)
}
// 但是对象 无法使用 for of
interface Person {
  name: string,
  title: string
}
let obj: Person = { name: '我焯', title: '天才' }
for (const item of obj) { //类型“Person”必须具有返回迭代器的 "[Symbol.iterator]()" 方法
  console.log(item)
}
```

---


对象如何使用 for of 

```ts
// 事实上数组的解构也是调用了 iterator 
let [a,b,c] = [1,2,3]
console.log(a,b,c) // 1 2 3

let a =[4,5,6]
let a1 = [...a]
console.log(a1) // [4,5,6]

// 所以可以用这样的思维来写一个骚操作
// 手动实现对象使用 for of
let obj = {
  max: 5,
  current: 0,
  [Symbol.iterator]() { // 手动给对象搓一个不就好了
    return {
      max: this.max,
      current: this.current,
      next() { // 需要返回一个 next 方法 来进行下一次调用
        if (this.current == this.max) {
          return {
            value: '迭代结束了',
            done: true
          }
        } else {
          return {
            value: this.current++, // 进行下一次迭代
            done: false
          }
        }
      }
    }
  }
}
for (const item of obj) {
  console.log(item); // 0 1 2 3 4  迭代了5次
}
// 给这对象用一下数组的解构
let nb = [...obj] // [0, 1, 2, 3, 4] 牛逼哇我靠
console.log(nb);

// ！！！对象解构并不会调用 iterator 所以这里解构出来的就是对象本身
let nb2 = { ...obj }
console.log(nb2);//{max: 5, current: 0, Symbol(Symbol.iterator): ƒ}
// 如果猜的不错的话 对象的解构就是浅拷贝
```

## 泛型

灵活的动态类型

```ts
// T 来表示传入值的类型
function nb<T>(a: T, b: T):Array<T> {
  return [a,b]
}
nb(1, 2) // 传入数字也可以用
nb('哈哈', '牛逼') // 传入字符串也可以用

// type
type A<T> = string | number | T
let a: A<number> = 1;
let a2: A<string> = '天才'
let a3: A<boolean> = true
let a4: A<object> = { title: 'nb' }
let a5: A<number[]> = [1, 2, 3]
let a6: A<undefined> = undefined
console.log(a, a2, a3, a4, a5, a6);


// interface
interface Nb<T> {
  name: T,
  age: T
}

let nb: Nb<string> = {
  name: '哈哈',
  age: '12'
}
console.log(nb);

let nb2: Nb<number> = {
  name: 666,
  age: 999
}
console.log(nb2);

// 可以有多个泛型 也可以有默认值 举一反三
function nb2<T, K = number>(a: T, b: K): Array<T | K> {
  return [a, b]
}
console.log(nb2(1, '哈哈')); // [1, '哈哈'] ts自己做了类型推断没有使用默认值
console.log(nb2('哈哈', 1)); // ['哈哈', 1]
```

常用在接口返回值:

```ts
// 封装一个get方法
const axios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      let xml: XMLHttpRequest = new XMLHttpRequest;
      xml.open('GET', url);
      xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
          // 这里用了类型断言欺骗一下不然一直报错
          resolve({ name: '牛逼成了', age: 24, wc: '666' } as T) 
        } 
      }
      xml.send(null)
    })
  }
}
// 假如我们有两个已知的类型和其他未知的数量的返回值
interface Data {
  name: string,
  age: number,
  [val: string]: any, // 用索引签名解决未知的
}
axios.get<Data>('666').then(res => {
  console.log(res.age);
  console.log(res.name);
})
```

### 泛型约束

如名 就是拿来约束的

```ts
function sum<T>(a:T,b:T) {
  return a+b //运算符“+”不能应用于类型“T”和“T”
}
// 是为了防止出现这样的情况
sum(undefined,undefined)

// 使用泛型约束
// 
function sum<T extends number>(a: T, b: T) {
  return a + b  //正常了
}
sum(1, 2)
// sum(undefined,undefined) // 类型“undefined”的参数不能赋给类型“number”的参数
// sum('1', '3')// 类型“string”的参数不能赋给类型“number”的参数

// 结合 insterface
interface Len {
   length:number
}
function getLegnth<T extends Len>(arg:T) {
  return arg.length
}
getLegnth<string>('123')
// getLegnth<number>(123) // 类型“number”不满足约束“Len” 数字没有length属性
```

### keyof

keyof 是一个关键字，用于获取一个类型的所有公共属性名组成的联合类型。它的主要用途是帮助你编写更安全和更灵活的代码，特别是在处理对象属性和类型检查时

```ts
let obj = {
  name: '天才',
  age: 24
}
// keyof 会把对象的key推断成联合类型
type  key =keyof typeof obj; // type key = "name" | "age"


// 把 K 通过 keyof 和 T 联合 解决下面，类型“K”无法用于索引类型“T”
function nb<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
```

太困了明天研究