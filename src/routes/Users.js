import React from 'react';
import {connect} from 'dva';
import UsersItem from '../components/Users';
import {routerRedux} from 'dva/router';
import UserModal from './Modal';
import {Form,Modal,Input,Row, Col,Select,Button,Icon} from 'antd';
import { setTimeout } from 'timers';
import styles from './Users.less';


const FormItem = Form.Item;
const { Option } = Select;

const CreateForm = Form.create()((props) => {
    // const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const {form,visible,hideModal,record={},title,onOk}=props;
    const {name,email,phone,id}=record;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (!err){
            
            if(id){
                onOk(id,fieldsValue);
            }else{
                onOk(fieldsValue);
            };
            hideModal()
            form.resetFields();
        }else{
            setTimeout(()=>{
                form.resetFields();
            },1500)
        }
        
        
      });
    };
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={okHandle}
        onCancel={hideModal}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="姓名"
        >
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input some description...' }],
            initialValue: name,
          })(
            <Input placeholder="" />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="邮箱"
        >
          {form.getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input some description...' }],
            initialValue: email,
          })(
            <Input placeholder="" />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="电话"
        >
          {form.getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input some description...' }],
            initialValue: phone,
          })(
            <Input placeholder="" />
          )}
        </FormItem>

      </Modal>
    );
  });

const SeachForm=Form.create()((props) => {
    
    const { getFieldDecorator } = props.form;
    let {handleFormReset,handleSearch}=props
    
    return (
      <Form  layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="邮箱">
              {getFieldDecorator('email')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={()=>handleSearch(props)}>查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={()=>handleFormReset(props)}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
});

class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'创建',
            selectedRows:[],
            formValues: {},
        };
        
    }
    
    hideModal=()=>{
        this.props.dispatch({
            type:'users/hideModal'
        })
    }
    handlePageChange=(page)=>{
        this.props.dispatch(routerRedux.push({
            pathname:'/users',
            query:{page}
        }))
    }
    showModal=(record,title)=>{
        this.setState({
            title,
        })
        this.props.dispatch({
            type:'users/showModal',
            payload:record,
        })
    }
    edit=(id,value)=>{
        console.log(id,value);
    }
    create=(value)=>{
        console.log(value);
    }
    handleSelectRows = (rows) => {
        this.setState({
          selectedRows: rows,
        });
    }
    handleFormReset = (props) => {
        
        const { form, dispatch } = props;
        
        form.resetFields();
        this.setState({
          formValues: {},
        });
        
    }

    handleSearch = (props) => {
        
        
        const { dispatch, form } = props;
        form.validateFields((err, fieldsValue) => {
          if (err) return;
            
          const values = {
            ...fieldsValue,
            updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
          };
    
          this.setState({
            formValues: values,
          });
    
          dispatch({
            type: 'rule/fetch',
            payload: values,
          });
        });
      }
    render(){
        const {list,total,current,record,visible,dispatch}=this.props;
        
        const usersProps={
            list,
            total,
            current,
            record,
            selectedRows:this.state.selectedRows,
            onSelectRow:this.handleSelectRows,
            handlePageChange:this.handlePageChange,
            showModal:this.showModal,
        }
        const formProps={
            visible,
            hideModal:this.hideModal,
            record:record?record:null,
            title:this.state.title,
            onOk:this.state.title==='编辑'?this.edit:this.create
        }

        const seachFormProps={
            handleFormReset:this.handleFormReset,
            dispatch,
            handleSearch:this.handleSearch,
        }
        
        return (
            <div>
                <SeachForm {...seachFormProps}/>
                <UsersItem {...usersProps}></UsersItem>
                <CreateForm {...formProps}></CreateForm>
            </div>
        )
    }
};

function mapStateToProps(state){
    
    return {
        list:state.users.list,
        total:state.users.total,
        current:state.users.current,
        visible:state.users.modalVisible,
        record:state.users.record,
    }
}

export default connect(mapStateToProps)(Users);