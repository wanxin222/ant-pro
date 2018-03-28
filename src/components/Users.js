import React from 'react';
import {Table,Button,Popconfirm,Pagination} from 'antd'
import styles from './Users.less';

class UsersItem extends React.Component{
  constructor(props){
    super(props);

    this.state={
      selectedRowKeys:[],
      
    }

    this.clearSelectd=this.clearSelectd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    
    // clean state
    if (nextProps.selectedRows.length === 0) {
      
      this.setState({
        selectedRowKeys: [],
        
      });
    }
  }
  clearSelectd(){
    
    this.setState({
      selectedRowKeys:[],
      
    })
  }
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    
    console.log(selectedRows);
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys});
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([],[]);
  }
  render(){
    const {list,total,current,handlePageChange,showModal}=this.props;
    
    const columns=[
        {
          title:'姓名',
          dataIndex:'name',
          key:'name',
          render:text=><a href="#">{text}</a>
        },{
          title:'邮箱',
          dataIndex:'email',
          key:'email',
          render:text=><a href="#">{text}</a>
        },
        {
          title:'电话',
          dataIndex:'phone',
          key:'phone'
        },
        {
            title:'操作',
            key:'action',
            render:(text,record)=>(
              <span>
                <Button type="ghost" size="small" onClick={showModal.bind(null,record,'编辑')}>编辑</Button>
                <span style={{fontSize:20,margin:10,color:"green"}}>|</span>
                <Popconfirm title="确定要删除吗" >
                  <Button type="ghost" size="small">删除</Button>
                </Popconfirm>
              </span>
            )
          }
    ];
    const rowSelection = {
      selectedRowKeys:this.state.selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    const hasSelected=this.state.selectedRowKeys.length>0;
  
    return (
        <div style={{marginTop:30}}>
            <div className={styles.wrap}>
              <Button type="ghost" disabled={!hasSelected}>删除</Button>
              <span style={{marginLeft:18}}>已选择 <a style={{ fontWeight: 600 }}>{this.state.selectedRowKeys.length}</a> 项&nbsp;&nbsp;</span>
              <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 16 }}>清空</a>
              <Button icon="plus" className={styles.button} type="primary"  onClick={showModal.bind(null,{},'创建')}>创建</Button>
            </div>
            
            <Table
                columns={columns}
                dataSource={list}
                rowKey={r=> r.id}
                pagination={false}
                rowSelection={rowSelection}
            ></Table>
            <Pagination 
                className="ant-table-pagination"
                total={total}
                pageSize={5}
                current={current}
                onChange={handlePageChange}
                
            ></Pagination>
        </div>
    )
  }
};

export default UsersItem;