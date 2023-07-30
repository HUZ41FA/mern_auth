import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Header/>
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  )
}

export default App
