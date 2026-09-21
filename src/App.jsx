import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import SideBar from './Components/SideBar'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Tasks from './Pages/Tasks'

const AppLayout = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f5f5f5;
`

function App() {

  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <SideBar />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </>
  )
}

export default App
