import '../assets/index.css'
import FolderImage from '../assets/img/folderImg'
import {UserContext} from "../../context/UserContext";
import {React, useContext, useState , useEffect} from 'react';
import {API} from '../../config/Api';
// import {useQuery} from 'react-query';


function CartTransaction () {
    const [state] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState({
        idCart:'',
        qty:'',
        total:'',
    })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await API.get(`/carts/${state.user.id}`);
            const dataBookById = response.data.data;
            setData(
              {
                idCart: dataBookById,
                qty : dataBookById.length,
                total: dataBookById.reduce((total, item) => total + item.book.price, 0),
              }
              );
              console.log("harga", dataBookById);
              console.log("response", dataBookById.length);
              console.log("responsetotal", dataBookById.reduce((total, item) => total + item.book.price, 0));
              
              setIsLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [state.user.id]);

    const hundleDeleteCartId = async (index) => {
        try {
            
          const response = await API.delete(`/cart/${index}`);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <>
        {isLoading ? (
            <div></div>
        ) :(
            <div className="containerCartTransaction">
                <div className="myCart">My Cart</div>
                <div className="reviewOrder">Review Your Order</div>
                <div className='boxReviewOrder'>
                    <div  className='boxCartOrder'>
                {data.idCart.map((item, index) => {
                    return( 
                            <div key={index} className="boxReviewCart">
                                <div className="boxCart">
                                    <div className="imageBoxCart" style={{backgroundImage: `url(${item.book.image})`}}></div>
                                    <div className="informationBoxCart">
                                        <div className="titleBoxCart">{item.book.title}</div>
                                        <div className="authiorBoxCart">By. {item.book.author}</div>
                                        <div className="priceBoxCart">Rp. {item.book.price.toLocaleString()}</div>
                                    </div>

                                    <div className="deleteBoxCart" style={{backgroundImage: `url(${FolderImage.Trash})`, cursor: 'pointer'}} onClick={()=>{hundleDeleteCartId(item.id)}}></div>

                                </div>
                            </div>
                        )
                    })}
                    </div>

                <div className="boxPriceCart">
                        <div className="Qty">
                            <div>Qty</div>
                            <div>{data.qty} book</div>
                        </div>
                        <div className="totalPrice">
                            <div>Total</div>
                            <div>Rp. {data.total.toLocaleString()}</div>
                        </div>

                        <div className="pay">Pay</div>
                    </div>
                </div>
                    
            </div>
        )
    }
        </>
    )
}

export default CartTransaction