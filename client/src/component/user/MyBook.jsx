import React, { useContext, useState, useEffect } from 'react';
import { API } from '../../config/Api';
import { UserContext } from '../../context/UserContext';
import '../assets/index.css';

function MyBook() {
  const [state] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dataBook, setDataBook] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/transaction/${state.user.id}`);
        const dataBookById = response.data.data;
        setDataBook(dataBookById);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [state.user.id]);

  return (
    <>
      <div className='titleInformationMyBook'>MyBook</div>
  
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        dataBook.length === 0 ? (
          <div className='noDataMyBook'>"Belum memiliki transaksi"</div>
        ) : (
          <div className='containerMyBook'>
            {dataBook.map((data, index) => (
              <div key={index} className='listMyBooks'>
                {data.transactionBooks.map((item, subIndex) => (
                  <div key={subIndex} className='listMyBook'>
                    <div className='imageMyBook' style={{ backgroundImage: `url(${item.book.image})` }}></div>
                    <div className='titleMyBook'>{item.book.title}</div>
                    <div className='authorMyBook'>By. {item.book.author}</div>
                    <div className='downloadMyBook'>Download</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
  
}

export default MyBook;
