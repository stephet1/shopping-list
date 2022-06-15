import { useEffect,useContext } from 'react';
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
                <div style={{overflowX:'hidden',maxHeight:'75vh',paddingRight:'5px'}}>
                    <ListItem reFetch={refetch} listItems={data.getAllShoppingItems} />
                </div>
            </div>
        );
    }

    const EmptyList = () => {    
        return (
            <div id='emptyList'>
                <p>Your shopping list is empty :(</p>
                <Button sx={{minWidth:'8rem'}}  onClick={addItemSidePanel}>Add your first item</Button>
            </div>
        );
    };


    const ListComponent = () =>{
        if (data){
            if (data.getAllShoppingItems){
                if(data.getAllShoppingItems.length>0){
                    return <PopulatedList/>;
                }
            }
        }
        return <EmptyList/>;
    }

    return (
        <div className='container' >
            <SideItemSidePanel reFetch={refetch}/>
            
            {loading?<div id='loader'><Loading isLoading={loading} /></div>:<ListComponent/>}
        </div>
    );
};

export default ShoppingList; 