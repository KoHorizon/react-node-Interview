import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createProduct } from '../api/products';
import { Product } from '../types/product';




export interface SimpleDialogProps {
  create: (value: Omit<Product,'_id' | 'rating' >) => void;
  open: boolean;
  onClose: () => void;
}



const theme = createTheme();

export default function UpdateDialog(props: SimpleDialogProps) {


  
    const { onClose, open , create} = props;
    const [checked, setChecked] = React.useState(false);



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const priceToString = data.get('price');
        const warrantyYearsToString = data.get('warranty_years');

        if(!priceToString || typeof priceToString != 'string') return;

        if(!warrantyYearsToString || typeof warrantyYearsToString != 'string') return;


        const available = data.get('available') ? true : false;
        const type = data.get('type');

        const name = data.get('name');
        const price = parseInt(priceToString);
        const warranty_years = parseInt(warrantyYearsToString);


        if ( typeof name != 'string') return;
        if ( typeof type != 'string') return;
        if ( typeof price != 'number') return;
        if ( typeof warranty_years != 'number') return;
    
        const createObj = {
            name,
            type,
            price,
            warranty_years,
            available
        };
    

        create(createObj);
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


    const handleClose = () => {
        onClose();
    };



    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Create a product</DialogTitle>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
            Create a product
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="name"
                                type="text"
                                id="name"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="type"
                                label="type"
                                type="text"
                                id="type"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="price"
                                label="price"
                                type="number"
                                id="price"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="warranty_years"
                                label="warranty_years"
                                type="number"
                                id="password"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={checked} onChange={handleChange} />}
                                label="Check checkbox if the product is available"
                                name="available"
                                id="available"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1 }}
                            >
              CREATE
                            </Button>
                            <Button
                                fullWidth
                                sx={{ mt: 1, mb: 2 }}
                                onClick={handleClose}
                            >
              CLOSE
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Dialog>
    );
}
