import React, { useState} from 'react';
import {Button, Form }from 'react-bootstrap';
import FolderImage from '../assets/img/folderImg';
import '../assets/index.css'
import { useMutation } from 'react-query';
import { API } from '../../config/Api';
import { useNavigate } from 'react-router-dom';


function FormAddBook() {
    const navigate = useNavigate();
    
    const [formBook, setFormBook] = useState({
        author: '',
        title: '',
        publicationDate:'',
        pages:'',
        isbn:'',
        price:'',
        description:'',
        discount:0,
        sold:0,
        image:'',
        pdf:'',
      })
  
      const handleChange = (e) => {
          setFormBook({
            ...formBook,
            [e.target.name]:
              e.target.type === 'file' ? e.target.files : e.target.value,
          })
        };

        console.log("ini data book", formBook);
  
      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
  
          const config = {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          };

          const formData = new FormData();
          formData.set('author', formBook.author);
          formData.set('title', formBook.title);
          formData.set('publicationDate', formBook.publicationDate);
          formData.set('pages', formBook.pages);
          formData.set('isbn', formBook.isbn);
          formData.set('price', formBook.price);
          formData.set('description', formBook.description);
          formData.set('discount', formBook.discount);
          formData.set('sold', formBook.sold);
          formData.append('image', formBook.image[0], formBook.image[0].name);
          formData.append('pdf', formBook.pdf[0], formBook.pdf[0].name);
          
          const response = await API.post('/book', formData, config);
          console.log("add book success : ", response);
          console.log("data : ", formData);
    
          navigate('/ListBook');
        } catch (error) {
          console.log("add book failed : ", error);
        }
      });

    return(
        <Form onSubmit={(e) => handleSubmit.mutate(e)}  style={{padding:'65px 125px', position:'relative'}}>
        <div style={{fontSize:'36px'}}>Add Book</div>
        {/* <div style={{ color: 'red', fontSize: "20px", marginBottom: '42px', cursor: 'pointer' }} onClick={(e) => {navigate(`/ListBook`)}}>close</div> */}

        <Form.Group className="mb-3">
            <Form.Control type="text" name="author" onChange={handleChange} className='formAddBook' placeholder="Author"  required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="text" name="title" onChange={handleChange} className='formAddBook' placeholder="Title"  required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="text" name="publicationDate" onChange={handleChange} className='formAddBook'  placeholder="Publication Date" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="text" name="pages" onChange={handleChange} className='formAddBook' placeholder="Pages" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="text" name="isbn" onChange={handleChange} className='formAddBook' placeholder="ISBN" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="number" name="price" onChange={handleChange} className='formAddBook' placeholder="Price" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control  type="number" onChange={handleChange} className='formAddBook' name="discount" placeholder="Discount" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control as="textarea" className='formAddBook' onChange={handleChange} name="description" style={{ width: '1204px', height: '117px' }} placeholder="Description" required />
        </Form.Group>

        <Form.Group className="mb-3">
            <label >Pilih image</label>
            <Form.Control className='formAddBook' onChange={handleChange} name="image" type="file"/>
        </Form.Group>

        <Form.Group className="mb-3">
            <label >Pilih File PDF</label>
            <Form.Control className='formAddBook' onChange={handleChange} name="pdf" type="file" label="Pilih File PDF" custom />
        </Form.Group>


        <Button type="submit" style={{width:'150px', height:'50px',  position:'absolute', right:'125x', bottom:'0px', border:'0px',backgroundColor:'#393939', display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'20px'}}>
            <div style={{fontSize:'18px', fontWeight:'500'}} >Add Book</div>
            <div style={{backgroundImage: `url(${FolderImage.IconBook})`, backgroundSize: 'cover', width:'30px', height:'30px', marginLeft:'15px'}}></div>
        </Button>
    </Form>
    )
}

export default FormAddBook