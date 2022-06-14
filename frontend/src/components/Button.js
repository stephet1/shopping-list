import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';



const StyledButton = (props)=>{
    const theme = createTheme({
        components: {
            MuiButton:{
                styleOverrides:{
                    root:{
                        textTransform:'none',
                        fontSize: '10.5px'
                    }
                }
            }
        }
    });

    return (
    <ThemeProvider theme={theme}>
        <Button variant='contained' size='small' {...props} >{props.children}</Button>
    </ThemeProvider>
    );
};


export  {StyledButton as Button};


