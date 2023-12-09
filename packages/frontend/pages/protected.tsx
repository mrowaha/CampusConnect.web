export default function SomePage() {

  return (
    <h1 style={{color : "black"}}>Hello</h1>
  )
}

export async function getStaticProps() {
  return {
    props : {
      protected : true
    }
  }
}