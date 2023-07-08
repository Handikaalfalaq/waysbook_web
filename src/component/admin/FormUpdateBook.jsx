import {React, useState, useEffect} from 'react';
import {Button, Form }from 'react-bootstrap';
import FolderImage from '../assets/img/folderImg';
import '../assets/index.css'
import { useMutation } from 'react-query';
import { API } from '../../config/Api';
import { useNavigate, useParams } from 'react-router-dom';
 

function FormUpdateBook() {
    const number = useParams("id")
    const navigate = useNavigate();
    
    const [formUpdateBook, setFormUpdateBook] = useState({
        author: '',
        title: '',
        publicationDate:'',
        pages:'',
        isbn:'',
        price:'',
        description:'',
        discount:'',
        image:'',
        pdf:'',
      })


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await API.get(`/book/${number.id}`);
            const dataBookById = response.data.data;
            setFormUpdateBook(
              {
                author: dataBookById.author,
                title: dataBookById.title,
                publicationDate: dataBookById.publicationDate,
                pages: dataBookById.pages,
                isbn: dataBookById.isbn,
                price: dataBookById.price,
                description:dataBookById.description,
                discount: dataBookById.discount,
              }
            );
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [number.id]);
  
      const handleChange = (e) => {
        setFormUpdateBook({
            ...formUpdateBook,
            [e.target.name]:
              e.target.type === 'file' ? e.target.files : e.target.value,
          })
        };
  
      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
  
          const config = {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          };

          const formData = new FormData();
          formData.set('author', formUpdateBook.author);
          formData.set('title', formUpdateBook.title);
          formData.set('publicationDate', formUpdateBook.country);
          formData.set('pages', formUpdateBook.pages);
          formData.set('isbn', formUpdateBook.isbn);
          formData.set('price', formUpdateBook.price);
          formData.set('description', formUpdateBook.description);
          formData.set('discount', formUpdateBook.discount);
          formData.set('sold', formUpdateBook.sold);
          formData.append('image', formUpdateBook.image[0], formUpdateBook.image[0].name);
          formData.append('pdf', formUpdateBook.pdf[0], formUpdateBook.pdf[0].name);
          
          const response = await API.patch(`/book/${number.id}`, formData, config);
          console.log("add book success : ", response);
          console.log("data : ", formData);
    
          navigate('/ListBook');
        } catch (error) { 
          console.log("add book failed : ", error);
        }
      });

    return(
        <Form onSubmit={(e) => handleSubmit.mutate(e)}  style={{padding:'65px 125px', position:'relative'}}>
        <div style={{fontSize:'36px'}}>Update
         Book</div>
        {/* <div style={{ color: 'red', fontSize: "20px", marginBottom: '42px', cursor: 'pointer' }} onClick={(e) => {navigate(`/ListBook`)}}>close</div> */}

        <Form.Group className="mb-3">
            <Form.Control type="text" name="author" value={formUpdateBook.author} onChange={handleChange} className='formAddBook' placeholder="Author"  required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="text" name="title" value={formUpdateBook.title} onChange={handleChange} className='formAddBook' placeholder="Title"  required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="text" name="publicationDate" value={formUpdateBook.publicationDate} onChange={handleChange} className='formAddBook'  placeholder="Publication Date" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="text" name="pages" value={formUpdateBook.pages} onChange={handleChange} className='formAddBook' placeholder="Pages" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="text" name="isbn" value={formUpdateBook.isbn} onChange={handleChange} className='formAddBook' placeholder="ISBN" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control type="number" name="price" value={formUpdateBook.price} onChange={handleChange} className='formAddBook' placeholder="Price" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control  type="number" value={formUpdateBook.discount} onChange={handleChange} className='formAddBook' name="discount" placeholder="Discount" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control as="textarea" className='formAddBook' value={formUpdateBook.description} onChange={handleChange} name="description" style={{ width: '1204px', height: '117px' }} placeholder="Description" required />
        </Form.Group>

        <Form.Group className="mb-3">
            <label >Pilih image</label>
            <Form.Control className='formAddBook'onChange={handleChange} name="image" type="file"/>
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

export default FormUpdateBook