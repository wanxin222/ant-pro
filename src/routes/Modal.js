import {Form,Modal,Input} from 'antd';
import React from 'react';

const FormItem = Form.Item;
function UserModal(props) {
    // const { modalVisible, form, handleAdd, handleModalVisible } = props; 
    
    const {form,visible,hideModal} =props;
    
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        // handleAdd(fieldsValue);
      });
    };
    return (
      <Modal
        title="新建规则"
        visible={visible}
        onOk={okHandle}
        onCancel={ hideModal}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="描述"
        >
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input some description...' }],
          })(
            <Input placeholder="请输入" />
          )}
        </FormItem>
      </Modal>
    );
  };

  export default Form.create()(UserModal);