import {UserContext} from "../context/UserContext";
import {React,  useContext} from 'react';
import './assets/index.css';
import { Container } from 'react-bootstrap';
import FolderImage from './assets/img/folderImg';
import {useQuery, useMutation} from 'react-query';
import {API} from '../config/Api';
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

function Home() {
    const navigate = useNavigate()
    const [state] = useContext(UserContext)
    
    const { data: transactionBook } = useQuery("transactionBookCache", async () => {
        const responseTransaction = await API.get(`/transaction/${state.user.id}`);
        const dataBookById = responseTransaction.data.data;
        console.log("transactionBook", transactionBook);
        console.log("transactionBook1", dataBookById);
        console.log("transactionBook2", dataBookById[0].transactionBooks[0].book.id);
      
        // Mencetak semua book.id
        const bookIds = dataBookById.flatMap((transaction) => {
          return transaction.transactionBooks.map((book) => book.book.id);
        });
        console.log("bookIds:", bookIds);
      
        return dataBookById;
      });
      
      

    const {data: dataAllBook, isLoading: isLoadingAllBook}= useQuery("dataAllTripCache", async () => {
    const response = await API.get("/books")
    return response.data.data
    })

    let dataSorted = [];
    let topTwoData = [];

    if (!isLoadingAllBook) {
    dataSorted = [...dataAllBook].sort((a, b) => b.sold - a.sold);
    topTwoData = dataSorted.slice(0, 2);
    }

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
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Buku sudah ada di keranjang',
                })
            console.log("add book failed : ", error)
        } 
    });

return (
    <Container className='containerHome'>
        <h1 className='titleHome'> 
            With us, you can shop online & help save your high street at the same time
        </h1>

        <div className='containerBookTop'>
            {topTwoData.map((item, index) => {
                return (
                    <div key={index} className='bookTop'>
                        <div className='imageBestSeller' style={{backgroundImage: `url(${FolderImage.BestSeller})`}}></div>
                        <div className='imageBook' style={{backgroundImage: `url(${item.image})`}}></div>
                        <div className='textBook'>
                            <div className='title' onClick={(e) => {navigate(`/DetailBook/${index}`)}}>{item.title}</div>
                            <div className='author'>By. {item.author}</div>
                            <div className='closing'>{item.description}</div>
                            <div className='closing'>{item.id}</div>

                            {item.discount !== 0 ? (
                                <div style={{display: 'flex', marginBottom: '10px'}}>
                                    <div className='priceListBookLine'>Rp. {item.price.toLocaleString()}</div>
                                    <div className='priceListBook'>Rp. {item.priceDiscount.toLocaleString()}</div>
                                </div>
                            ) : (
                                <div className='priceListBook'>Rp. {item.price.toLocaleString()}</div>
                            )}
                            

                                <button className='buttonCart' onClick={() => handleSubmit.mutate(item.id)}>Add to Cart</button>
                                

                        </div>
                    </div>
                )
            })}
             
        </div>

        <div className='textTitleListBook'>List Book</div>
        <div className='containerListBook'>
            {dataAllBook?.map((item, index) => {
                return(
                    <div key={index} className='listBook'>
                        <div className='imageListBook' style={{backgroundImage: `url(${item.image})`}}></div>
                        <div className='titleListBook' onClick={(e) => {navigate(`/DetailBook/${index}`)}}>{item.title}</div>
                        <div className='authorListBook'>{item.author}</div>

                        {item.discount !== 0 ? (
                            <div style={{display: 'flex', marginBottom: '10px'}}>
                                <div className='priceListBookLine'>Rp. {item.price.toLocaleString()}</div>
                                <div className='priceListBook'>Rp. {item.priceDiscount.toLocaleString()}</div>
                            </div>
                        ) : (
                            <div className='priceListBook'>Rp. {item.price.toLocaleString()}</div>
                        )}

                    </div>
                )
            })}
        </div>

    </Container>
);  
}

export default Home