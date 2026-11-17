import { useState, useEffect } from 'react'

export default function FunctionComponent() {
    return (
     <Counter />
    )
}



function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('count 发生变化:', count)
  })

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}