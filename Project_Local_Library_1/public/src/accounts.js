    function findAccountById(accounts, id) {
    return accounts.find(account => account.id === id)
  }
  
  function sortAccountsByLastName(accounts) {
    return accounts.sort((accountA, accountb) => accountA.name.last > accountb.name.last? 1 : -1);
  }
  
  function getTotalNumberOfBorrows(account, books) {
    const accountID = account.id
    const returnMethod = books.filter((book) => {
      for(let a in book.borrows){
        const borrowID = book.borrows[a].id;
        if(accountID === borrowID) return accountID
      }
    })
     return returnMethod.length
  }
  
  function getBooksPossessedByAccount(account, books, authors) {
    const accountID = account.id
    const returnMethod = books.filter(book => {
      for(let a in book.borrows){
        if(book.borrows[a].id === account.id && book.borrows[a].returned === false) return book
      }
    })
  //   console.log(returnMethod)
    const findAuthorMethod = authors.find(author => {
      if(author.id === returnMethod[0].authorId) return author;
    })
    returnMethod[0].author = findAuthorMethod;
  //   console.log(returnMethod)
    return returnMethod
  }
  
  module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
  };
  