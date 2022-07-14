export default 
`
import React, { memo, useState, useEffect } from 'react'
import { Modal } from 'antd'

interface ModalPageProps { // 采用如下属性标注方式,会在父组件传值时，有文案提示
  /** 弹窗显示/隐藏 */ 
  visible: boolean
  /** 点击确认后的回调 */
  onOk?: any
  /** 点击取消后的回调 */
  onCancel?: any
}

const ModalPage: React.FC<ModalPageProps> = (props) => {
  const { visible, onOk, onCancel } = props // 在这里将属性从props 中解构出来

  // 这里是页面状态
  const [ state, setState ] = useState<boolean>(false) // 一些页面状态，不需要可不写

  // 确认按钮
  const okHandle = async () => {
    // TODO 可以在这里做一些组件内部的事，再调用回调
    onOk()
  }

  // 取消按钮
  const cancelHandle = async () => {
    // TODO 可以在这里做一些组件内部的事，再调用回调
    onCancel()
  }

  useEffect(() => {
    // useEffect在组件初始化或visible变化时执行

  }, [visible])
  return (
    <Modal
      title="弹窗标题"
      visible={visible}
      onOk={okHandle}
      onCancel={cancelHandle}
      width={800}
    >
      <p>弹窗内容...</p>
    </Modal>
  )
}

export default memo(ModalPage)
`;