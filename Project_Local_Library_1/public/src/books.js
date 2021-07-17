function findAuthorById(authors, id) {
    return authors.find(author => (author.id === id))
  }
  
  function findBookById(books, id) {
    return books.find(book => (book.id === id))
  }
  
  function partitionBooksByBorrowedStatus(books) {
    const returnArray = [];
    const notReturned = books.filter(book => {
      for(let i in book.borrows){
        if(!book.borrows[i].returned) return book
      }
    })
    const returned = books.filter(book => {
      const returns = book.borrows.every(bookA => bookA.returned === true)
      if(returns) return book
    })
    returnArray.push(notReturned)
    returnArray.push(returned)
    return returnArray
  }
  
  function getBorrowersForBook(book, accounts) {
    const returnArray = accounts.reduce((accu, area, index) =>{
      for(let a in book.borrows){
        if(book.borrows[a].id === area.id){
          area.returned = book.borrows[a].returned
          accu.push(area)
        }
      }
      return accu;
    }, []);
    if(returnArray.length > 10){
      for(let i = 0; i < returnArray.length - 10; i++){
        returnArray.pop()
      }
    }
    return returnArray
  }
  
  module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
  };
  