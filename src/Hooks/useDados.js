import { useEffect, useState } from "react";
import { getData } from "@/Services/dados.js";

export function useDados() {
  const [data, setData] = useState({ projects: [], tasks: [] })
const [erro, setErro] = useState(null)

useEffect(() => {
  async function carregar() {
    try {
      const result = await getData()
      setData(result)
    } catch (e) {
      setErro(e)
    }

  }
  carregar()
}, [])
return { data, erro }
}