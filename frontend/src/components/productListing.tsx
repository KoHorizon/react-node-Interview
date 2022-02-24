import React, { useEffect, useState } from 'react';
import { createProduct, deleteProduct, findAll, updateProduct } from '../api/products';
import { Product } from '../types/product';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, DialogTitle } from '@mui/material';
import UpdateDialog from './editComponent';
import CreateDialog from './createComponent';
import { Box } from '@mui/system';






export default function ProductListing() {


    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);


    const [editProduct, setEditProduct] = useState<Product>();
    const [products,setProducts] = useState<Product[]>([]);


    const handleClickOpen = (id: number) => {
        setOpenEdit(true);
        const product = products.find((item) => item._id === id);
        if ( product ) setEditProduct(product); 
    };


    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };


    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };
    
    const handleCreateProduct = async (value: Omit<Product,'_id' | 'rating' > ) => {
        try {
            const { data } = await createProduct(value); 
            setProducts((items) => [...items, data]);  
            handleCloseCreate();
        } catch (error) {
            console.error(error);
        }
    };


    const handleEditProduct = async (id: number, value: Omit<Product,'_id' | 'rating' | 'type'> ) => {
        try {
            const { data } = await updateProduct(id,value);    
            setProducts((items) => items.map(item => item._id === id ? data : item ));  
            handleCloseEdit();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = async (id:number) => {

        const ok = confirm('This product is about to be deleted, do you confirm ?');
        if (!ok) return;
        try {
            await deleteProduct(id);
            setProducts((items) => items.filter(item => item._id !== id));
        } catch (error) {
            console.error(error);
        }

        
    };


    const disconnect = async () => {
        localStorage.removeItem('token');
        return window.location.reload();
    };

    useEffect(() => {
        findAll().then((res) => {
            const data = res.data;
            setProducts(data);
        }).catch(console.error);
    },[]);


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
                                        <Button variant="outlined" color="error" onClick={() => handleDeleteProduct(_id)}>
                                            Delete
                                        </Button> 
                                    </TableCell>
                                </TableRow>); 
                        }) : 
                            <DialogTitle>Create a product</DialogTitle>
                
                    }
                </TableBody>
            </Table>

            <UpdateDialog
                update={handleEditProduct}
                product={editProduct}
                open={openEdit}
                onClose={handleCloseEdit}
            />
            <CreateDialog
                create={handleCreateProduct}
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

