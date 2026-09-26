import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled     from 'styled-components'
import SideBar    from './Components/SideBar'
import Footer     from './Components/Footer'
import Dashboard  from './Pages/Dashboard'
import Projects   from './Pages/Projects'
import Tasks      from './Pages/Tasks'

const AppLayout = styled.div`
  display: grid;
  margin: 25px 10% 0;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr auto;
  min-height: calc(100vh - 25px);

  @media (max-width: 770px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    margin: 25px 10px 0;
  }
`

function App() {

  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <SideBar />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </main>
          <Footer />
        </AppLayout>
      </BrowserRouter>
    </>
  )
}

export default App
