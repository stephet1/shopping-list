import { Checkbox,IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { PATCH_ITEM_PURCHASED_SHOPPING_LIST_ITEM,DELETE_SHOPPING_LIST_ITEM } from '../queries/queries';
import { useMutation } from '@apollo/client';
import {SidePanelContext} from '../context/SidePanelContext';

const labelStyle = {fontSize:'13px', fontWeight:'bold', color:'black'};
const descriptionStyle = {fontSize:'12px',color:'grey'}
const ListItem = (({listItems ,reFetch})=>{
    const [patchItemPurchased] = useMutation(PATCH_ITEM_PURCHASED_SHOPPING_LIST_ITEM);
    const [deleteShoppingItem] = useMutation(DELETE_SHOPPING_LIST_ITEM);
    const {editItemSidePanel} = useContext(SidePanelContext);
    const handleClick = ((e)=>{   
        patchItemPurchased({
            variables:{
                Id:e.target.id,
                itemPurchased:e.target.checked
            }
        })
    });

    const handleEdit = ((id)=>{
        editItemSidePanel(id);
    });

    const handleDelete = ((id)=>{
        deleteShoppingItem({
            variables:{
                Id:id
            }
        }).then(()=>{
            reFetch();
        });
    })

    const Items = ()=>{
        return listItems.map((item,key)=>{
            return (
                <React.Fragment key={key}>
                <div className='itemContainer' >
                    <div className='checkBoxContainer'>
                        <Checkbox size='small' id={item.id} onClick={handleClick} checked={item.itemPurchased} />
                        <div className='checkBoxLabel'>
                            <label className={item.itemPurchased?'textDecoration':''} style={labelStyle} htmlFor={item.id}>{item.itemName}</label>
                            <span className={item.itemPurchased?'textDecoration':''} style={descriptionStyle}>{item.itemDescription}</span>
                        </div>
                    </div>
                    <div className='icons' >
                        <IconButton style={{padding:0}} disableRipple={true} onClick={()=>handleEdit(item.id)}>
                            <CreateOutlinedIcon className='icon' fontSize='small' />
                        </IconButton>
                        <IconButton style={{padding:0}} disableRipple={true} onClick={()=>handleDelete(item.id)}>
                            <DeleteOutlineOutlinedIcon className='icon' fontSize='small' />
                        </IconButton>
                    </div>
                </div>
                </React.Fragment>
            );
        });
    }

    return(
        <Items/>
    );
});

ListItem.propTypes = {
    listItems:PropTypes.arrayOf(PropTypes.object).isRequired,
    reFetch:PropTypes.func.isRequired
}
ListItem.defaultProps={
    listItems:[]
}

export default ListItem;