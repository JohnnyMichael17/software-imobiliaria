import react, { useEffect, useState } from "react"
import Imovel from "./Imovel"
import api from "../services/api"

const Home = () => {
    const [imoveis,setImoveis]=useState([])
    useEffect(()=>{
        api.get("/dados_imovel").then(response => {
            const resposta = response.data.map((element) => {
                const {endereco,situacao,valor_vend,valor_loc,area,end_foto,id,proprietario,terreno,ap,casa,comercial}=element
                let situ=situacao
                const{pessoas}=proprietario
                const{nome}=pessoas
                const{telefone}=pessoas
                let enderecoI = ` ${endereco.logadouro} Nº:${endereco.numero}, Bairro ${endereco.bairro}`
                let valor
                if(situacao=="disponivel para venda")
                    valor = `Valor: ${valor_vend} R$.`
                else if(situacao=="disponivel para aluguel")
                        valor = `Valor: ${valor_loc} R$.`
                        else
                            valor= `Valor venda: ${valor_vend} R$,\n Valor aluguel: ${valor_loc} R$`
                //dados casa
                let c_qtd_comodos =null
                
                let c_vagas_garagem = null
                if(casa!=null){
                    c_qtd_comodos=casa.qtd_comodos
                    c_vagas_garagem = casa.num_vagas_garagem
                }
                
                //dados terreno
                let largura =null
                let comprimeto =null
                if(terreno!=null){
                    largura=terreno.largura
                    comprimeto=terreno.comprimeto
                }
                //dados comercial
                let qtd_com =null
                let qtd_banh = null
                if(comercial!=null){
                 qtd_banh=comercial.qtd_banheiros
                 qtd_com = comercial.qtd_comodos
                }
                //dados ap
                let qtd_comodos =null
                let valor_cond =null
                let vagas_garagem = null
                if(ap!=null){
                    qtd_comodos=ap.qtd_comodos
                    valor_cond=ap.valor_condo
                    vagas_garagem = ap.num_vagas_garagem
                }
                console.log("element",element)
                return <Imovel dados_imoveis={{numeroT:telefone.numeroT,prop:nome,telefone:telefone.numero,area:area,
                    end_foto:end_foto,id,largura,comprimeto,qtd_comodos,vagas_garagem,valor_cond,qtd_banh,qtd_com,
                    c_qtd_comodos,c_vagas_garagem,situ,valor, enderecoI}}/> 

                
            })
            setImoveis(resposta)
        } ).catch(error =>console.log(error))
    },[])

    return <div>
       {imoveis}
    </div>

}

export default Home 