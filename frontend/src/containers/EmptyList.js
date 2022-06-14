import {useContext} from 'react';
import {Button} from '../components/Button';
import {SidePanelContext} from '../context/SidePanelContext';

const EmptyList = () => {
    const {addItemSidePanel} = useContext(SidePanelContext);

    return (
        <div id='emptyList'>
            <p>Your shopping list is empty :(</p>
            <Button sx={{minWidth:'8rem'}}  onClick={addItemSidePanel}>Add your first item</Button>
        </div>
    );
};

export default EmptyList;