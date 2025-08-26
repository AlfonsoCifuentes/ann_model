'use client'

export default function EnhancedHero({ collections = [] }) {
  console.log('🔥 ENHANCED HERO SIMPLE RENDERIZANDO')
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'red',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '50px',
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        border: '5px solid yellow'
      }}>
        🔥 ENHANCED HERO FUNCIONANDO 🔥
        <br />
        Collections: {collections.length}
        <br />
        Este texto DEBE ser visible
      </div>
    </div>
  )
}
