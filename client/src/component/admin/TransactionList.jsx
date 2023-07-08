import { React, useContext, useState, useEffect } from 'react';
import { API } from '../../config/Api';
import { UserContext } from '../../context/UserContext';


function TransactionList() {
    const [state] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [dataTransaction, setDataTransaction] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await API.get(`/transactions`);
            const dataTransactionById = response.data.data;
            setDataTransaction(dataTransactionById);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        };

        fetchData();
    }, [state.user.id]);



    const DataList = [
        "No",
        "Usert",
        "Book Purchased",
        "Total Payment",
        "Status Payment",
      ];


    return (
        <div className="containerTransactionList">
            <div className="titleIncomingTransaction">Incoming Transaction</div>
            <div className="gridListBook" >
                {DataList.map((item, index) => (
                <div key={index} className="transactionLishTitle"> {item} </div>
                ))}
            </div>
            
            {isLoading ? (
            <div>Belum ada transaksi</div>
            ) : (
                <div>
                    {dataTransaction.map((item, index) => (
                        <div key={index} className="gridListBook" >
                            <div className="transactionLish">{index + 1}</div>
                            <div className="transactionLish">{item.user.fullName}</div>
                            
                            <div key={index} className="transactionLish">
                                {item.transactionBooks.map((item, index) => (
                                    <div key={index} >
                                        {index + 1}.{item.book.title}
                                    </div>
                                ))}
                            </div>

                            <div className="transactionLish">
                                Rp. {item.transactionBooks.reduce((total, item) => total + item.book.price, 0).toLocaleString()}
                            </div>

                            <div className="transactionLish" style={{ color: '#0ACF83' }}>Approve</div>
                        </div>
                    ))}
                </div>
            )}


        </div>
    )}

export default TransactionList
