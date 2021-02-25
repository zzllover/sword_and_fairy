import React from 'react';

// type MyComponentProps = { title: string };

// function MyComponentFC(props: MyComponentProps) { };

// const MyComponent: React.FC<MyComponentProps> = (props) => { props };

// ===begin
// ===== 使用函数表达式定义的主键可以直接默认导出 =====
// const MyComponent = () => { };
// export default MyComponent;

// export default function MyComponent() { }; 
// ===end

// ===begin 使用范型

// type MyDropDownProps<T> = {
//   items: T[];
//   itemsToString(item: T): string;
//   onSelected(item: T): void;
// }

//const MyDropDown: React.FC<MyDropDownProps<T>> = () => { }; // can't do

// export default function MyDropDown<T>(props: MyDropDownProps<T>) { };

// ===end

// ===begin children

// type MyComponentProps = { className: string };

// function MyComponent(props: MyComponentProps) {
//   // 无 children类型
//   return <div>{ props.children}</div>
// }

// 使用FC可以默认带进 children
// const MyComponent: React.FC<MyComponentProps> = (props) => {
//   return <div>{props.children}</div>
// }

// const myValue = <MyComponent className="asd">asd</MyComponent>;

// function MyComponent(props: MyComponentProps) { };
// const myValue = <MyComponent className="asd">asd</MyComponent>;// 达到预期， 因为本来也未定义children

// ===end

// ===begin 不使用React.FC 也想带入children？

// 1. 手动带入
// type MyComponentProps = {
//   title: string;
//   // ReactNode is all allowed children types including arrays, fragments, scalar values, etc.
//   children: React.ReactNode;
// }

// 
// export default function MyComponent({ title, children }: MyComponentProps) { };

// 2. PropsWithChildren
// type MyComponentProps = React.PropsWithChildren<{ title: string }>;
// export default function MyComponent({ title, children }: MyComponentProps) { };

// ===end

