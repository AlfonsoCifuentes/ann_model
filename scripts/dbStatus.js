const mongoose = require('mongoose');

// Definir el schema
const photoSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: String,
  portfolioSection: String,
  featured: Boolean,
  status: String
});

const Photo = mongoose.model('Photo', photoSchema);

// Conectar y mostrar resumen
mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/')
  .then(async () => {
    console.log('🎯 RESUMEN FINAL DE LA BASE DE DATOS\n');
    
    const totalPhotos = await Photo.countDocuments();
    console.log(`📊 Total de fotos: ${totalPhotos}`);
    
    const activePhotos = await Photo.countDocuments({ status: 'active' });
    console.log(`✅ Fotos activas: ${activePhotos}`);
    
    const featuredPhotos = await Photo.countDocuments({ featured: true });
    console.log(`⭐ Fotos destacadas: ${featuredPhotos}`);
    
    const heroPhotos = await Photo.countDocuments({ portfolioSection: 'hero' });
    console.log(`🖼️  Fotos para hero: ${heroPhotos}`);
    
    const highlightPhotos = await Photo.countDocuments({ portfolioSection: 'highlights' });
    console.log(`🎨 Fotos para highlights: ${highlightPhotos}`);
    
    console.log('\n📋 DISTRIBUCIÓN POR CATEGORÍAS:');
    const categories = await Photo.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} fotos`);
    });
    
    console.log('\n🔥 FOTOS DESTACADAS:');
    const featured = await Photo.find({ featured: true }).select('title imageUrl portfolioSection');
    featured.forEach(photo => {
      const filename = photo.imageUrl.split('/').pop();
      console.log(`   ${filename} - ${photo.portfolioSection || 'portfolio'}`);
    });
    
    mongoose.connection.close();
    console.log('\n✨ Base de datos optimizada y lista para usar');
  })
  .catch(err => {
    console.error('❌ Error:', err);
    mongoose.connection.close();
  });
