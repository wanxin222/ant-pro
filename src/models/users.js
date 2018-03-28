import * as usersServer from '../services/users';
import {message} from 'antd';
export default {
  namespace: 'users',
  state: {
    list:[],
    total:10,
    current:1,
    modalVisible:false,
    record:{}
    
    
  },
  reducers: {
    save(state,{payload:{data:list,current}}){
      return {
        ...state,
        list,
        current, 
      }
    },
    showModal(state,{payload:record}){
      return {
        ...state,
        modalVisible:true,
        record,
      }
    },
    hideModal(state){
      return {
        ...state,
        modalVisible:false,
      }
    }

  },
  effects: {
    *fetch({payload:page},{call,put}){
      const list=yield call(usersServer.fetch,page);
      const current=parseInt(page.page,10) || 1;
      yield put({
        type:'save',
        payload:{
          data:list,
          current,
        }
      });
    },
    
  },
  subscriptions: {
    setup({dispatch,history}){
      return history.listen(({pathname,query})=>{
        if(pathname=='/users'){
          if(query){
            dispatch({type:'fetch',payload:query});
          }else{
            dispatch({type:'fetch',payload:{page:1}});
          }
          
        }
      });
    }
  },
};

