import actionTypes from '../actions/actionTypes';

const defaultList = [
	{
		key: 0,
		title: 'Harry Potter and the Philosopher\'s Stone',
		author: 'J.K Rowling',
		totalPages: 402,
		pagesRead: 30,
		img: 'https://images-na.ssl-images-amazon.com/images/I/51asM9eJMXL.jpg',
		sessionList: [],
	},
	{
		key: 1,
		title: 'Harry Potter 2',
		author: 'J.K Rowling',
		totalPages: 500,
		pagesRead: 99,
		img: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Harry_Potter_and_the_Chamber_of_Secrets_movie.jpg',
		sessionList: [],
	},
	{
		key: 2,
		title: 'Harry Potter 3',
		author: 'J.K Rowling',
		totalPages: 253,
		pagesRead: 22,
		img: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Prisoner_of_azkaban_UK_poster.jpg',
		sessionList: [],
	},
	{
		key: 3,
		title: 'Harry Potter 4',
		author: 'J.K Rowling',
		totalPages: 555,
		pagesRead: 355,
		img: 'https://4.bp.blogspot.com/-PDZs22feSOs/WnP4Kco03aI/AAAAAAAAAIE/r6LdLGP1CUA8uYMoiHP0sg11XhOtwJgZACLcBGAs/s1600/Goblet_of_Fire_Film_Poster.jpg',
		sessionList: [],
	},
	{
		key: 4,
		title: 'Harry Potter 5',
		author: 'J.K Rowling',
		totalPages: 242,
		pagesRead: 242,
		img: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Harry_Potter_and_the_Order_of_the_Phoenix_poster.jpg',
		sessionList: [],
	},{
		key: 5,
		title: 'Harry Potter',
		author: 'J.K Rowling',
		totalPages: 402,
		pagesRead: 30,
		img: 'https://images-na.ssl-images-amazon.com/images/I/51asM9eJMXL.jpg',
		sessionList: [],
	},
	{
		key: 6,
		title: 'Harry Potter 2',
		author: 'J.K Rowling',
		totalPages: 500,
		pagesRead: 99,
		img: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Harry_Potter_and_the_Chamber_of_Secrets_movie.jpg',
		sessionList: [],
	},
	{
		key: 7,
		title: 'Harry Potter 3',
		author: 'J.K Rowling',
		totalPages: 253,
		pagesRead: 22,
		img: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Prisoner_of_azkaban_UK_poster.jpg',
		sessionList: [],
	},
	{
		key: 8,
		title: 'Harry Potter 4',
		author: 'J.K Rowling',
		totalPages: 555,
		pagesRead: 355,
		img: 'https://4.bp.blogspot.com/-PDZs22feSOs/WnP4Kco03aI/AAAAAAAAAIE/r6LdLGP1CUA8uYMoiHP0sg11XhOtwJgZACLcBGAs/s1600/Goblet_of_Fire_Film_Poster.jpg',
		sessionList: [],
	},
	{
		key: 9,
		title: 'Harry Potter 5',
		author: 'J.K Rowling',
		totalPages: 242,
		pagesRead: 242,
		img: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Harry_Potter_and_the_Order_of_the_Phoenix_poster.jpg',
		sessionList: [],
	},{
		key: 10,
		title: 'Harry Potter',
		author: 'J.K Rowling',
		totalPages: 402,
		pagesRead: 30,
		img: 'https://images-na.ssl-images-amazon.com/images/I/51asM9eJMXL.jpg',
		sessionList: [],
	},
	{
		key: 11,
		title: 'Harry Potter 2',
		author: 'J.K Rowling',
		totalPages: 500,
		pagesRead: 99,
		img: 'https://upload.wikimedia.org/wikipedia/en/c/c0/Harry_Potter_and_the_Chamber_of_Secrets_movie.jpg',
		sessionList: [],
	},
	{
		key: 12,
		title: 'Harry Potter 3',
		author: 'J.K Rowling',
		totalPages: 253,
		pagesRead: 22,
		img: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Prisoner_of_azkaban_UK_poster.jpg',
		sessionList: [],
	},
	{
		key: 13,
		title: 'Harry Potter 4',
		author: 'J.K Rowling',
		totalPages: 555,
		pagesRead: 355,
		img: 'https://4.bp.blogspot.com/-PDZs22feSOs/WnP4Kco03aI/AAAAAAAAAIE/r6LdLGP1CUA8uYMoiHP0sg11XhOtwJgZACLcBGAs/s1600/Goblet_of_Fire_Film_Poster.jpg',
		sessionList: [],
	},
	{
		key: 14,
		title: 'Harry Potter 5',
		author: 'J.K Rowling',
		totalPages: 242,
		pagesRead: 242,
		img: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Harry_Potter_and_the_Order_of_the_Phoenix_poster.jpg',
		sessionList: [],
	},
];

const bookReducer = (state = defaultList, action) => {
	switch (action.type) {
	case actionTypes.ADD_BOOK:
		return [...state, action.payload];
	case actionTypes.DELETE_BOOK:
		state = state.filter(item => {
			return !Object.is(item, action.payload);
		});
		return [...state];
	default:
		return [...state];
	}
};

export default bookReducer;
