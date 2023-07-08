import {React, useState, useEffect, useContext} from 'react';
import FolderImage from "./assets/img/folderImg";
import "./assets/index.css";
import {API} from '../config/Api';
import { useParams } from "react-router-dom";
import {UserContext} from "../context/UserContext";
import { useMutation} from 'react-query';
import Swal from 'sweetalert2'
 
function InformasiDetailBook(){
    const number = useParams("id")
    const [state] = useContext(UserContext)

    const [data, setData] = useState(
        {
            idBook: '',
            author: '',
            title: '',
            publicationDate:'',
            pages:'',
            isbn:'',
            price:'',
            description:'',
            discount:0,
            priceDiscount:'',
            sold:0,
            image:'',
            pdf:'',
          }
    );

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await API.get(`/books`);
            const dataBookById = response.data.data[number.id];
            console.log("data", dataBookById)
            setData(
              {
                idBook: dataBookById.id,
                author: dataBookById.author,
                title: dataBookById.title,
                publicationDate: dataBookById.publicationDate,
                pages: dataBookById.pages,
                isbn: dataBookById.isbn,
                price: dataBookById.price,
                description:dataBookById.description,
                discount: dataBookById.discount,
                priceDiscount: dataBookById.priceDiscount,
                sold: dataBookById.sold,
                image: dataBookById.image,
                pdf: dataBookById.pdf,
              }
            );
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [number.id]);

    
      const handleSubmit = useMutation(async (id) => {
        try {
            // e.preventDefault();
            if ( !state.isLogin ) {
              return Swal.fire({
                  icon: 'warning',
                  title: 'Silahkan login terlebih dahulu',
                })
          }
          
            const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              };

            const formData = new FormData();
            formData.set('idBook', id);
            formData.set('idUser', state.user.id);
            
            const response = await API.post('/cart', formData, config);
            console.log("add book success : ", response);
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Buku sudah ada di keranjang',
          })
            console.log("add book failed : ", error)
        } 
    });


    return(
        <div className="containerDetailBook">
            <div className="detailBook">
                <div className="imageDetailBook" style={{backgroundImage: `url(${data.image})`}}></div>
                <div className="informationDetailBook">
                    <div className="titleDetailBook">{data.title}</div>
                    <div className="authorDetailBook">By. {data.author}</div>
                    <div className="publisherDetailBookTitle">Publication Date</div>
                    <div className="publisherDetailBook">{data.publicationDate}</div>
                    <div className="pageDetailBookTitle">Pages</div>
                    <div className="pageDetailBook">{data.pages} halaman</div>
                    <div className="isbnDetailBookTitle">ISBN</div>
                    <div className="isbnDetailBook">{data.isbn}</div>
                    <div className="priceDetailBookTitle">Price</div>

                    {data.discount !== 0 ? (
                        <div style={{display: 'flex', marginBottom: '10px'}}>
                            <div className='priceListBookLine'>Rp. {data.price.toLocaleString()}</div>
                            <div className='priceListBook'>Rp. {data.priceDiscount.toLocaleString()}</div>
                        </div>
                    ) : (
                        <div className='priceListBook'>Rp. {data.price.toLocaleString()}</div>
                    )}
                    
                </div>
            </div>

            <div className="description">
                <div className="aboutDetailBook">About This Book</div>
                <div className="descriptionDetailBook">
                    <p className="paragrafDetailBook">{data.description}</p>
                </div>
            </div>

            <div type="submit" className="addCartDetailBook" onClick={() => handleSubmit.mutate(data.idBook)}>
                <div className="addCart">Add Cart</div>
                <div style={{backgroundImage: `url(${FolderImage.IconCart})`, backgroundSize: 'cover', width:'33px', height:'30px', marginLeft:'15px'}}></div>
            </div>

          
        </div>
    )
}


export default InformasiDetailBook