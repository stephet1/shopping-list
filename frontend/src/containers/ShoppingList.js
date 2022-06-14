import { useEffect,useContext } from 'react';
import { useImmer } from 'use-immer';
import EmptyList from './EmptyList';
import SideItemSidePanel from './SideItemSidePanel';
import Loading from '../components/Loading';
import {SidePanelContext} from '../context/SidePanelContext';
import { Button } from '../components/Button';
import { GET_ALL_SHOPPING_LIST_ITEM } from '../queries/queries';
import { useQuery } from '@apollo/client';
import ListItem from './ListItem';


const ShoppingList = ()=>{
    const {loading,data,refetch} = useQuery(GET_ALL_SHOPPING_LIST_ITEM);
    const {sidePanelAction,addItemSidePanel} = useContext(SidePanelContext);
    
    useEffect(()=>{
        if(!sidePanelAction.isOpen){
            refetch();
        }
    },[sidePanelAction.isOpen,refetch])

    const PopulatedList = ()=>{        
        return (
            <div id='populatedList'>
                <div className='listHeader'>
                    <h4>Your Items</h4>
                    <Button sx={{minWidth:'2rem',height:'1.7rem'}}  onClick={addItemSidePanel}>Add item</Button>
                </div>
                <div style={{overflowX:'hidden',maxHeight:'75vh'}}>
                    <ListItem reFetch={refetch} listItems={data.getAllShoppingItems} />
                </div>
            </div>
        );
    }
    return (
        <div className='container' >
            <SideItemSidePanel reFetch={refetch}/>
            <div id='loader'><Loading isLoading={loading} /></div>
            {data?<PopulatedList/>:<EmptyList/>}
        </div>
    );
};

export default ShoppingList; 
