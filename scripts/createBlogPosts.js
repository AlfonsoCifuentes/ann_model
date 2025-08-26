const mongoose = require('mongoose');

// Schema del blog
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  image: { type: String, required: true }, // Cambiado de coverImage a image
  status: { type: String, enum: ['draft', 'published'], default: 'published' }, // Cambiado de published boolean a status string
  author: { type: String, default: 'Ana Nicoleta' },
  tags: [String],
  featured: { type: Boolean, default: false },
  readTime: String,
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

async function createNewBlogPosts() {
  try {
    await mongoose.connect('mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/');
    
    console.log('🗑️ Eliminando entradas anteriores del blog...');
    await BlogPost.deleteMany({});
    
    console.log('✍️ Creando nuevas entradas del blog desde la perspectiva de Ana...\n');
    
    // 1. Body Paint Urbano - Experiencia personal
    const bodyPaintPost = new BlogPost({
      title: 'Mi Experiencia con Body Paint en la Ciudad: Arte y Resistencia',
      slug: 'body-paint-urbano-experiencia-personal',
      excerpt: 'Una sesión intensa donde el arte corporal se encuentra con el ambiente urbano. Te cuento cómo fue enfrentarme al frío de la ciudad mientras creábamos arte en mi piel.',
      content: `# Mi Experiencia con Body Paint en la Ciudad: Arte y Resistencia

Cuando me propusieron hacer una sesión de body paint en plena ciudad, sabía que sería un reto. Pero nunca imaginé lo intensa que llegaría a ser esta experiencia.

## El Equipo Profesional

Desde el primer momento, me impresionó la profesionalidad del equipo. Las maquilladoras llegaron con todo su arsenal de pinturas especiales, pinceles de diferentes tamaños y una paciencia infinita. Durante las tres horas que duró el maquillaje, me explicaron cada técnica, cada color que elegían, y cómo el diseño se adaptaría a los movimientos de mi cuerpo.

"Ana, esto va a ser espectacular", me decía María, la maquilladora principal, mientras aplicaba los primeros trazos azules que simularían el cielo urbano en mi espalda. Su entusiasmo era contagioso.

## El Frío de la Ciudad

Lo que no había anticipado era el frío. Estar prácticamente desnuda en las calles de la ciudad, incluso en una zona cerrada al tráfico, fue una prueba de resistencia. El viento se colaba entre los edificios y cada ráfaga me recordaba lo vulnerable que estaba mi piel desnuda.

Pero aquí es donde brilló aún más la humanidad del equipo. Cada pocos minutos, el fotógrafo paraba para preguntarme cómo me sentía. Las maquilladoras tenían mantas térmicas listas entre toma y toma. Nunca me sentí desatendida o como un simple objeto para la foto.

## La Transformación

Mientras pintaban mi cuerpo, me sentía transformándome en algo más que Ana. Era como si estuviera convirtiéndome en parte del paisaje urbano, en una extensión artística de la ciudad misma. Los colores grises y azules de los edificios se fundían con mi piel, creando una simbiosis perfecta entre lo humano y lo arquitectónico.

La sensación de las pinturas secándose en mi piel era extraña pero fascinante. Era como llevar puesta la ciudad.

## El Resultado

Cuando vi las primeras fotos en la cámara del fotógrafo, no me reconocí. Era arte puro. Mi cuerpo se había convertido en un lienzo que contaba la historia de la ciudad, de sus texturas, de su frialdad pero también de su belleza.

Esta experiencia me enseñó que el arte verdadero a menudo requiere salir de nuestra zona de confort. Sí, pasé frío. Sí, fue incómodo en algunos momentos. Pero el resultado final y la experiencia humana que compartí con el equipo hicieron que valiera completamente la pena.

## Reflexiones Finales

El body paint urbano no es solo una técnica artística; es una declaración. Es decir que el cuerpo humano puede ser tan hermoso y expresivo como cualquier edificio o estructura urbana. Es reclamar la ciudad como un espacio donde el arte y la humanidad pueden coexistir.

Gracias a todo el equipo que hizo posible esta experiencia. Su profesionalismo y cuidado constante por mi bienestar convirtieron lo que podría haber sido una sesión difícil en una de las experiencias artísticas más memorables de mi carrera.`,
      image: '/photos/otras/street_body_paint-1.jpg',
      status: 'published',
      tags: ['body-paint', 'arte-urbano', 'experiencia-personal', 'trabajo-en-equipo'],
      featured: true,
      readTime: '6 min de lectura'
    });

    // 2. Elegancia Clásica - Reflexión sobre el estilo
    const elegancePost = new BlogPost({
      title: 'Elegancia Clásica: Redescubriendo la Belleza Atemporal',
      slug: 'elegancia-clasica-belleza-atemporal',
      excerpt: 'En un mundo de tendencias efímeras, hay algo poderoso en volver a los clásicos. Te cuento sobre mi sesión de elegancia clásica y lo que significa para mí este estilo.',
      content: `# Elegancia Clásica: Redescubriendo la Belleza Atemporal

En un mundo saturado de tendencias que cambian cada semana, decidí explorar algo completamente diferente: la elegancia clásica. Esta sesión fue más que una simple producción fotográfica; fue un viaje personal hacia la sofisticación atemporal.

## La Preparación

Para esta sesión, cada detalle fue cuidadosamente planificado. Desde la selección del vestuario hasta el maquillaje, todo debía respirar clase y sofisticación. Opté por tonos neutros, líneas limpias y una estética que podría haber sido perfecta tanto hace cincuenta años como dentro de cincuenta años más.

## El Arte de la Simplicidad

Lo que más me fascinó durante esta sesión fue descubrir que la verdadera elegancia no viene de elementos complicados o extravagantes. Al contrario, se trata de la perfección en la simplicidad. Cada pose, cada mirada, cada gesto debía ser mesurado y deliberado.

El fotógrafo me guió hacia una expresión más contenida, más misteriosa. "La elegancia clásica no grita", me decía, "susurra". Y tenía razón.

## La Transformación Mental

Mientras posaba para estas fotografías, sentí cómo mi postura cambiaba naturalmente. Me erguía más, mis movimientos se volvían más fluidos y controlados. Era como si el estilo clásico hubiera activado una versión más refinada de mí misma.

Esta experiencia me recordó que la elegancia no es solo una cuestión de ropa o maquillaje; es una actitud, una forma de habitar el espacio con confianza y gracia.

## Reflexiones sobre la Feminidad

La sesión me hizo reflexionar profundamente sobre los diferentes aspectos de la feminidad. Mientras que mis trabajos más experimentales exploran la fuerza y la provocación, esta sesión celebraba la sutileza y el poder silencioso de la elegancia femenina.

No es que un estilo sea mejor que otro; son diferentes facetas de la misma gema. Cada una tiene su lugar y su momento.

## El Resultado

Las fotografías resultantes capturan algo que va más allá de la superficie. Hay una calidad etérea en ellas, una elegancia que trasciende el tiempo. Son imágenes que podrían pertenecer a cualquier época, y esa es precisamente su fuerza.

## Para Futuras Colaboraciones

Esta experiencia me ha inspirado a seguir explorando estilos diversos. La belleza está en la versatilidad, en la capacidad de reinventarse manteniendo siempre la autenticidad personal.

Si eres fotógrafo o director creativo y estás buscando colaborar en proyectos que celebren la elegancia clásica, estaría encantada de explorar nuevas ideas juntos.`,
      image: '/photos/otras/classy-1.jpg',
      status: 'published',
      tags: ['elegancia', 'estilo-clasico', 'feminidad', 'fotografia-artistica'],
      featured: false,
      readTime: '4 min de lectura'
    });

    // 3. Maquillaje Artístico - Técnicas y proceso creativo
    const makeupPost = new BlogPost({
      title: 'El Arte del Maquillaje: Cuando la Cara se Convierte en Lienzo',
      slug: 'arte-maquillaje-cara-lienzo-creativo',
      excerpt: 'El maquillaje artístico va mucho más allá de la belleza convencional. Te llevo detrás de cámaras de mis sesiones más creativas y lo que significa ser lienzo viviente.',
      content: `# El Arte del Maquillaje: Cuando la Cara se Convierte en Lienzo

Hay momentos en mi carrera donde dejo de ser Ana para convertirme en una obra de arte viviente. Las sesiones de maquillaje artístico son esos momentos mágicos donde mi rostro se transforma en un lienzo para la creatividad más pura.

## Más Allá de la Belleza Convencional

Cuando trabajo con maquilladores artísticos, sabemos que vamos a explorar territorios desconocidos. No se trata de realzar mi belleza natural (aunque eso siempre es bonito), sino de crear algo completamente nuevo, algo que nunca antes ha existido.

La primera vez que vi mi cara completamente transformada por maquillaje artístico, fue impactante. Por un momento, no me reconocí. Y eso era exactamente el punto.

## El Proceso Creativo

Cada sesión de maquillaje artístico comienza con una conversación. El maquillador y yo exploramos ideas, conceptos, emociones que queremos transmitir. ¿Vamos por algo futurista? ¿Algo orgánico y natural? ¿O quizás algo completamente abstracto?

Durante las horas que dura la aplicación, me convierto en participante activa del proceso creativo. Doy mi opinión, sugiero ajustes, y juntos vamos moldeando la visión final.

## La Paciencia Como Virtude

Lo que muchos no ven es la paciencia que requiere este tipo de trabajo. Estar inmóvil durante 2-3 horas mientras delicados pinceles trabajan en tu rostro requiere una disciplina mental especial. Es casi meditativo.

Aprendo a relajar cada músculo facial, a controlar mi respiración, a encontrar comodidad en la quietud. Es un ejercicio de mindfulness que me ha ayudado mucho en otros aspectos de mi vida.

## La Transformación Psicológica

Cuando el maquillaje está completo y me veo al espejo, algo cambia en mi psique. Adopto una personalidad diferente, una energía que corresponde a la nueva imagen. Si el maquillaje es futurista, me siento como venida del futuro. Si es orgánico, me conecto con algo más primitivo y natural.

Esta capacidad de transformación es lo que más amo de mi trabajo. Cada sesión es una oportunidad de explorar diferentes aspectos de la humanidad y la expresión.

## El Resultado Fotográfico

Las fotografías de maquillaje artístico capturan más que una imagen; capturan un concepto, una idea hecha visible. Son piezas que pueden vivir en galerías de arte tanto como en portfolios de moda.

## Colaboración y Respeto

Trabajar con maquilladores artísticos me ha enseñado muchísimo sobre colaboración creativa. Cada sesión es un diálogo entre dos artistas usando mi cara como medio de comunicación.

El respeto mutuo es fundamental. Ellos respetan mi experiencia como modelo y yo respeto su visión artística. Juntos creamos algo que ninguno podría lograr solo.

## Invitación a la Experimentación

Si eres maquillador artístico o estás considerando explorar este campo, te animo a que pienses más allá de las técnicas tradicionales. El rostro humano es un lienzo extraordinario con capacidades expresivas únicas.

Y si eres modelo, te invito a probar maquillaje artístico al menos una vez. La experiencia de transformación completa es algo que todo artista debería vivir.`,
      image: '/photos/otras/make-up_close_up-1.jpg',
      status: 'published',
      tags: ['maquillaje-artistico', 'transformacion', 'proceso-creativo', 'colaboracion'],
      featured: false,
      readTime: '5 min de lectura'
    });

    // Guardar todas las entradas
    await bodyPaintPost.save();
    await elegancePost.save();
    await makeupPost.save();

    console.log('✅ Entrada del blog: "Body Paint Urbano - Experiencia Personal"');
    console.log('✅ Entrada del blog: "Elegancia Clásica - Belleza Atemporal"');
    console.log('✅ Entrada del blog: "El Arte del Maquillaje"');

    const totalPosts = await BlogPost.countDocuments();
    console.log(`\n📊 Total de entradas creadas: ${totalPosts}`);
    console.log('🎯 Blog actualizado con experiencias auténticas de Ana Nicoleta');

    mongoose.connection.close();

  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
}

createNewBlogPosts();
