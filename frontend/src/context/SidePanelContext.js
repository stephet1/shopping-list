import {createContext, useCallback} from 'react';
import { useImmerReducer } from 'use-immer';

/** Side Panel Context
 *  * 
 * Inital Side Panel State
 *  action  : String  - Add or Edit using the side panel
 *  isOpen  : Bool    - true or false for opening the side panel
 *  id      : Int     - ID number List Item or null   
*/
const initalState = {action:'Add',isOpen:false,id:null}; 

const reducer = (draft,action)=>{
    switch(action.type){
        case "CLOSE_SIDEPANEL":
            /* Reset to default state */ 
            return initalState;
        case "ADD_ITEM_SIDEPANEL":
            /* Open the Side Panel and set to Add */
            draft.isOpen=true;
            draft.action='Add';
            break;
        case "EDIT_ITEM_SIDEPANEL":
            /* Open the Side Panel and set to Edit */
            draft.isOpen=true;
            draft.action='Edit';
            draft.id=action.id;
            break;
        default:
            break;
    }
}



export const SidePanelContext = createContext();

export const SidePanelContextProvider = ({children}) =>{
    const [sidePanelAction,sidePanelActionDispatch] = useImmerReducer(reducer,initalState);
    /* Reset to default state */ 
    const sidePanelClose = useCallback(() =>{
        sidePanelActionDispatch({type:"CLOSE_SIDEPANEL"});
    },[sidePanelActionDispatch]);

    /* Open the Side Panel and set to Add */
    const addItemSidePanel = useCallback(()=>{
        sidePanelActionDispatch({type:"ADD_ITEM_SIDEPANEL"});
    },[sidePanelActionDispatch]);
    /* Open the Side Panel and set to Edit */
    const editItemSidePanel = useCallback((id)=>{
        sidePanelActionDispatch({type:"EDIT_ITEM_SIDEPANEL",id:id});
    },[sidePanelActionDispatch]);


    const DispatchAction = {sidePanelAction,sidePanelClose,addItemSidePanel,editItemSidePanel};
    return (<SidePanelContext.Provider value={DispatchAction}>
        {children}
    </SidePanelContext.Provider>);
}