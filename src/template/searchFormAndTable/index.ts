export default 
`
import React, { memo, useState, useEffect } from 'react'
import { Form, Table, Row, Col, Input, Button, message } from 'antd'

const getData = async (params: any) => { // mock方法，实际开发请删除
  console.log('🚀接口请求,请求参数为:', params)
  return {
    code: 0,
    data: [],
    total: 0,
    msg: '请求成功'
  }
}

interface AppProps { // 采用如下属性标注方式,会在父组件传值时，有文案提示
  /** 属性一 */ 
  propsOne?: string
  /** 属性二 */
  propsTwo?: boolean
}

const FormItem = Form.Item

const App: React.FC<AppProps> = (props) => {
  const { propsOne, propsTwo } = props // 在这里将属性从props 中解构出来

  const [form] = Form.useForm() // Form实例，可多次定义

  // 这里是页面状态
  const [ loading, setLoading ] = useState<boolean>(false); // 表格loading状态
  const [ data, setData ] = useState<any[]>([]); // 表格数据
  const [ total, setTotal ] = useState<number>(0); // 数据总数
  const [ searchData, setSearchData ] = useState<any>({
    pageNum: 1,
    pageSize: 10,
  }); // 查询条件


  const columns: any = [
    {
      title: '订单号',
      dataIndex: 'id',
      align: 'center',
      width: '150',
    },
    {
      title: '提现金额(元)',
      dataIndex: 'amount',
      align: 'center',
      width: '150',
    },
    {
      title: '银行账户开户行',
      dataIndex: 'bankCardName',
      align: 'center',
      width: '150',
    },
    {
      title: '银行账户号',
      dataIndex: 'bankCardNo',
      align: 'center',
      width: '150',
    },
    {
      title: '订单创建时间',
      dataIndex: 'createTime',
      align: 'center',
      width: '150',
    },
    {
      title: '订单状态',
      dataIndex: 'stateDesc',
      align: 'center',
      width: '150',
    },
  ];

  // 表单提交
  const submit = async () => {
    const values = await form.validateFields();
    setSearchData({
      ...values,
      currentPage: 1,
      pageSize: 10,
    });
  }

  // 重置按钮
  const reset = () => {
    // 将表单值置为初始值、将请求参数置为初始值，重新发起请求
    form.resetFields()
    setSearchData({
      pageNum: 1,
      pageSize: 10,
    })
  }

  // 分页属性
  const paginationProps = {
    current: searchData?.pageNum,
    pageSize: searchData?.pageSize,
    total,
    onChange: (page: number, pageSize: number | undefined) => {
      setSearchData({
        ...searchData,
        pageNum: page,
        pageSize,
      });
    }
  }

  useEffect(() => {
    // useEffect在组件初始化或searchData更新时执行
    const params = {
      ...searchData,
      currentPage: searchData.pageNum || 1,
      pageSize: searchData.pageSize || 10,
    };
    setLoading(true)
    getData(params).then((res: any) => { // getData为请求表格接口,可根据实际开发场景对此做改动
      setLoading(false)
      if (res.code === 0) {
        setData(res.data)
        setTotal(res.total)
        // TODO ...剩余逻辑
        return
      }
      message.error(res.msg)
      // TODO ... 剩余逻辑
    })
    // TODO... 剩余逻辑
  }, [searchData])
  return (
    <>
      <div>
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Row>
          <Col span={7}>
            <FormItem
              label="收款码"
              name="id"
            >
              <Input placeholder="请输入" allowClear />
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="提现金额" name="receiptAlias">
              <Input placeholder="请输入" allowClear />
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="所属业务线" name="channelId">
              <Input placeholder="请输入" allowClear />
            </FormItem>
          </Col>
          <Col span={2} offset={1}>
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button onClick={reset} style={{ marginLeft: '10px' }}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        size="small"
        rowKey="id" // 特殊注意，一定要取数据每一项中的主键
        scroll={{ x: '100%' }}
        bordered
        pagination={paginationProps}
      />
    </>
  )
}

export default memo(App)
`;