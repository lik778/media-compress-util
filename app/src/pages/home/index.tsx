import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Upload,
  UploadFile
} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import React, { useState } from 'react';
import  useLayoutMobile from '@/hooks/useLayoutMobile'
import {  compressMediaApi } from '@/api/compress'
import type { CompressMediaResParamType } from '@/interface/compress'
import {  createDomDownloadFile } from '@/assets/js/download'
import './index.scss'

const { Option } = Select;



const Home: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList,setFileList] = useState<UploadFile[]>([])
  const [pedding, setPedding] = useState<boolean>(false)
  const [compressName, setCompressName] = useState<string>('')
  const isMobile  = useLayoutMobile()
  const uploadType = ['image/png','image/jpg','image/jpeg','image/webp','image/gif']
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const beforeUpload  = (file: UploadFile, fileList: UploadFile[]) => {
    const flag  =  uploadType.some(item => file.type === item)
    if(!flag) return false
  }
  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    setFileList(fileList)
    if(file.status === 'done') {
      setCompressName(file.response.filename)
    }
  }

  const initFormValue = {
    formatter: 'default',
  }

  const uploadProps = {
    name:"file",
    accept: uploadType.join(','),
    action:"http://localhost:3005/upload/all",
    multiple: true,
    beforeUpload: beforeUpload,
    onChange: handleChange,
    
  }
  
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const downloadCompressFile = async (data: CompressMediaResParamType) => {
    setPedding(true)
    const res = await compressMediaApi(data)
    const uint8Array = new Uint8Array(res.data.buffer.data)
    const buffer = uint8Array.buffer
    createDomDownloadFile(buffer, res.data.filename, res.data.type)
    setPedding(false)
  }
  
  const onFinish = (values: any) => {
    if(!values.url) return
    const data  = {
      ...values,
      url: values.url.map((item: UploadFile) => item.response.fileName),
    }
    downloadCompressFile(data)
  };

  const handleReset = () => {
    form.resetFields()
    setFileList(() => [])
  }

  return ( <div className='w-full min-h-full overflow-auto  flex justify-center items-center'>
    <Form
    name="compress-media-form"
    {...formItemLayout}
    layout={isMobile ? 'vertical' : 'horizontal'}
    form={form}
    size="large"
    initialValues={initFormValue}
    onFinish={onFinish}
    className="mx-auto px-5"
    style={{ maxWidth: 700, width: '100%' }}
  >
    <Form.Item
      name="formatter"
      label="输出格式："
      hasFeedback
      tooltip="默会输出原图片格式"
    >
      <Select placeholder="请选择输出格式，默认情况下输出原图片格式">
        <Option value="default">默认</Option>
        <Option value="png">png</Option>
        <Option value="jpg">jpg</Option>
        <Option value="jpeg">jpeg</Option>
        <Option value="webp">webp</Option>
        <Option value="gif">gif</Option>
      </Select>
    </Form.Item>

    <Form.Item label="尺寸：" tooltip="默会输出原图片尺寸" style={{ marginBottom: 0 }}>
      <Form.Item
        name="width"
        label="宽度"
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
        <InputNumber className='w-full' min={1} max={3000} />
      </Form.Item>
      <Form.Item
        name="height"
        label="高度"
        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
      >
        <InputNumber className='w-full' min={1} max={3000} />
      </Form.Item>
    </Form.Item>
    <Form.Item label="上传：" tooltip="单张压缩后返回单张，多张压缩后返回zip">
      <Form.Item name="url" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
        <Upload.Dragger fileList={fileList} {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者拖拽上传你要压缩的图片</p>
          <p className="ant-upload-hint">压缩格式支持 .png、.jpg、.jpeg、.webp、.gif</p>
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>
    <Form.Item label="操作：" tooltip="每次压缩前请清空上一次上传的文件">
        <Row  justify="space-between" className='w-full' gutter={{ xs: 8, sm: 16, md: 24, lg: 0 }}>
          <Col xs={11} sm={11} md={11} lg={10} xl={10}>
            <Button className='w-full' onClick={handleReset}>
              清空
            </Button>
          </Col>
          <Col xs={11} sm={11} md={11} lg={10} xl={10}>
            <Button loading={pedding} type="primary" className='w-full' htmlType="submit">
              压缩
            </Button>
          </Col>
        </Row>
    </Form.Item>
    </Form>
  </div>)

};

export default Home;