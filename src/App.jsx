import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MenuProvider } from '@/Context/MenuContext'
import styled     from 'styled-components'
import SideBar    from './Components/SideBar'
import Dashboard  from './Pages/Dashboard'
import Projects   from './Pages/Projects'
import Tasks      from './Pages/Tasks'

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr auto;
  min-height: 100vh;

  @media (max-width: 770px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr auto;
  }
`

function App() {

  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <MenuProvider>
            <SideBar />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </main>
          </MenuProvider>
        </AppLayout>
      </BrowserRouter>
    </>
  )
}

export default App
