import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Product } from '../types/product';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { updateProduct } from '../api/products';




export interface SimpleDialogProps {
  product?: Product ;
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}



const theme = createTheme();

export default function UpdateDialog(props: SimpleDialogProps) {


  
  const { product ,onClose, selectedValue, open } = props;
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(product?.available??false);
  },[product])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!product) return;

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const priceToString = data.get('price');
    const warrantyYearsToString = data.get('warranty_years');

    if(!priceToString || typeof priceToString != 'string') return;
    if(!warrantyYearsToString || typeof warrantyYearsToString != 'string') return;


    const available = data.get('available') ? true : false;
    const name = data.get('name');
    const price = parseInt(priceToString);
    const warranty_years = parseInt(warrantyYearsToString);
    
    
    if ( typeof name != 'string') return;
    if ( typeof price != 'number') return;
    if ( typeof warranty_years != 'number') return;
    
    const updateObj = {
      name,
      price,
      warranty_years,
      available
    }
    
    try {
      const data = await updateProduct(product._id,updateObj);      
    } catch (error) {
      console.log(error);
    }
    
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


  const handleClose = () => {
    onClose(selectedValue);
  };



  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Change Data of Product {product?._id}</DialogTitle>
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
            Update this product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={product?.name}
              name="name"
              label="name"
              type="text"
              id="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={product?.price}
              name="price"
              label="price"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 2000 } }}
              id="price"
            />
            <TextField
              margin="normal"
              required
              defaultValue={product?.warranty_years}
              fullWidth
              name="warranty_years"
              label="warranty_years"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              id="password"
            />
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChange} />}
              label="Check if available"
              name="available"
              id="available"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              onClick={handleClose}
            >
              UPDATE
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
