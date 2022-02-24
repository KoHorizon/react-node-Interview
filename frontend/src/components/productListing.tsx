import React, { useEffect, useRef, useState } from 'react';
import { deleteProduct, findAll } from '../api/products';
import { Product } from '../types/product';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, DialogTitle, Typography } from '@mui/material';
import UpdateDialog from './editComponent';
import CreateDialog from './createComponent';
import { Box } from '@mui/system';




const data = [''];


export default function ProductListing() {

    let interval = useRef();

    useEffect(() => {
        setInterval(() => {
            try {
                getProducts();
            } catch (error) {
                
            }
        },1000)
    },[])

    const getProducts = async() => {
        try {
            const { data } = await findAll();
            setProducts(data)
            
        } catch (error) {
            disconnect();            
        }
    }  







    const [open, setOpen] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);

    const [selectedValue, setSelectedValue] = React.useState(data[1]);

    const [editProduct, setEditProduct] = useState<Product>();
    const [products,setProducts] = useState<Product[]>([]);


    const handleClickOpen = (id: number) => {
        setOpen(true);
        const product = products.find((item) => item._id === id)
        if ( product ) setEditProduct(product); 
    };


    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };


    const handleClose = (value: string) => {
        setOpen(false);
    };

    const handleCloseCreate = (value: string) => {
        setOpenCreate(false);
    };
    


    const handleDelete = async (id: number) => {
        try {
            const data = await deleteProduct(id);
        } catch (error) {
            console.log(error);
        }
    }


    const disconnect = async () => {
        localStorage.removeItem('token');
        return window.location.reload();
    }


    return (
    <React.Fragment >
        <div>
        <Button variant="outlined" color="error" sx={{ m: 2 }} onClick={() => disconnect() }>
        Disconnect
        </Button> 
        </div>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>type</TableCell>
            <TableCell>price</TableCell>
            <TableCell>rating</TableCell>
            <TableCell>warranty years</TableCell>
            <TableCell>available</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            products ? products.map(({ _id,name,type,price,rating,warranty_years, available })=> {
                return ( 
            <TableRow key={_id}>
                <TableCell>{name}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{rating}</TableCell>
                <TableCell>{warranty_years}</TableCell>
                <TableCell>{available ? 'Available' : 'Not Available'}</TableCell>
                <TableCell>
                    <Button variant="contained" onClick={() => handleClickOpen(_id)}>
                        Edit
                    </Button>    
                </TableCell>
                <TableCell>
                <Button variant="outlined" color="error" onClick={() => handleDelete(_id)}>
                    Delete
                </Button> 
                </TableCell>
            </TableRow>)
                }) : 
                <DialogTitle>Create a product</DialogTitle>
                
            }
        </TableBody>
    </Table>

    <UpdateDialog
        product={editProduct}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        />
    <CreateDialog
        selectedValue={selectedValue}
        open={openCreate}
        onClose={handleCloseCreate}
    />
    <Box textAlign='center' sx={{ m: 5 }} >
        <Button variant="outlined" size="large"sx={{ width: '75%' }} onClick={() => handleClickOpenCreate() }>
            Creer
        </Button> 
    </Box>

    </React.Fragment>
    );
}

