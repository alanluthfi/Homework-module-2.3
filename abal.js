const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(bodyParser.json());

// Playlist model
class Song {
  constructor(title, artists, url) {
    this.title = title;
    this.artists = artists;
    this.url = url;
    this.playCount = 0;
  }
}

// Playlist array untuk menyimpan musik
let playlist = [];

// Menambahkan musik ke playlist
app.post('/playlist', (req, res) => {
  const { title, artists, url } = req.body;
  if (!title || !artists || !url) {
    return res.status(400).json({ error: 'Butuh Data title/artist/url' });
  }
  const song = new Song({id: playlist.length,title, artists, url});
  playlist.push(song);
  res.status(201).json({ message: 'Musik Berhasil Ditambahkan ke Playlist.', song });
});

// Memutar musik dari playlist
app.get('/playlist/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < playlist.length) {
    const song = playlist[index];
    song.playCount++;
    res.status(200).json({ message: 'Main Lagu:', song });
  } else {
    res.status(404).json({ error: 'Musik Tidak Ada.' });
  }
});

// Pengurutan berdasarkan jumlah putaran musik
app.get('/playlist', (req, res) => {
  const sortedPlaylist = [...playlist].sort((a, b) => b.playCount - a.playCount);
  res.status(200).json(sortedPlaylist);
});

// Memulai server
app.listen(3000, () => {
  console.log( `Server jalan pada alamat http://localhost:${port}/`);
});
