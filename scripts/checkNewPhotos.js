const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: String,
  portfolioSection: String,
  featured: Boolean,
  status: String
});

const Photo = mongoose.model('Photo', photoSchema);

mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/')
  .then(async () => {
    console.log('Verificando nuevas fotos...');
    const newPhotos = await Photo.find({ imageUrl: { $regex: '/photos/otras/' } }).select('imageUrl title category portfolioSection featured');
    console.log(`Nuevas fotos encontradas: ${newPhotos.length}`);
    newPhotos.forEach(photo => {
      console.log(`- ${photo.imageUrl} (${photo.category}) - featured: ${photo.featured}, section: ${photo.portfolioSection}`);
    });
    
    // Ahora marcar algunas como destacadas
    const highlightUrls = [
      '/photos/otras/ana1.jpg',
      '/photos/otras/ana3.jpg',
      '/photos/otras/ana5.jpg',
      '/photos/otras/ana7.jpg',
      '/photos/otras/ana9.jpg',
      '/photos/otras/ana11.jpg'
    ];
    
    console.log('\nMarcando como highlights...');
    for (const url of highlightUrls) {
      const result = await Photo.updateOne(
        { imageUrl: url },
        { 
          $set: { 
            portfolioSection: 'highlights',
            featured: true 
          } 
        }
      );
      console.log(`${url}: ${result.modifiedCount > 0 ? 'actualizado' : 'no encontrado'}`);
    }
    
    mongoose.connection.close();
  })
  .catch(err => console.error('Error:', err));
