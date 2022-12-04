import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import { useRouter } from 'next/router'

//const BASE_URL = 'http://localhost:3000/api'  // Ambiente de desenvolvimento
const BASE_URL = '/api' 

export default function Home() {

  const router = useRouter()
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [repostasCerta, setRespostasCerta] = useState<number>(0)

  useEffect(() => {
    carregarIdsQuestoes()
  }, [])

  useEffect(() => {
    if(idsDasQuestoes.length > 0) {
      carregarQuestao(idsDasQuestoes[0])
    }
  }, [idsDasQuestoes])

  async function carregarIdsQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  function questaoRespondida(questao: QuestaoModel) {
    setQuestao(questao)
    const acertou = questao.acertou
    setRespostasCerta(repostasCerta + (acertou ? 1 : 0))
    
  }

  function idProximaPergunta() {
    if(questao) {
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
    }
  }

  function irPraProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irPraProximaQuestao(proximoId) : finalizar()
  }

  function irPraProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: '/resultado',
      query: {
        total: idsDasQuestoes.length,
        certas: repostasCerta
      }
    })
  }

  return ( questao ? (
          <Questionario  questao={questao} 
              ultima={idProximaPergunta() === undefined}
              questaoRespondida={questaoRespondida}
              irPraProximoPasso={irPraProximoPasso} />
          ) : (
            <div>Nenhuma questão renderizada</div>
          )
  )
}
