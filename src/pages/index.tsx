export default function Home(props) {
  console.log(props.episodes)

  return (
    <>
      <h1>Index</h1>
      <p>{ JSON.stringify(props.episodes) }</p>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8 // Recebe um número em segundos que significa de quanto em quanto tempo eu quero gerar uma nova versão dessa página
  }
}