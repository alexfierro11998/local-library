function getTotalBooksCount(books) {
    return books.length
  }
  
  function getTotalAccountsCount(accounts) {
    return accounts.length
  }
  
  function getBooksBorrowedCount(books) {
    const returnMethod = books.reduce((accu, area, index) => {
      const returnedTrue = area.borrows.some(currentBook =>{
          if(!currentBook.returned)return true
      })
      if(returnedTrue)accu++
      return accu
    }, 0)
    return returnMethod
  }
  
  function getMostCommonGenres(books) {
    let hist = 0, sci = 0, clas = 0, trav = 0, yAdu = 0, nFic =0;
    books.forEach(park => {
      switch (park.genre){
        case "Historical Fiction":
          hist++;
          break;
        case "Science":
          sci++;
          break;
        case "Classics":
          clas++;
          break;
        case "Travel":
          trav++;
          break;
        case "Young Adult":
          yAdu++;
          break;
        case "Nonfiction":
          nFic++;
          break;
      }
    })
    const getNames = books.reduce((accu, area) => {
      if(!accu.includes(area.genre)){
        accu.push(area.genre)
      }
      return accu
    }, [])
    const returnArray = [];
    for(let a in getNames){
      switch (getNames[a]){
        case "Historical Fiction":
          returnArray.push({["name"]: getNames[a], ["count"]: hist})
          break;
        case "Science":
          returnArray.push({["name"]: getNames[a], ["count"]: sci})
          break;
        case "Classics":
          returnArray.push({["name"]: getNames[a],["count"]: clas});
          break;
        case "Travel":
          returnArray.push({["name"]: getNames[a],["count"]: trav})
          break;
        case "Young Adult":
          returnArray.push({["name"]: getNames[a],["count"]: yAdu})
          break;
        case "Nonfiction":
          returnArray.push({["name"]: getNames[a],["count"]: nFic})
          break;
      }
    }
    const sortedArray = returnArray.sort((nameA, nameB) => {
       return nameA.count < nameB.count ? 1: -1
    })
    resultShortener(5, sortedArray)
    console.log(sortedArray)
    return sortedArray
  }
  
  function getMostPopularBooks(books) {
    const returnMethod = books.reduce((accu, {title,borrows}) =>{
      accu.push({["name"]: title, ["count"]: borrows.length})
      return accu;
    }, [])
    const sortedMethod = returnMethod.sort((bookA, bookB) =>{
      return bookA.count < bookB.count ? 1 : -1
    })
    resultShortener(5, sortedMethod)
    console.log(sortedMethod)
    return sortedMethod
  }
  
  function getMostPopularAuthors(books, authors) {
    const countPerAuthor = authors.reduce((accuAuthor, {id, name}) => {
      const breakdownBooks = books.reduce((accumulatorBooks, area) =>{
        if(id === area.authorId)accumulatorBooks += area.borrows.length;
        return accumulatorBooks
      }, 0)
      accuAuthor.push({["name"]: `${name.first} ${name.last}`, ["count"]: breakdownBooks})
      return accuAuthor
    }, [])
    const sortFinal = countPerAuthor.sort((stringA, stringB) => stringA.count < stringB.count ? 1 : -1)
    resultShortener(5, sortFinal)
    console.log(sortFinal)
    return sortFinal;
  }
  
  function resultShortener(desiredLength, inputArray){
    if(inputArray.length > desiredLength){
  
      const limit = inputArray.length - desiredLength
      console.log(limit)
      for(let i = 0; i < limit; i++){
        inputArray.pop();
      }
    }
  }
  
  module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
  };
  