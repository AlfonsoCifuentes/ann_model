// Script para limpiar entradas de blog y crear las originales
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://alfonsocifuentes83:ErtOZ772VV0eofb5@cluster0.yxlkyhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  excerpt: {
    type: String,
    required: [true, 'El resumen es obligatorio'],
    trim: true,
    maxlength: [500, 'El resumen no puede exceder 500 caracteres']
  },
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  author: {
    type: String,
    default: 'Ana Nicoleta'
  },
  tags: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: String,
    default: '5 min de lectura'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Middleware para generar slug automáticamente
BlogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  next()
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

const originalPosts = [
  {
    title: 'Street Body Painting: Una Experiencia Única en la Ciudad',
    excerpt: 'Mi experiencia personal como modelo en una sesión de body painting urbano. Una colaboración artística que me llevó a los límites de mi zona de confort.',
    content: `Nunca pensé que aceptaría posar para una sesión de body painting en plena calle, pero cuando el equipo de producción me contactó para este proyecto tan especial, supe que tenía que hacerlo.

## La Propuesta

El concepto era revolucionario: combinar el arte corporal con el entorno urbano, creando una fusión entre el cuerpo humano como lienzo y la arquitectura de la ciudad. Como fotógrafa, entiendo la importancia de salir de la zona de confort para crear arte verdaderamente impactante.

## El Día de la Sesión

Llegué al punto de encuentro muy temprano por la mañana. El equipo ya estaba preparando todo: las pinturas, los pinceles, las cámaras. La maquilladora principal, Sofía, me explicó el proceso con tanto detalle y profesionalidad que inmediatamente me sentí en confianza.

### El Proceso de Transformación

El body painting tomó casi 3 horas. Sofía trabajó con una precisión increíble, cada trazo tenía un propósito. Me explicaba cada paso, me preguntaba si estaba cómoda, si tenía frío. Porque sí, hacía bastante frío esa mañana de octubre.

"No te preocupes, Ana", me decía mientras aplicaba los últimos detalles, "el arte requiere sacrificios, pero este va a ser espectacular".

## La Experiencia Como Modelo

Posar desnuda en la calle, aunque fuera en una zona controlada, fue inicialmente intimidante. Pero el equipo fotográfico fue absolutamente profesional. Cada miembro sabía exactamente qué hacer, cómo moverse, cómo crear el ambiente perfecto para que yo pudiera expresarme libremente.

El fotógrafo principal, Marcos, tiene una sensibilidad artística increíble. No solo capturaba imágenes, sino que me guiaba para encontrar poses que complementaran el arte corporal y el entorno urbano.

### Superando el Frío

Lo que más recuerdo de esa sesión es el frío. Madrid en octubre puede ser implacable, especialmente cuando no tienes ropa puesta. Pero el equipo estaba preparado: mantas térmicas entre tomas, calentadores portátiles, y bebidas calientes constantemente.

"Aguanta un poco más, Ana, esta luz es perfecta", me decía Marcos mientras yo tiritaba. Pero valió la pena cada segundo.

## El Resultado

Cuando vi las primeras imágenes en la pantalla de la cámara, me quedé sin palabras. La combinación del body painting con las texturas urbanas había creado algo mágico. No era solo una sesión de fotos, era una obra de arte colaborativa.

## Reflexiones

Esta experiencia me enseñó mucho sobre la confianza, el trabajo en equipo y los límites del arte. Como fotógrafa, siempre estoy detrás de la cámara, pero estar del otro lado me dio una perspectiva completamente nueva sobre el proceso creativo.

El respeto y la profesionalidad del equipo hicieron que una experiencia potencialmente incómoda se convirtiera en algo hermoso y empoderador. Definitivamente repetiría.

## Agradecimientos

Gracias a Sofía por su arte increíble, a Marcos por su visión fotográfica, y a todo el equipo de producción por hacer que me sintiera segura y respetada durante todo el proceso. El arte urbano nunca había tenido tanto significado para mí.`,
    image: '/photos/street_body_paint-1.jpg',
    slug: 'street-body-painting-experiencia-unica-ciudad',
    status: 'published',
    featured: true,
    tags: ['body painting', 'arte urbano', 'modelo', 'experiencia personal'],
    readTime: '6 min de lectura'
  },
  {
    title: 'Sesión Classy: Elegancia y Sofisticación',
    excerpt: 'Detrás de cámaras de mi sesión de fotos más elegante. Una experiencia que me conectó con mi lado más sofisticado y femenino.',
    content: `Cuando me propusieron hacer una sesión con el concepto "classy", inmediatamente supe que sería algo especial. Como fotógrafa profesional, rara vez tengo la oportunidad de estar frente a la cámara, especialmente en un proyecto tan refinado.

## La Visión del Proyecto

El equipo creativo quería capturar la esencia de la elegancia moderna. No se trataba solo de ropa bonita o poses estudiadas, sino de transmitir una actitud, una presencia que hablara de confianza y sofisticación natural.

"Ana, queremos que seas tú misma, pero elevada", me explicó la directora creativa, Carmen. "Tu personalidad natural ya tiene esa elegancia que buscamos".

## Preparación y Styling

### El Vestuario

La estilista, Lucía, había seleccionado piezas increíbles. Cada conjunto contaba una historia diferente: desde un blazer estructurado en negro que me hacía sentir poderosa, hasta un vestido de seda que fluía como agua cuando me movía.

"La ropa debe ser una extensión de tu personalidad", me decía mientras me ayudaba con los accesorios. "No queremos que te disfraces, queremos potenciar quien ya eres".

### Maquillaje y Peinado

El equipo de belleza fue excepcional. Marta, la maquilladora, creó un look que realzaba mis facciones sin ocultar mi personalidad. "Menos es más", repetía mientras aplicaba cada producto con precisión quirúrgica.

El peinado, a cargo de David, era elegante pero natural. "Tu cabello tiene vida propia", me decía mientras trabajaba, "solo vamos a guiar esa naturalidad hacia algo más estructurado".

## Durante la Sesión

### Encontrando mi Ritmo

Al principio me sentía un poco rígida. Estar acostumbrada a dirigir sesiones de fotos, no a protagonizarlas, me tenía algo nerviosa. Pero el fotógrafo, Roberto, tenía una manera muy relajada de trabajar.

"Olvídate de que soy yo", me decía. "Imagina que estás dirigiendo tu propia sesión. ¿Qué le dirías a tu modelo?"

Ese cambio de perspectiva fue clave. Comencé a moverme con más naturalidad, a encontrar ángulos que favorecieran no solo mi físico, sino que expresaran esa elegancia que buscábamos.

### La Química del Equipo

Lo que más me impresionó fue la sinergia del equipo. Cada persona sabía exactamente cuál era su rol y cómo contribuir al resultado final. Entre tomas, me daban consejos, me ajustaban detalles, me hacían sentir especial.

"Ana, eres una modelo natural", me decía la asistente de producción. "Se nota que entiendes la fotografía desde adentro".

## Momentos Destacados

### La Toma del Blazer

Hubo un momento, cuando llevaba el blazer negro estructurado, en que todo hizo clic. La luz era perfecta, mi postura estaba natural pero poderosa, y sentí que estaba transmitiendo exactamente lo que el proyecto necesitaba.

Roberto no paró de disparar. "Esto es oro puro", murmuraba mientras seguía capturando. "Mantén esa energía, Ana, es perfecta".

### El Vestido de Seda

Pero mi momento favorito fue con el vestido de seda color champagne. Había algo en cómo se movía la tela, en cómo la luz jugaba con el material, que me hizo sentir completamente en mi elemento.

"Muévete como si fueras agua", me guiaba Roberto. Y por un momento, realmente sentí que flotaba.

## Reflexiones Personales

### Aprendizajes Como Fotógrafa

Esta experiencia me dio una perspectiva completamente nueva sobre el trabajo con modelos. Entender las inseguridades, las pequeñas dudas, la importancia de sentirse cómoda y apoyada durante una sesión.

Ahora, cuando dirijo mis propias sesiones, recuerdo cómo me hizo sentir este equipo y trato de crear esa misma atmósfera de confianza y profesionalismo para mis modelos.

### Conexión Con Mi Feminidad

La sesión classy me permitió explorar un lado mío que a veces queda en segundo plano cuando estoy trabajando detrás de la cámara. Me conecté con mi feminidad, con mi elegancia natural, con esa parte de mí que a veces olvido nutrir.

"Eres hermosa tanto por dentro como por fuera", me dijo Carmen al final de la sesión. "Se nota en cada imagen".

## El Resultado Final

Cuando vi las imágenes editadas, no podía creer que esa fuera yo. Roberto había capturado no solo mi apariencia, sino mi esencia. Cada foto contaba una historia de elegancia, confianza y sofisticación natural.

## Agradecimientos

Gracias infinitas a todo el equipo: Roberto por su visión artística, Carmen por la dirección creativa impecable, Lucía por hacer que cada outfit fuera perfecto, Marta por el maquillaje de ensueño, y David por el peinado que me hizo sentir como una diosa.

Esta sesión no solo resultó en imágenes hermosas, sino que me recordó la importancia de permitirme ser vulnerable y explorar diferentes facetas de mi personalidad. Definitivamente una experiencia que atesoraré siempre.`,
    image: '/photos/classy-1.jpg',
    slug: 'sesion-classy-elegancia-sofisticacion',
    status: 'published',
    featured: true,
    tags: ['sesión classy', 'elegancia', 'moda', 'experiencia personal'],
    readTime: '7 min de lectura'
  },
  {
    title: 'Sesión de Maquillaje Artístico: Transformación Total',
    excerpt: 'Mi experiencia con un equipo excepcional de maquilladores profesionales. Una transformación que me llevó más allá de mis límites creativos.',
    content: `Cuando me contactaron para participar en una sesión de maquillaje artístico, sabía que sería algo completamente diferente a todo lo que había hecho antes. Como fotógrafa, siempre he admirado el trabajo de los maquilladores profesionales, pero nunca había sido el lienzo de su arte.

## La Propuesta Creativa

El concepto era ambicioso: crear una serie de looks de maquillaje que contaran diferentes historias, desde lo etéreo hasta lo dramático, usando mi rostro como base para explorar los límites del maquillaje artístico.

"Ana, tienes unas facciones perfectas para maquillaje editorial", me explicó la maquilladora principal, Isabella. "Podemos crear mundos enteros en tu cara".

## El Equipo de Ensueño

### Isabella - La Maquilladora Principal

Isabella no es solo una maquilladora, es una verdadera artista. Su experiencia en editoriales de moda internacional se notaba en cada trazo, en cada decisión de color. Tenía una visión clara de lo que quería lograr y la técnica para hacerlo realidad.

"El maquillaje artístico no se trata solo de hacer que alguien se vea hermosa", me explicaba mientras preparaba sus herramientas. "Se trata de transformar, de contar historias, de crear emociones".

### El Equipo de Apoyo

La asistente de Isabella, Carmen, era igualmente talentosa. Se encargaba de los detalles más minuciosos, de asegurar que cada elemento estuviera perfecto. Su atención al detalle era impresionante.

El fotógrafo, Miguel, entendía perfectamente cómo capturar maquillaje artístico. Sabía exactamente qué ángulos y qué iluminación harían que cada look brillara al máximo.

## La Experiencia de Transformación

### Primer Look: Etéreo

El primer look fue el más sutil pero igualmente impactante. Isabella creó un efecto de piel luminosa y etérea, con toques dorados que me hacían parecer como si tuviera luz propia.

"Quiero que te veas como una diosa del amanecer", me decía mientras aplicaba los últimos toques de highlighter. "Celestial pero accesible".

El proceso tomó dos horas, pero cada minuto valió la pena. Ver la transformación gradual en el espejo era hipnotizante. No solo cambiaba mi apariencia externa, sino que podía sentir cómo mi personalidad se adaptaba al look.

### Segundo Look: Dramático

Para el segundo look, Isabella decidió ir completamente al extremo opuesto. Colores intensos, líneas dramáticas, un maquillaje que gritaba poder y misterio.

"Ahora quiero que channels tu lado más oscuro y poderoso", me instruía mientras delineaba mis ojos con precisión milimétrica. "Quiero que te sientas como una reina guerrera".

### Tercer Look: Artístico Puro

El último look fue puro arte. Isabella utilizó mi rostro como un lienzo para crear algo que trascendía el maquillaje tradicional. Formas geométricas, colores inesperados, texturas que parecían salidas de una galería de arte contemporáneo.

"Este es mi favorito", me confesó mientras trabajaba en los detalles finales. "Aquí puedo mostrar realmente lo que es capaz de hacer el maquillaje artístico".

## Desafíos y Aprendizajes

### La Paciencia del Proceso

Cada look tomaba entre 2 y 3 horas. Como fotógrafa, estoy acostumbrada a ritmos rápidos, pero el maquillaje artístico requiere paciencia. Cada trazo es deliberado, cada decisión de color es pensada estratégicamente.

"El arte no se puede apurar", me recordaba Isabella cada vez que yo preguntaba cuánto faltaba. "La perfección toma tiempo".

### Mantener la Expresión

Durante las sesiones de fotos, tenía que mantener diferentes expresiones por períodos largos. Con maquillaje tan elaborado, cada movimiento facial podía afectar el resultado final.

Miguel era muy paciente conmigo. "Relájate, Ana. El maquillaje está hecho para moverse contigo, no contra ti".

### La Confianza en el Proceso

Hubo momentos, especialmente durante el look artístico, en que no podía ver el resultado final y tenía que confiar completamente en la visión de Isabella. Como alguien acostumbrada a tener control creativo, esto fue un ejercicio de humildad y confianza.

## Momentos Mágicos

### El Momento de Revelación

Cada vez que Isabella me giraba hacia el espejo para mostrarme el resultado final, era un momento mágico. La transformación era tan completa que a veces no me reconocía.

"¿Esa soy yo?", preguntaba cada vez, y Isabella sonreía con orgullo. "Esa eres tú, pero elevada, transformada, convertida en arte".

### La Química Creativa

Lo que más me impresionó fue la química creativa que se desarrolló entre todas nosotras. Isabella me explicaba su proceso, yo aportaba ideas desde mi perspectiva fotográfica, Carmen sugería ajustes técnicos, y Miguel capturaba todo de manera brillante.

### La Confianza Ganada

Con cada look, me sentía más cómoda con el proceso de transformación. Aprendí a relajarme, a confiar en el equipo, a disfrutar la experiencia de ser el lienzo en lugar de la artista.

## Reflexiones Personales

### Nueva Apreciación por el Maquillaje

Esta experiencia me dio una apreciación completamente nueva por el arte del maquillaje. Ver de primera mano la skill, la creatividad y la visión artística que requiere el maquillaje editorial me hizo valorar aún más a los profesionales de este campo.

### Lecciones para mi Trabajo

Como fotógrafa, ahora entiendo mejor la importancia de dar tiempo y espacio a los maquilladores durante mis sesiones. He visto lo que pueden lograr cuando se les permite trabajar sin prisas y con total libertad creativa.

### Salir de la Zona de Confort

Una vez más, esta experiencia me recordó la importancia de salir de mi zona de confort. Como fotógrafa, siempre estoy cómoda detrás de la cámara, pero estas experiencias como modelo me han dado una perspectiva invaluable.

## El Resultado Final

Las imágenes finales superaron todas mis expectativas. Miguel había capturado no solo el maquillaje, sino la esencia de cada transformación. Cada foto contaba una historia diferente, mostraba una faceta diferente de lo que es posible cuando el arte del maquillaje se combina con la fotografía profesional.

## Agradecimientos Infinitos

Gracias eternas a Isabella por su talento excepcional y su paciencia para enseñarme sobre su arte. A Carmen por su precisión y atención al detalle. A Miguel por capturar cada momento mágico de manera perfecta.

Esta experiencia no solo resultó en imágenes increíbles, sino que me conectó con una nueva forma de arte y me dio amistades profesionales que atesoro. Definitivamente un día que recordaré para siempre.

El maquillaje artístico no es solo sobre cambiar la apariencia; es sobre transformar la esencia, explorar identidades, y crear arte que trasciende lo ordinario. Gracias por permitirme ser parte de esa magia.`,
    image: '/photos/make-up_close_up-1.JPG',
    slug: 'sesion-maquillaje-artistico-transformacion-total',
    status: 'published',
    featured: false,
    tags: ['maquillaje artístico', 'transformación', 'experiencia personal', 'editorial'],
    readTime: '8 min de lectura'
  }
]

async function restoreOriginalPosts() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')
    
    // Eliminar todas las entradas actuales
    await BlogPost.deleteMany({})
    console.log('Entradas anteriores eliminadas')
    
    // Insertar las entradas originales
    let addedCount = 0
    
    for (const postData of originalPosts) {
      try {
        const post = new BlogPost(postData)
        await post.save()
        console.log(`✅ "${postData.title}" agregado exitosamente`)
        console.log(`   Slug: ${post.slug}`)
        console.log(`   ID: ${post._id}`)
        addedCount++
      } catch (error) {
        console.error(`❌ Error agregando "${postData.title}":`, error.message)
      }
    }
    
    console.log(`\n📊 Resumen:`)
    console.log(`   Posts restaurados: ${addedCount}`)
    
    // Mostrar todos los posts actuales
    const allPosts = await BlogPost.find({}).sort({ createdAt: -1 })
    console.log(`\n📝 Total de posts en la base de datos: ${allPosts.length}`)
    allPosts.forEach(post => {
      console.log(`   - ${post.title} (${post.status})`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\nDesconectado de MongoDB')
  }
}

restoreOriginalPosts()
