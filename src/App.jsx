import { useEffect, useState } from "react"


function App() {
  const [loading, setLoading] = useState(false)
  const [address, setAdress] = useState(null)
  const [input, setInput] = useState("")
  const [cep, setCep] = useState("")

  useEffect(() =>{
    setLoading(true)
    const loadData = async () =>{
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const json = response.json()
      setAdress(json)
      setLoading(false)
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
              <button onClick={cleanAddress}></button>
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
