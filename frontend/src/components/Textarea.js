import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const Textarea = (({
    currentChar,
    charLimit,
    name,
    label,
    rows,
    onChange, 
    InputLabelProps,
    value
})=>{
    return (
        <div 
            style={{
                position:'relative', width:'100%'
                }}
        >
            <TextField 
                variant='outlined' 
                name={name} 
                onChange={onChange} 
                label={label} 
                size='small' 
                fullWidth={true} 
                rows={rows} 
                multiline
                InputLabelProps={InputLabelProps}
                value={value}
                inputProps={{
                    maxLength: charLimit,
                    style: { fontSize: 12, lineHeight:'normal'}
                    }}
            />
            <div 
                style={{
                    position:'absolute',
                    right:'10px',
                    bottom:'5px',
                    fontSize:'9px',
                    color:currentChar===charLimit?'red':''
                }}
            >
                {`${currentChar}/${charLimit}`}
            </div>
        </div>
    );
});

Textarea.propTypes = {
    currentChar: PropTypes.number,
    charLimit: PropTypes.number,
    name: PropTypes.string,
    label: PropTypes.string,
    rows: PropTypes.number,
    onChange: PropTypes.func,
    InputLabelProps: PropTypes.object
}

Textarea.defaultProps = {
    charLimit: 100,
    rows: 7
}

export default Textarea;