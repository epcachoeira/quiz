import type { NextApiRequest, NextApiResponse } from 'next'
import questoes from '../bancoDeQuestoes'

//export default function questoesProId(req: NextApiRequest, res: NextApiResponse) {
export default function questoesProId(req: NextApiRequest, res: NextApiResponse) {
    
    const idSelecionado = Number(req.query.id)

    const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)

    if (unicaQuestaoOuNada.length === 1) {
        const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()
        const obj = questaoSelecionada.responderCom(0).paraObjeto()
        res.status(200).json(questaoSelecionada.paraObjeto())
    } else {
        res.status(204).send('Id inválido')
    }

}