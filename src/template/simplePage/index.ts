export default 
`
import React, { memo, useState, useEffect } from 'react'

interface AppProps { // 采用如下属性标注方式,会在父组件传值时，有文案提示
  /** 属性一 */ 
  propsOne: string
  /** 属性二 */
  propsTwo: boolean
}

const App: React.FC<AppProps> = (props) => {
  const { propsOne, propsTwo } = props // 在这里将属性从props 中解构出来

  const [ state, setState ] = useState<boolean>(false) // 这里是页面状态

  useEffect(() => {
    // useEffect在组件初始化或依赖更新时执行
    // 依赖可以有多个，但主要注意的是，当依赖中有state时，不要在useEffct中再写该状态的set操作，会造成死循环111

  }, [propsOne, propsTwo, state])
  return (
    <>
      <p>这是一个React最简单结构页面</p>
    </>
  )
}

export default memo(App)
`;