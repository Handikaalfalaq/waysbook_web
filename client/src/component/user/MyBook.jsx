import '../assets/index.css'
import { UserContext } from '../../context/UserContext';
import {React, useContext, useState , useEffect} from 'react';
import {API} from '../../config/Api';

function MyBook() {
    const [state] = useContext(UserContext);
    console.log("ini state", state)
    const [isLoading, setIsLoading] = useState(true)

    const [dataBook, setDataBook] = useState(
        {
            idBook:'',
        }
    )

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await API.get(`/transaction/${state.user.id}`)
            const dataBookById = response.data.data;
            const dataBook = dataBookById[1].books.book
            console.log("datanya buku", dataBook);
            setDataBook(
              {
                idBook: dataBookById,
              }
              );
              
              setIsLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [state.user.id]);

    return (
        <>
            {isLoading ? (
                <div>kosong</div>
            ) : (
                <>
                <div className='titleInformationMyBook'>MyBook</div>
                    <div className='containerMyBook'>
                        {dataBook.idBook.map((item, index) => (
                            <div key={index} className='listMyBook'>
                                <div className='imageMyBook' style={{backgroundImage: `url(${item.books.book.image})`}}></div>
                                <div className='titleMyBook'>{item.books.book.title}</div>
                                <div className='authorMyBook'>By. {item.books.book.author}</div>
                                <div className='downloadMyBook'>Download</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>

           

        
    )
}

export default MyBook

