function TransactionList() {
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
            <div className="gridListBook" >
                <div className="transactionLish"> 1</div>
                <div className="transactionLish">handika</div>
                <div className="transactionLish">sebuah seni untuk bersikap bodo amat</div>
                <div className="transactionLish" style={{ color: '#0ACF83'}}>Rp.134.000</div>
                <div className="transactionLish" style={{ color: '#0ACF83'}}>Approve</div>
            </div>

            <div className="gridListBook" >
                <div className="transactionLish"> 1</div>
                <div className="transactionLish">handika</div>
                <div className="transactionLish">sebuah seni untuk bersikap bodo amat</div>
                <div className="transactionLish" style={{ color: '#0ACF83'}}>Rp.134.000</div>
                <div className="transactionLish" style={{ color: '#0ACF83'}}>Approve</div>
            </div>

            <div className="gridListBook" >
                <div className="transactionLish"> 1</div>
                <div className="transactionLish">handika</div>
                <div className="transactionLish">sebuah seni untuk bersikap bodo amat</div>
                <div className="transactionLish" style={{ color: '#0ACF83'}}>Rp.134.000</div>
                <div className="transactionLish" style={{ color: '#0ACF83'}}>Approve</div>
            </div>
        </div>
    )}

export default TransactionList