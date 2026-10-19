/* Artigos do blog da Saotech.
   Para publicar um novo artigo, copie um bloco { ... }, troque os campos e salve.
   slug: endereço do artigo (letras minúsculas, números e hífens). data: AAAA-MM-DD.
   capa: uma foto da pasta fotos/. corpo: o texto em HTML (h2, p, ul, table, blockquote). */
window.POSTS = [
{
  slug: "georreferenciamento-quando-e-obrigatorio",
  titulo: "Georreferenciamento: quando o seu imóvel rural precisa ser certificado",
  resumo: "O que é a certificação no SIGEF, em que situações o cartório exige e o que mudou no prazo com o decreto de 2025.",
  categoria: "Georreferenciamento",
  data: "2026-10-19",
  capa: "fotos/gnss-tripe.webp",
  capaAlt: "Receptor GNSS sendo instalado no bastão sobre o tripé",
  corpo: `
<p>Quem vai vender, dividir ou passar um imóvel rural para os herdeiros cedo ou tarde ouve a mesma frase no cartório: <strong>"precisa do georreferenciamento"</strong>. Neste guia explicamos o que é, quando ele é exigido e por que vale a pena não deixar para a última hora.</p>

<h2>O que é o georreferenciamento</h2>
<p>É o levantamento das coordenadas de cada vértice dos limites do imóvel, ligadas ao sistema de referência oficial do Brasil e medidas com a precisão definida pela norma técnica do INCRA. Em campo, a equipe usa receptores GNSS para medir os pontos das divisas.</p>
<p>Com os dados processados, o imóvel é enviado ao <strong>SIGEF</strong>, o sistema do INCRA que confere se o perímetro não se sobrepõe a outros imóveis já certificados. Aprovado, o imóvel recebe a <strong>certificação</strong>, e a nova descrição pode ser levada ao cartório de registro de imóveis.</p>

<h2>Quando o cartório exige</h2>
<p>A Lei 10.267/2001 mudou a Lei de Registros Públicos e passou a exigir a descrição georreferenciada e certificada pelo INCRA nestas situações envolvendo imóveis rurais:</p>
<ul>
  <li><strong>Transferência</strong>, como venda, doação ou partilha em inventário;</li>
  <li><strong>Desmembramento</strong> e <strong>parcelamento</strong>, quando uma área é dividida;</li>
  <li><strong>Remembramento</strong>, quando áreas são unidas em uma só matrícula;</li>
  <li><strong>Ações judiciais</strong> que tratam de imóveis rurais.</li>
</ul>
<p>A exigência sempre seguiu um calendário definido por decreto, que começou pelos imóveis maiores e foi chegando aos menores.</p>

<h2>O que mudou no prazo</h2>
<p>O Decreto nº 12.689, publicado em 21 de outubro de 2025, unificou esse calendário. Para todos os imóveis rurais, de qualquer tamanho, a exigência nos atos de transferência, desmembramento, parcelamento e remembramento passa a valer a partir de <strong>21 de novembro de 2029</strong>.</p>
<blockquote>Como as regras já mudaram várias vezes, confirme com o cartório da sua comarca antes de marcar uma venda ou partilha. Alguns atos e situações judiciais podem exigir o georreferenciamento antes desse prazo.</blockquote>

<h2>Por que não deixar para depois</h2>
<ul>
  <li><strong>Negócio sem atraso:</strong> com o imóvel certificado, a venda ou a partilha não para esperando o levantamento.</li>
  <li><strong>Problemas aparecem cedo:</strong> sobreposição com vizinhos ou diferença de área na matrícula são resolvidas com calma, e não na véspera da escritura.</li>
  <li><strong>Crédito e valorização:</strong> um imóvel com limites certificados passa mais segurança a bancos e compradores.</li>
  <li><strong>Fila no fim do prazo:</strong> quando um prazo se aproxima, a procura por profissionais e a fila nos órgãos aumentam.</li>
</ul>

<h2>Como funciona com a Saotech</h2>
<ol>
  <li>Você envia a matrícula e os documentos do imóvel, e fazemos o diagnóstico.</li>
  <li>Agendamos o campo e medimos os vértices com GNSS, junto com quem conhece as divisas.</li>
  <li>Preparamos a planta, o memorial descritivo e os documentos de anuência dos confrontantes.</li>
  <li>Enviamos ao SIGEF, acompanhamos a certificação e o registro no cartório.</li>
</ol>
<p>Você acompanha cada etapa pelo Portal do Cliente. Para saber quais documentos separar, veja o nosso <a href="post.html#documentos-para-regularizar-imovel-rural">checklist de documentos</a>.</p>

<p class="fontes">Fontes: <a href="https://agenciabrasil.ebc.com.br/politica/noticia/2025-10/governo-prorroga-prazo-para-georreferenciamento-de-imoveis-rurais">Agência Brasil</a> · <a href="https://www.mattosfilho.com.br/unico/prorrogado-georreferenciamento-imoveis-rurais/">Mattos Filho</a></p>
`
},
{
  slug: "documentos-para-regularizar-imovel-rural",
  titulo: "Checklist: documentos para regularizar um imóvel rural",
  resumo: "A lista do que separar antes do georreferenciamento, da retificação ou da venda, e onde conseguir cada documento.",
  categoria: "Documentos",
  data: "2026-10-19",
  capa: "fotos/escritorio-campo.webp",
  capaAlt: "Conferência dos dados do levantamento no notebook, em campo",
  corpo: `
<p>Boa parte do tempo de uma regularização é gasto atrás de papel. Quando os documentos chegam completos no primeiro contato, o diagnóstico sai mais rápido e o trabalho de campo já começa com tudo conferido.</p>

<h2>Os documentos principais</h2>
<div class="tabela"><table>
  <thead><tr><th>Documento</th><th>Onde conseguir</th><th>Para que serve</th></tr></thead>
  <tbody>
    <tr><td><strong>Matrícula atualizada</strong> (certidão de inteiro teor)</td><td>Cartório de Registro de Imóveis da comarca</td><td>Mostra quem é o dono, a área e a descrição registrada</td></tr>
    <tr><td><strong>CCIR</strong></td><td>INCRA, pelo Sistema Nacional de Cadastro Rural</td><td>Exigido para vender, desmembrar, arrendar, hipotecar ou partilhar</td></tr>
    <tr><td><strong>ITR</strong> e certidão negativa do imóvel</td><td>Receita Federal</td><td>Comprova que o imposto do imóvel está em dia</td></tr>
    <tr><td><strong>Recibo do CAR</strong></td><td>Sistema do Cadastro Ambiental Rural (SICAR)</td><td>Comprova a inscrição ambiental do imóvel</td></tr>
    <tr><td><strong>RG, CPF e certidão de casamento</strong></td><td>Dos proprietários e dos cônjuges</td><td>Identificam quem assina os documentos</td></tr>
    <tr><td><strong>Dados dos vizinhos</strong></td><td>Nome, CPF e contato de cada confrontante</td><td>Necessários para as declarações de concordância com as divisas</td></tr>
  </tbody>
</table></div>

<h2>Se você não tem escritura</h2>
<p>Quem tem apenas a posse pode seguir pelo caminho da usucapião. Nesse caso, junte tudo o que mostra há quanto tempo você usa o imóvel:</p>
<ul>
  <li>Contratos de compra e venda, cessões e recibos;</li>
  <li>Contas de luz, água ou telefone no endereço;</li>
  <li>Comprovantes de pagamento de ITR, CCIR ou IPTU;</li>
  <li>Fotos antigas, benfeitorias e o nome de pessoas que conhecem a sua posse.</li>
</ul>
<p>A usucapião também exige planta e memorial descritivo, que a Saotech prepara a partir do levantamento.</p>

<h2>Três conferências que evitam atraso</h2>
<ol>
  <li><strong>Os nomes batem?</strong> Confira se o nome dos proprietários está igual na matrícula, no CCIR e nos documentos pessoais. Casamento, divórcio e falecimento precisam estar averbados.</li>
  <li><strong>A área bate?</strong> Se a área do CAR, do CCIR, do ITR e da matrícula forem diferentes, o levantamento vai mostrar qual é a real, e pode ser preciso fazer uma retificação.</li>
  <li><strong>Os cadastros estão em dia?</strong> CCIR com taxa pendente ou ITR atrasado travam a escritura.</li>
</ol>

<h2>Não encontrou algum documento?</h2>
<p>Não precisa esperar ter tudo. Mande o que você tem pelo WhatsApp e a nossa equipe indica o que falta e onde conseguir. Para entender a diferença entre CAR, CCIR e ITR, leia o artigo <a href="post.html#car-ccir-itr-diferencas">CAR, CCIR e ITR: qual a diferença</a>.</p>
`
},
{
  slug: "car-ccir-itr-diferencas",
  titulo: "CAR, CCIR e ITR: qual a diferença entre os três cadastros?",
  resumo: "Um é ambiental, outro é fundiário e o terceiro é imposto. Veja para que serve cada um e por que os três precisam falar a mesma língua.",
  categoria: "Cadastros rurais",
  data: "2026-10-19",
  capa: "fotos/observacao.webp",
  capaAlt: "Técnico observa a mata nativa durante a visita ao imóvel",
  corpo: `
<p>Todo imóvel rural carrega três siglas que confundem até quem já fez várias negociações: <strong>CAR</strong>, <strong>CCIR</strong> e <strong>ITR</strong>. Elas são cuidadas por órgãos diferentes e servem a coisas diferentes, mas descrevem o mesmo imóvel. Quando os dados não batem, a escritura trava.</p>

<h2>Os três lado a lado</h2>
<div class="tabela"><table>
  <thead><tr><th></th><th>CAR</th><th>CCIR</th><th>ITR</th></tr></thead>
  <tbody>
    <tr><td><strong>O que é</strong></td><td>Cadastro ambiental</td><td>Certificado do cadastro fundiário</td><td>Imposto sobre a propriedade rural</td></tr>
    <tr><td><strong>Quem cuida</strong></td><td>Sistema federal SICAR, com análise do órgão ambiental do estado</td><td>INCRA</td><td>Receita Federal</td></tr>
    <tr><td><strong>Para que serve</strong></td><td>Mostra APP, reserva legal e uso do solo</td><td>Prova que o imóvel está cadastrado no INCRA</td><td>Cobra o imposto anual do imóvel</td></tr>
    <tr><td><strong>Quando fazer</strong></td><td>Inscrição uma vez, com atualização quando o imóvel muda</td><td>Cadastro e atualização sempre que área ou titular mudam</td><td>Declaração todo ano, no prazo da Receita</td></tr>
    <tr><td><strong>Sem ele</strong></td><td>Dificuldade no crédito rural e nos programas ambientais</td><td>Não é possível vender, desmembrar, arrendar, hipotecar ou partilhar</td><td>Multa, juros e certidão negativa bloqueada</td></tr>
  </tbody>
</table></div>

<h2>CAR: o retrato ambiental</h2>
<p>O Cadastro Ambiental Rural foi criado pelo Código Florestal (Lei 12.651/2012) e é obrigatório para todos os imóveis rurais. Nele ficam desenhadas as áreas de preservação permanente, a reserva legal e o uso do solo. Os bancos pedem o CAR para liberar crédito rural.</p>

<h2>CCIR: a identidade do imóvel no INCRA</h2>
<p>O Certificado de Cadastro de Imóvel Rural é emitido pelo INCRA a partir das informações declaradas no Sistema Nacional de Cadastro Rural. Ele é exigido em praticamente todo ato de cartório com o imóvel, por isso precisa estar com os dados atualizados e a taxa paga.</p>

<h2>ITR: o imposto anual</h2>
<p>O Imposto sobre a Propriedade Territorial Rural é declarado todo ano à Receita Federal. O imóvel também precisa estar inscrito no CAFIR, o cadastro da Receita, que gera o número do imóvel (NIRF). Com o imposto em dia, sai a certidão negativa pedida na venda.</p>

<h2>Por que os três precisam bater</h2>
<p>É comum o mesmo imóvel aparecer com uma área no CAR, outra no CCIR, uma terceira no ITR e uma quarta na matrícula. Na hora da escritura, o cartório e o comprador percebem a diferença e o negócio para.</p>
<p>O caminho para alinhar tudo é medir o imóvel de verdade. Com o <a href="post.html#georreferenciamento-quando-e-obrigatorio">georreferenciamento</a>, a área real passa a ser a base para corrigir o CAR, atualizar o CCIR e retificar o ITR, e a Saotech cuida das três frentes junto com você.</p>
`
}
];
