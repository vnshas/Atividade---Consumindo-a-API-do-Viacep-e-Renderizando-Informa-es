import { useEffect, useState } from "react"
import { api } from "./services/api"


function App() {
  const [loading, setLoading] = useState(false)
  const [address, setAdress] = useState(null)
  const [input, setInput] = useState("")
  const [cep, setCep] = useState("")

  useEffect(() =>{
    const loadData = async () =>{
      try{
        setLoading(true)
        const {data}= await api.get(`${cep}/json/`)
        setAdress(data)
      }catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }

    if(cep !== ""){
      loadData()
    }
  }, [cep])

  const submit = (e) =>{
    e.preventDefault()
    setCep(input)
    setInput("")
  }

  const cleanAddress = () =>{
    setAdress(null)
    setCep("")
  }

  return (
    <div className="App">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {address ? (
            <div>
              <h1>Meu endereço:</h1>
              <p>
                {address.cep} - {address.logradouro} - {address.bairro} -{" "}
                {address.localidade} -{address.uf}
              </p>
              <button onClick={cleanAddress}>Limpar CEP</button>
            </div>
          ) : (
            <div>
              <h1>Forneça o seu cep para proseguir</h1>
              <form onSubmit={submit}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Buscar Endereço</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App
