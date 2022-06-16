import React, { useContext, useEffect } from 'react';
import { Button } from '../components/Button';
import LastPageIcon from '@mui/icons-material/LastPage';
import { SidePanelContext } from '../context/SidePanelContext';
import { useImmer } from 'use-immer';
import { Drawer, FormControl, MenuItem, InputLabel, Select, IconButton, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Textarea from '../components/Textarea';
import { ADD_SHOPPING_LIST_ITEM,GET_SHOPPING_LIST_ITEM,PATCH_SHOPPING_LIST_ITEM } from '../queries/queries';
import { useMutation, useQuery } from '@apollo/client';

const defaultValues = {
    itemName: '',
    itemDescription: '',
    itemCount: '',
    itemPurchased: false
};

const characterLimit = 100;
const defaultMenuItemCount = [1,2,3];
const labelStyle = {style: {fontSize: 12, color:'grey'}};
const actionButton = {minWidth:'1rem'};
const cancelButton = {minWidth:'1rem', color:'black'};

const SideItemSidePanel = ({reFetch}) =>{
    const {sidePanelAction,sidePanelClose} = useContext(SidePanelContext);
    const [formValues, setFormValues] = useImmer(defaultValues);
    const [charLimit] = useImmer(characterLimit);
    const [createShoppingItem,{reset}] = useMutation(ADD_SHOPPING_LIST_ITEM);
    const [updateShoppingItem] = useMutation(PATCH_SHOPPING_LIST_ITEM);
    const {data} = useQuery(GET_SHOPPING_LIST_ITEM,
        {variables:{getShoppingItemId:sidePanelAction.id},
        skip:sidePanelAction.id?false:true
        });

    useEffect(()=>{
        setFormValues(defaultValues);
        if(sidePanelAction.id){
            if(data){
                setFormValues(draft=>{
                    draft.itemName=data.getShoppingItem.itemName;
                    draft.itemDescription=data.getShoppingItem.itemDescription;
                    draft.itemPurchased=data.getShoppingItem.itemPurchased;
                    draft.itemCount=data.getShoppingItem.itemCount;
                });
            }
        }
        
    },[sidePanelAction,data,setFormValues]);

    const toggleDrawer = (event)=>{
        if(event.key === 'Escape'){
            sidePanelClose();
            reset();
        }
    };

    const  handleSubmit= (event)=>{
        event.preventDefault();
        if(sidePanelAction.action==='Add'){
            createShoppingItem({
                variables:{
                    itemName:formValues.itemName,
                    itemDescription:formValues.itemDescription,
                    itemCount:formValues.itemCount===''?1:formValues.itemCount
                }
            }).then(()=>{
                reFetch();
            });
        }else{
            updateShoppingItem({
                variables:{
                    Id:sidePanelAction.id,
                    itemName:formValues.itemName,
                    itemDescription:formValues.itemDescription,
                    itemCount:formValues.itemCount,
                    itemPurchased:formValues.itemPurchased
                }
            }).then(data=>{
                reFetch();
            });
            ;
        }
        sidePanelClose();
        reset();
    };

    const handleInput = (event)=>{
        const {name, value} = event.target;
        let newValue = value;
        if(name==='itemPurchased'){
            newValue = event.target.checked;
        }
        setFormValues((draft)=>{draft[name] = newValue});
    };

    const PurchasedComponent = () =>{
        return(<FormGroup>
            <FormControlLabel style={labelStyle.style} size='small' control={<Checkbox size='small' name='itemPurchased' onChange={handleInput} checked={formValues.itemPurchased}/>} label="Purchased" />
        </FormGroup>);
    };

    return (
    <div>
        <Drawer
            anchor='right'
            open={sidePanelAction.isOpen}
            onKeyDown={toggleDrawer}
        >
            <div className='sidePanel'>
                <div className='header'>
                    <p>SHOPPING LIST</p>
                    <IconButton disableRipple={true} onClick={sidePanelClose}>
                        <LastPageIcon />
                    </IconButton>
                </div>
                
                <form onSubmit={handleSubmit} className='container'>
                    <div className='container'>
                        <p className='title'>{sidePanelAction.action} an Item</p>
                        <p>{sidePanelAction.action} your {sidePanelAction.action==='Add'?'new':''} item below</p>
                        <div className='container formField'>
                            <TextField name='itemName' type='text' onChange={handleInput} label="Item Name" variant="outlined"  fullWidth={true} size='small' value={formValues.itemName} InputLabelProps={labelStyle} />
                            <Textarea name='itemDescription' label='Description' currentChar={formValues.itemDescription.length} charLimit={charLimit} rows={7} value={formValues.itemDescription} onChange={handleInput} InputLabelProps={labelStyle} />
                            <FormControl fullWidth>
                                <InputLabel style={labelStyle.style} id='itemCount'>How many?</InputLabel>
                                <Select labelId='itemCount' name="itemCount" onChange={handleInput} value={formValues.itemCount}>
                                    {defaultMenuItemCount.map((item,key)=>{
                                        return <MenuItem key={key} value={item}>{item}</MenuItem>
                                    })}  
                                </Select>
                                {sidePanelAction.action==='Edit'?<PurchasedComponent/>:null}
                            </FormControl>
                            
                        </div>
                    </div>
                    <div className='formButton'>
                        <Button variant='text' sx={cancelButton} onClick={sidePanelClose}>Cancel</Button>
                        <Button sx={actionButton} type="submit">{sidePanelAction.action==='Add'?'Add Task':'Save Item'}</Button>
                    </div>
                    
                </form>
                <div className='footer'>
                    <div className='footerBar'></div>
                </div>
            </div>
            
        </Drawer>
    </div>
    );
};


export default SideItemSidePanel;
