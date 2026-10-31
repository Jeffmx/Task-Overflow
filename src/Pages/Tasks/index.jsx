import styled from "styled-components"
import { useState, useMemo, useEffect } from "react"
import { useDados } from "@/Hooks/useDados"
import TittleHolder from "@/Components/TittleHolder"
import MenuMobile from "@/Components/MenuMobile"
import Button from "@/Components/Button"
import Input from "@/Components/Input"
import searchIcon from "@/assets/search.svg"

// --- TANSTACK IMPORTS ---
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'

// --- ESTILOS CIRÚRGICOS (Baseados na imagem) ---
const TaskContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`

const ShowCase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
  flex-wrap: wrap;
`

const FilterHolder = styled.div`
  display: flex; 
  align-items: center;
  background-color: #f4f7fb; /* Fundo azulado claro da imagem */
  padding: 4px;
  border-radius: 8px;
  gap: 4px;

  button {
    background: none;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    color: #555;
    font-size: 0.85rem;
    transition: 0.2s;
    
    &.active {
      background-color: #fff;
      color: #0052cc;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  }
`

const TableWrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 10px 20px;
  border: 1px solid #eef2f6;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    padding: 16px 10px;
    color: #7a869a;
    font-weight: 500;
    font-size: 0.85rem;
    border-bottom: 1px solid #eef2f6;
  }

  td {
    padding: 16px 10px;
    border-bottom: 1px solid #eef2f6;
    vertical-align: middle;
    font-size: 0.9rem;
    color: #172b4d;
  }

  tbody tr {
    transition: background 0.2s;
    &:hover { background-color: #fafbfc; }
  }
`

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  
  background-color: ${props => {
    switch (props.$type) {
      case 'Alta': return '#ffebe6';
      case 'Média': return '#fff0b3';
      case 'Baixa': return '#e3e8ee';
      case 'Concluída': return '#e3fcef';
      case 'Em Andamento': return '#deebff';
      case 'Pendente': return '#ffebe6';
      default: return '#e3e8ee';
    }
  }};
  
  color: ${props => {
    switch (props.$type) {
      case 'Alta': return '#de350b';
      case 'Média': return '#974f0c';
      case 'Baixa': return '#42526e';
      case 'Concluída': return '#006644';
      case 'Em Andamento': return '#0052cc';
      case 'Pendente': return '#de350b';
      default: return '#42526e';
    }
  }};
`

const ProjectDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => props.$color || '#ccc'};
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #0052cc;
`

const PaginationContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 20px;
  align-items: center;
`

const PageButton = styled.button`
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid ${props => props.$active ? '#0052cc' : '#dfe1e6'};
  background: ${props => props.$active ? '#0052cc' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#42526e'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  font-size: 0.9rem;
  font-weight: 500;

  &:hover:not(:disabled) {
    background: ${props => props.$active ? '#0052cc' : '#f4f5f7'};
  }
`

