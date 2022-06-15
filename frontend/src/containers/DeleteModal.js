import {Button} from '../components/Button';
import { Modal} from '@mui/material';
import PropTypes from 'prop-types';


const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '200px',
    backgroundColor: 'white',
    borderRadius: '3px',
    boxShadow: '0px 0px 7px 0px',
    padding: '10px 20px 10px 20px',
    display:'flex',
    flexDirection:'column',
    flexWrap: 'wrap',
    justifyContent:'space-between'
    
};

const header = {
    fontSize: '17px',
    fontWeight: 'bold',
    marginBottom: 0
};

const body = {
    fontSize: '15px',
    color: 'grey'
}


const DeleteModal = (({isModalOpen,setModalValue,handleDelete})=>{

    const handleClose = ()=>{
        setModalValue((draft)=>{
            draft.isOpen = false;
            draft.deleteID = null
        });
    }

    return(
        <Modal 
            open={isModalOpen}
        >
            <div style={style}>
                <div>
                    <p style={header}>Delete Item?</p>
                    <p style={body}>Are you sure you want to delete this item? This can not be undone.</p>
                </div>
                <div className='formButton' >
                    <Button variant='text' onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} >Delete</Button>
                </div>
            </div>
        </Modal>
    );
});

DeleteModal.propTypes = {
    isModalOpen:PropTypes.bool.isRequired,
    setModalValue:PropTypes.func.isRequired,
    handleDelete:PropTypes.func.isRequired

}

DeleteModal.defaultProps={
    isModalOpen:false
}

export default DeleteModal;