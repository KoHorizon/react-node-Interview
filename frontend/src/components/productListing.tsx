import React, { useEffect, useState } from 'react';
import { deleteProduct, findAll } from '../api/products';
import { Product } from '../types/product';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import UpdateDialog from './editComponent';
import CreateDialog from './createComponent';




const data = ['', ''];


export default function ProductListing() {

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
        console.log(id);
        try {
            const data = await deleteProduct(id);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    },[])

    const getProducts = async() => {
        try {
            const { data } = await findAll();
            setProducts(data)
            
        } catch (error) {
            console.log(error);
            
        }
    }  





    return (
    <React.Fragment>
      <Table size="small">
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
            <TableRow key="1">
                <TableCell>Rien</TableCell>
            </TableRow>
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
    <Button variant="outlined" color="error" onClick={() => handleClickOpenCreate() }>
        Creer
    </Button> 
    </React.Fragment>
    );
}

