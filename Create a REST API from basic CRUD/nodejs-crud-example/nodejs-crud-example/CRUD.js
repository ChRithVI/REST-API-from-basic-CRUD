const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the CRUD API. Use /api/books to access the books resource.');

});


// Mock database for demonstration
let books = [
  { id: 1, title: 'Book 1', author: 'Pasan Udara', genre: 'Fiction' },
  { id: 2, title: 'Book 2', author: 'Nipun Dilshan', genre: 'Fiction' },
];

// Create (POST)
app.post('/api/books', (req, res) => {
  res.send('Create');
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Read (GET)
app.get('/api/books/:id', (req, res) => {
  res.send('Read');
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

// Update (PUT)
app.put('/api/books/:id', (req, res) => {
  res.send('Update-PUT');
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  books = books.map((book) => (book.id === bookId ? updatedBook : book));

  res.json(updatedBook);
});

// Partial Update (PATCH)
app.patch('/api/books/:id', (req, res) => {
  res.send('Update-Patch');
  const bookId = parseInt(req.params.id);
  const updatedFields = req.body;

  books = books.map((book) =>
    book.id === bookId ? { ...book, ...updatedFields } : book
  );

  const updatedBook = books.find((book) => book.id === bookId);

  res.json(updatedBook);
});

// Delete (DELETE)
app.delete('/api/books/:id', (req, res) => {
  res.send('Delete');
  const bookId = parseInt(req.params.id);
  books = books.filter((book) => book.id !== bookId);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