const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(9, 30, 66, 0.54);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white; 
  padding: 24px; 
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25);
`

// --- COMPONENTE PRINCIPAL ---
const options = [
  { name: "Todas", value: "all" },
  { name: "Pendentes", value: "Pendente" },
  { name: "Em andamento", value: "Em Andamento" },
  { name: "Concluídas", value: "Concluída" }
]

export default function Tasks() {
  const { data } = useDados()
  
  // CORREÇÃO DO BUG: Sincroniza o estado local com os dados que chegam do useDados
  const [tarefas, setTarefas] = useState([])
  useEffect(() => {
    if (data.tasks && data.tasks.length > 0) {
      setTarefas(data.tasks)
    }
  }, [data.tasks])

  const [busca, setBusca] = useState("")
  const [filtroAtivo, setFiltroAtivo] = useState("all")
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null)

  const concluirTarefa = (id) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, status: 'Concluída' } : t))
    if (tarefaSelecionada?.id === id) setTarefaSelecionada(null)
  }

  // 1. Filtrando os dados antes de enviar para o TanStack
  const dadosFiltrados = useMemo(() => {
    return tarefas.filter(task => {
      const matchBusca = task.titulo.toLowerCase().includes(busca.toLowerCase())
      const matchStatus = filtroAtivo === "all" || task.status === filtroAtivo
      return matchBusca && matchStatus
    })
  }, [tarefas, busca, filtroAtivo])

  // 2. Definição das Colunas para o TanStack
  const columns = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
          onClick={(e) => e.stopPropagation()} // Evita abrir o modal ao clicar no checkbox
        />
      ),
      size: 40,
    },
    {
      accessorKey: 'titulo',
      header: 'Tarefa',
      cell: ({ row }) => (
        <div>
          <div style={{ fontWeight: 600, color: '#172b4d' }}>{row.original.titulo}</div>
          <div style={{ fontSize: '0.8rem', color: '#7a869a', marginTop: '4px' }}>{row.original.desc}</div>
        </div>
      ),
    },
    {
      accessorKey: 'projectId',
      header: 'Projeto',
      cell: ({ row }) => {
        const project = data.projects.find(p => p.id === row.original.projectId)
        const colors = ['#0052cc', '#ffab00', '#36b37e', '#6554c0', '#00b8d9']
        const color = colors[row.original.projectId?.charCodeAt(5) % colors.length] || '#ccc'
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ProjectDot $color={color} />
            {project?.titulo || 'Sem projeto'}
          </div>
        )
      },
    },
    {
      accessorKey: 'prioridade',
      header: 'Prioridade',
      cell: ({ getValue }) => <Badge $type={getValue()}>{getValue()}</Badge>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => <Badge $type={getValue()}>{getValue()}</Badge>,
    },
    {
      id: 'actions',
      header: '...',
      cell: ({ row }) => (
        <div style={{ cursor: 'pointer', fontWeight: 'bold', color: '#7a869a' }} onClick={(e) => { e.stopPropagation(); setTarefaSelecionada(row.original) }}>
          ⋮
        </div>
      )
    }
  ], [data.projects])

  // 3. Configuração da Tabela (TanStack)
  const table = useReactTable({
    data: dadosFiltrados,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 }
    }
  })

  // Reseta paginação ao buscar/filtrar
  useEffect(() => {
    table.setPageIndex(0)
  }, [busca, filtroAtivo, table])

  return (
    <TaskContainer>
      <TittleHolder title="Tasks" desc="Gerencie suas tarefas e mantenha o foco no que importa.">
        <Button>+ Nova Tarefa</Button>
        <MenuMobile />
      </TittleHolder>

      <ShowCase>
        <FilterHolder>
          {options.map((option) => (
            <button 
              key={option.value}
              className={filtroAtivo === option.value ? 'active' : ''}
              onClick={() => setFiltroAtivo(option.value)}
            >
              {option.name}
            </button>
          ))}
        </FilterHolder>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #dfe1e6', borderRadius: '6px', padding: '0 10px' }}>
           <Input
            type="text"
            placeholder="Buscar tarefas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            icon={searchIcon}
            style={{ border: 'none', outline: 'none' }}
          />
        </div>
      </ShowCase>

      <TableWrapper>
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ width: header.getSize() !== 150 ? header.getSize() : 'auto' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} onClick={() => setTarefaSelecionada(row.original)} style={{ cursor: 'pointer' }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>

        {/* PAGINAÇÃO IDÊNTICA À IMAGEM */}
        <PaginationContainer>
          <PageButton 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </PageButton>
          
          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(page => (
            <PageButton 
              key={page}
              onClick={() => table.setPageIndex(page - 1)}
              $active={table.getState().pagination.pageIndex === page - 1}
            >
              {page}
            </PageButton>
          ))}

          <PageButton 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </PageButton>
        </PaginationContainer>
      </TableWrapper>

      {/* MODAL */}
      {tarefaSelecionada && (
        <ModalOverlay onClick={() => setTarefaSelecionada(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 15px 0', color: '#172b4d', fontSize: '1.2rem' }}>Editar Tarefa</h2>
            <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><strong>Título:</strong> {tarefaSelecionada.titulo}</p>
            <p style={{ margin: '5px 0', color: '#7a869a', fontSize: '0.9rem' }}><strong>Descrição:</strong> {tarefaSelecionada.desc}</p>
            <p style={{ margin: '15px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Status:</strong> <Badge $type={tarefaSelecionada.status}>{tarefaSelecionada.status}</Badge>
            </p>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setTarefaSelecionada(null)} style={{ padding: '8px 16px', border: 'none', background: '#f4f5f7', color: '#42526e', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>
                Cancelar
              </button>
              <button 
                onClick={() => concluirTarefa(tarefaSelecionada.id)}
                disabled={tarefaSelecionada.status === 'Concluída'}
                style={{ padding: '8px 16px', border: 'none', background: '#0052cc', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 500, opacity: tarefaSelecionada.status === 'Concluída' ? 0.5 : 1 }}
              >
                Concluir Tarefa
              </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </TaskContainer>
  )
}