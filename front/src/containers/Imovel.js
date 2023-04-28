import { useEffect, useState } from "react"
import "./Imovel.css"

export default function Imovel({dados_imoveis}){

    const [casa,setCasa]=useState(false)
    
    useEffect(()=> {
        console.log(dados_imoveis)
        if(dados_imoveis.c_qtd_comodos==null)
            setCasa(false)
        else
            setCasa(true)
    },[])


    const [terreno,setTerreno]=useState(false)
    
    useEffect(()=> {
        console.log(dados_imoveis)
        if(dados_imoveis.largura==null)
            setTerreno(false)
        else
            setTerreno(true)
    },[])
    const [comercial,setComercial]=useState(false)
    useEffect(()=> {
        console.log(dados_imoveis)
        if(dados_imoveis.qtd_com==null)
            setComercial(false)
        else
            setComercial(true)
    },[])

    const [ap,setAp]=useState(false)
    
    useEffect(()=> {
        console.log(dados_imoveis)
        if(dados_imoveis.vagas_garagem==null)
            setAp(false)
        else
            setAp(true)
    },[])
        return( 
        
            
        <div className="Geral">
        
            <section>
                    <div className="Imovel">
                        <span>
                            ID: {dados_imoveis.id}
                        </span>
                        <span>
                            Proprietário: {dados_imoveis.prop}
                        </span>
                        <span>
                            Telefone:   {dados_imoveis.numeroT}
                        </span>
                        <span>
                            Endereço: {dados_imoveis.enderecoI}
                        </span>
                        {casa&&
                            <>
                                <span>
                                    Tipo imovel: Casa
                                </span>
                                <span>
                                    Qunatidade de Comodos: {dados_imoveis.c_qtd_comodos}
                                </span>
                                <span>
                                    Vagas na Garagem: {dados_imoveis.c_vagas_garagem}
                                </span>
                            </>

                        }
                        {terreno&& 
                            <>
                                <span>
                                    Tipo imovel: Terreno
                                    </span>  
                                <span>
                                        Largura: {dados_imoveis.largura}
                                    </span>
                                <span>
                                        Comprimento: {dados_imoveis.comprimeto}
                                    </span> 
                            </> 
                        }
                    {comercial&& 
                            <>
                                <span>
                                    Tipo imovel: Comercial
                                    </span>
                                <span>
                                    Quantidade de Comodos: {dados_imoveis.qtd_com}
                                    </span>
                                <span>
                                Quantidade de Banheiros:  { dados_imoveis.qtd_banh}
                                    </span>
                            </>
                    }
                    {ap&& 
                            <>
                                <span>
                                    Tipo imovel: Apartamento
                                </span>
                                <span>
                                    Quantidade de Comodos: {dados_imoveis.qtd_comodos}
                                </span>
                                <span>
                                    Vagas na Garagem:{dados_imoveis.vagas_garagem}
                                </span>
                                <span>
                                    Valor do condominio: {dados_imoveis.valor_cond} R$
                                </span>
                        </>
                    }
                        <span>
                        Area : {dados_imoveis.area} Metros quadrados

                        </span>
                        <span>
                            {dados_imoveis.situ}
                        </span>
                        <span>
                            {dados_imoveis.valor}
                        </span>           
                        <img src={dados_imoveis.end_foto} />
                    </div>
            </section>
        </div>
        
            )
        
}