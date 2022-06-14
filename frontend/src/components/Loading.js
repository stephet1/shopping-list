import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const Loading = ({isLoading})=>{
    if(isLoading){
        return (
        <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center' }}>
            <CircularProgress size={'4.3rem'} thickness={1.44} />
        </Box>
        );
    }else{
        return null;
    }
}

Loading.propTypes = {
    isLoading: PropTypes.bool.isRequired
}

Loading.defaultProps = {
    isLoading: false
}

export default Loading;