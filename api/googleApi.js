export const searchOnline = async (text, id = 0) => {
    const apiLink = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'+text;
    const apiLink2 = 'https://www.googleapis.com/books/v1/volumes?q=:'+text;

    try {
        const response = await fetch(apiLink);
        const result = await response.json();

        const booksArray = [];

        if (response.ok && result.totalItems > 0) {
            for (let i = id; i < id + 5; i++) {
                const bookResult = result.items[i];

                const book = {
                    title: bookResult.volumeInfo.title,
                    subtitle: bookResult.volumeInfo.subtitle,
                    authors: bookResult.volumeInfo.authors,
                    publishedDate: bookResult.volumeInfo.publishedDate,
                    description: bookResult.volumeInfo.description,
                    pageCount: bookResult.volumeInfo.pageCount,
                    imageLinks: bookResult.volumeInfo.imageLinks,
                };

                booksArray.push(book);
            }
        } else {
            const generalResponse = await fetch(apiLink2);
            const result = await generalResponse.json();


            if (generalResponse.ok && result.totalItems > 0) {
                for (let i = id; i < id + 5; i++) {
                    const bookResult = result.items[i];

                    const book = {
                        id: bookResult.id,
                        title: bookResult.volumeInfo.title,
                        subtitle: bookResult.volumeInfo.subtitle,
                        authors: bookResult.volumeInfo.authors,
                        publishedDate: bookResult.volumeInfo.publishedDate,
                        description: bookResult.volumeInfo.description,
                        pageCount: bookResult.volumeInfo.pageCount,
                        imageLinks: bookResult.volumeInfo.imageLinks,
                    };

                    booksArray.push(book);
                }
            }
        }
        return booksArray;
    }catch (e) {
        console.log(e);
    }

};
