import '../assets/index.css'
import {useQuery, useMutation} from 'react-query';
import { API } from '../../config/Api';
import { useNavigate} from 'react-router-dom';
import {useState} from 'react'
import {Button, Modal} from 'react-bootstrap';

function ListAllBook(){
	const navigate = useNavigate()
	const [confirDelete, setConfirdelete] = useState(false)

	const [idDelete, setIdDelete] = useState()
	
	const {data: dataAllBook, refetch}= useQuery("dataAllBookCache", async () => {
        const response = await API.get("/books")
		console.log("data", dataAllBook)
        return response.data.data
        })

		const handleDelete = useMutation(async (idDelete) => {
			try {
			console.log("idnya", idDelete)
			const response = await API.delete(`/book/${idDelete}`); 
			console.log("delete buku success : ", response);
			setConfirdelete(false)
			} catch (error) {
			  console.log("delete buku failed : ", error);}
			}, {
				onSuccess: () => {
				  refetch();
				}
		  });


	return(
		<div style={{ margin: '50px 0px', width: '1300px' }}>
		<h1>List All Book</h1>
		<div className="boxBook">
			{dataAllBook?.map((item, index) => {
			return (
				<div className='controlLisBook' key={index}>
				<div className="boxDataBook">
					<div className='imageListAllBook' style={{ backgroundImage: `url(${item.image})` }}></div>
					<div className="informasiListAllBook">
					<div className="titleAllListAllBook">{item.title}</div>
					<div className="authorAllListAllBook">{item.author}</div>

					{item.discount !== 0 ? (
						<>
							<div className="priceAllListAllBookLine">Rp. {item.price.toLocaleString()}</div>
							<div className="priceAllListAllBook">Rp. {item.priceDiscount.toLocaleString()}</div>
						</>
					) : (
						<div className="priceAllListAllBook">Rp. {item.price.toLocaleString()}</div>
					)}

					<div className="descriptionAllListAllBook">{item.description}</div>
					<div className="soldAllListAllBook">Sold {item.sold} E-book</div>
					<div className="soldAllListAllBook">Total Rp. {`${(item.sold * item.price).toLocaleString()}`}</div>
					</div>
				</div>
				<div className="boxEventAllListAllBook">
					<div className='updateAllListAllBook' onClick={(e) => { navigate(`/UpdateBook/${item.id}`) }}>update</div>
					<div className='deleteAllListAllBook' onClick={() => { setConfirdelete(true); setIdDelete(item.id) }}>delete</div>
				</div>
				</div>
			);
			})}

			<Modal visible={confirDelete} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div style={{ backgroundColor: 'gray', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
				<div style={{ margin: 'auto', color: 'green' }}>Apakah buku ini akan dihapus?</div>
				<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
				<Button onClick={() => handleDelete.mutate(idDelete)}>Iya</Button>
				<Button onClick={() => setConfirdelete(false)}>Tidak</Button>
				</div>
			</div>
			</Modal>
		</div>
		</div>

	)
}

export default ListAllBook

