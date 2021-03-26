import React, { useEffect, useState } from 'react';

// 1. 每次渲染都具有自己的 props 和 states
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You Click {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// 2. 每次

type MyUseEffectComponentProps = {
  num: number
}

export function MyUseEffectComponent(props: MyUseEffectComponentProps) {
  useEffect(() => {
    console.log(props.num)
    return () => {
      // effect的清除，并不会读取最新的props，只能读取定义他的那次渲染的props
      console.log(props.num)
    }
  })
  return <div>Effect Clean</div>
}