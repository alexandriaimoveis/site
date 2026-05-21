import Header from '@/app/components/header/page';
import Head from '../../components/head/page';
import Navbar from '../../components/navbar/page';
import Footer from '@/app/components/footer/page';

export default function PoliticaDePrivacidade() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <div>
        <Head />
        <Header />
        <Navbar />

        <section className="bg-white border-b border-slate-100 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-[#F29829] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Transparência e Segurança
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Política de Privacidade
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-md mx-auto mt-2">
              Como tratamos, protegemos e garantimos a integridade dos seus dados pessoais.
            </p>
            <span className="block mt-4 h-1 w-16 bg-[#F29829] rounded-full mx-auto" />
          </div>
        </section>

        <main className="max-w-4xl mx-auto px-6 py-16 bg-white border border-slate-100 my-12 rounded-2xl shadow-sm text-justify text-slate-600 leading-relaxed space-y-6 text-sm sm:text-base">
          
          <h2 className='font-extrabold text-2xl text-slate-900 tracking-tight mb-4'>
            Política de Privacidade da Alexandria
          </h2>

          <p>A presente Política tem por finalidade demonstrar o nosso compromisso em resguardar a sua privacidade e proteger seus Dados Pessoais, estabelecendo as regras sobre o Tratamento, bem como explicando quais são seus direitos e como exercê-los.</p>

          <p>Não se esqueça, é condição para a utilização das funcionalidades exclusivas do Nosso Ambiente que você tenha lido, compreendido e que esteja ciente das regras estabelecidas nesta Declaração, assim, caso continue a navegação, entendemos que você se declarará ciente.</p>

          <p>Caso você possua menos de 18 (dezoito) anos de idade, por favor, não efetue seu registro em Nossos Ambientes ou preencha quaisquer formulários que exijam Dados. Lembre-se que suas atividades devem ser supervisionadas por um adulto e seus interesses representados ou assistidos por seu representante legal.</p>

          <p>Leia atentamente esta Política e, caso ainda restem dúvidas, fique à vontade para entrar em contato conosco por meio dos Canais de Atendimento aqui disponibilizados.</p>

          <hr className="border-slate-100 my-8" />

          <h2 className='font-extrabold text-xl text-slate-900 tracking-tight mt-8 mb-4'>
            Conceitos Básicos
          </h2>

          <p>Para melhor entendimento desta Política, devem ser consideradas as seguintes definições:</p>

          <ul className="space-y-4 text-slate-700">
            <li><span className='font-bold text-slate-900'>Algoritmo:</span> conjunto de regras que fornecem uma sequência de operações capazes de resolver um problema específico ou executar uma tarefa.</li>
            <li><span className='font-bold text-slate-900'>Cloud Computing ou Computação em Nuvem:</span> tecnologia de virtualização de serviços construída a partir da interligação de mais de um servidor, por meio de uma rede de informação comum (como a Internet), que tem por objetivo reduzir custos e aumentar a disponibilidade dos serviços sustentados.</li>
            <li><span className='font-bold text-slate-900'>Dados Pessoais:</span> são os dados relativos a uma pessoa física, que sejam capazes de identificá-la ou torná-la identificável. Por exemplo: nome, e-mail, número do RG, preferências pessoais, endereço IP, geolocalização.</li>
            <li><span className='font-bold text-slate-900'>Dados Pessoais Sensíveis:</span> são quaisquer Dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dados referentes à saúde ou à vida sexual, dados genéticos ou biométricos, quando vinculados a uma pessoa física.</li>
            <li><span className='font-bold text-slate-900'>Dados:</span> para fins desta Política, abrange os Dados Pessoais e Dados Pessoais Sensíveis.</li>
            <li><span className='font-bold text-slate-900'>Encarregado ou Data Protection Officer (DPO):</span> pessoa indicada para atuar como canal de comunicação entre Nós, os Titulares dos Dados Pessoais e a Autoridade Nacional de Proteção de Dados (ANPD).</li>
            <li><span className='font-bold text-slate-900'>Legislação aplicável:</span> toda legislação que verse sobre privacidade e proteção de Dados Pessoais, especialmente a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD).</li>
            <li><span className='font-bold text-slate-900'>Nossos ambientes:</span> designa o endereço eletrônico https://www.alexandriaimobiliaria.com.br/ e seus subdomínios.</li>
            <li><span className='font-bold text-slate-900'>Política:</span> é o conjunto de diretrizes, regras e procedimentos estabelecidos pela empresa para orientar o comportamento e as decisões dos funcionários em relação a questões específicas, como é o caso desta Política de Privacidade e Tratamento de Dados Pessoais.</li>
            <li><span className='font-bold text-slate-900'>Titular dos Dados Pessoais:</span> é você, a pessoa física a quem os Dados Pessoais se referem, seja na condição de consumidor, usuário do site, investidor, prestador de serviços ou outra categoria aplicável.</li>
            <li><span className='font-bold text-slate-900'>Tratamento:</span> toda operação realizada com Dados Pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.</li>
          </ul>

          <div className='bg-amber-50/60 border-l-4 border-[#F29829] p-6 rounded-r-xl my-8 space-y-3'>
            <h3 className='text-[#F29829] font-black text-xs uppercase tracking-widest'>Nota Especial para Idosos</h3>
            <p className='text-slate-800 text-sm font-medium'>
              Caso você tenha <span className='font-bold underline'>mais de 60 anos</span>, saiba que estamos cientes do risco de tratar seus dados pessoais e nos comprometemos a tomar todas as medidas cabíveis para protegê-los. Ademais, nos comprometemos a tratá-los de forma:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 list-disc list-inside pl-2">
              <li>Clara;</li>
              <li>Simples;</li>
              <li>Acessível;</li>
              <li>Adequada ao seu entendimento;</li>
            </ul>
          </div>

          <hr className="border-slate-100 my-8" />

          <h2 className='font-extrabold text-xl text-slate-900 tracking-tight mt-8 mb-2'>
            Sobre os dados que tratamos
          </h2>

          <p>Como tratamos Dados. Os Dados poderão ser coletados diretamente de você, através do preenchimento de formulários, ou quando você interage com nossos ambientes virtuais ou físicos.</p>
          <p className="mb-6">Além disso, os Dados variam de acordo com a natureza da relação que você tenha conosco e servem para finalidades distintas, entre elas:</p>

          <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm text-left my-6">
            
            <div className="grid grid-cols-12 bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider p-4 border-b border-slate-200">
              <div className="col-span-4">Canal / Categoria</div>
              <div className="col-span-4 px-2">O que tratamos?</div>
              <div className="col-span-4 px-2">Para que tratamos?</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-600">
              
              <div className="grid grid-cols-12 p-4 items-start gap-y-2 sm:gap-y-0">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Fale Conosco</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome completo, E-mail, Telefone</li>
                    <li>Estado e cidade de residência</li>
                    <li>Dados compartilhados na solicitação</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Gerenciar suas dúvidas e solicitações.</p>
                  <p>ii. Fins publicitários e informativos (se autorizado).</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Portal do Corretor</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome completo, E-mail, Telefone</li>
                    <li>Vínculo Empregatício, Região</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Identificar e cadastrar você.</p>
                  <p>ii. Possibilitar acesso a empreendimentos.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Portal e APP do Cliente</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome completo, E-mail, Telefone, CPF</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Identificar e cadastrar você no sistema.</p>
                  <p>ii. Acesso a informações sobre seu imóvel.</p>
                  <p>iii. Suporte e gestão de chamados.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Ouvidoria</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome completo, E-mail, Telefone</li>
                    <li>Endereço, Dados do relato</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Buscar soluções para suas solicitações.</p>
                  <p>ii. Melhoria contínua de canais e serviços.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Fornecedores</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome, E-mail, Telefone, Cidade</li>
                    <li>Categoria do serviço/produto</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Contato para propostas e contratos.</p>
                  <p>ii. Análise de qualificação e capacidade.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Venda Seu Terreno</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome, E-mail, Telefone, Endereço</li>
                    <li>Relação com o imóvel e proposta</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Contato comercial e análise para formalização de compras de glebas.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Trabalhe Conosco</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome, Endereço, Gênero, Raça</li>
                    <li>Experiência acadêmica e profissional</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Autenticar o candidato.</p>
                  <p>ii. Avaliação curricular e processos seletivos.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Canal de Ética</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Se identificado: Nome, E-mail, Tel</li>
                    <li>Dados incluídos na denúncia</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Apuração de descumprimentos legais, fraudes ou condutas inapropriadas na governança.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Fale com um Corretor</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome completo, E-mail, Telefone</li>
                    <li>Dados fornecidos na conversa</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Facilitar consultas e agendamento de visitas.</p>
                  <p>ii. Suporte e atendimento personalizado.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Fale com RI / Mailing</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome completo, E-mail, Telefone, Empresa</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Esclarecer dúvidas de investidores.</p>
                  <p>ii. Envio de comunicados ao mercado e fatos relevantes.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 p-4 items-start">
                <div className="col-span-12 sm:col-span-4 font-bold text-slate-900">Dados Digitais</div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>IP, Porta lógica, OS do dispositivo</li>
                    <li>Geolocalização, Telas acessadas, Cookies</li>
                  </ul>
                </div>
                <div className="col-span-12 sm:col-span-4 px-0 sm:px-2 text-slate-500 space-y-1">
                  <p>i. Identificar e autenticar a sessão do usuário.</p>
                  <p>ii. Cumprimento do Marco Civil da Internet.</p>
                </div>
              </div>

            </div>
          </div>

          <p><span className='font-bold text-slate-900'>Atualização e veracidade dos Dados.</span> Você é o único responsável pela precisão, veracidade ou atualização dos Dados que nos fornece. Nós não somos obrigados a tratar os seus Dados se houver razões para crer que tal Tratamento possa nos imputar infração de qualquer lei aplicável, ou se você estiver utilizando nossos ambientes para quaisquer fins ilegais ou ilícitos.</p>

          <p><span className='font-bold text-slate-900'>Base de Dados.</span> É o conjunto organizado de informações ou dados que são armazenados e processados eletronicamente. A base de dados formada por meio da coleta de Dados é de nossa propriedade e está sob nossa responsabilidade, sendo que seu uso, acesso e compartilhamento, quando necessários, serão feitos dentro dos limites e propósitos descritos nesta Política.</p>

          <p>Nós <span className='font-bold text-slate-900'>não utilizamos</span> nenhum tipo de <span className='font-bold text-[#F29829]'>decisão unicamente automatizada</span> que afetem seus interesses.</p>

          <hr className="border-slate-100 my-8" />

          <h2 className='font-extrabold text-xl text-slate-900 tracking-tight mt-8 mb-4'>
            Como compartilhamos os dados
          </h2>

          <p><span className='font-bold text-slate-900'>Hipótese de compartilhamento dos Dados:</span> Os Dados tratados e as atividades registradas (logs) podem ser compartilhados, entre outras hipóteses:</p>

          <ul className="list-decimal list-inside space-y-2 text-slate-700 pl-2">
            <li>Com autoridades judiciais, administrativas ou governamentais competentes, sempre que houver determinação legal, requerimento, requisição ou ordem nesse sentido;</li>
            <li>Parceiros comerciais e fornecedores, quando necessário para o desenvolvimento de nossas atividades;</li>
            <li>Com corretores de imóveis, quando estivermos tratando de compras com intermediação;</li>
            <li>Com a administradora de condomínio que será responsável por gerenciar e administrar o empreendimento;</li>
            <li>Com instituições financeiras, quando você assim solicitar;</li>
            <li>Com empresas de marketing e publicidade, para entregar as promoções e informações adequadas ao seu perfil e</li>
            <li>De forma automática, em caso de movimentações societárias, como fusão, aquisição ou incorporação da Alexandria.</li>
          </ul>

          <p>Caso você tenha qualquer dúvida sobre com quem compartilhamos seus Dados, entre em contato conosco por meio dos Canais de Atendimento disponibilizados no final desta Política.</p>

          <hr className="border-slate-100 my-8" />

          <h2 className='font-extrabold text-xl text-slate-900 tracking-tight mt-8 mb-4'>
            Como protegemos seus dados e como você também pode protegê-los
          </h2>

          <p><span className='font-bold text-slate-900'>Práticas de Segurança e Governança.</span> Para resguardar a sua privacidade e proteger os seus Dados, nós contamos com um programa de governança que contém regras de boas práticas, políticas e procedimentos internos, os quais estabelecem condições de organização, treinamentos, ações educativas e mechanisms de supervisão e mitigação de riscos relacionados ao Tratamento de Dados Pessoais.</p>

          <p><span className='font-bold text-slate-900'>Acesso aos Dados, proporcionalidade e relevância.</span> Internamente, os Dados tratados são acessados somente por profissionais devidamente autorizados, respeitando os princípios de proporcionalidade, necessidade e relevância para os objetivos do nosso negócio, além do compromisso de confidencialidade e preservação da sua privacidade nos termos desta Política.</p>

          <p><span className='font-bold text-slate-900'>Adoção de boas práticas.</span> Você também é responsável pelo sigilo de seus Dados e deve ter sempre ciência de que o compartilhamento de senhas e dados de acesso viola esta Política e pode comprometer a segurança dos seus Dados e dos Nossos Ambientes. Caso você identifique ou tome conhecimento sobre o comprometimento da segurança dos seus Dados, entre em contato com o nosso Encarregado por meio dos Canais de Atendimento disponibilizados no final desta Política.</p>

          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 space-y-2 text-xs sm:text-sm font-medium text-slate-700">
            <p>• Garanta que encerrou sua sessão de navegação em Nossos Ambientes sempre que utilizar equipamentos compartilhados;</p>
            <p>• Fique atento! Somente lhe enviamos e-mails através do domínio <span className="text-[#F29829] font-bold">@alexandriaimoveis.com.br</span>;</p>
            <p>• Lembre-se que a Alexandria nunca enviará para você mensagens eletrônicas solicitando a confirmação de dados, com anexos executáveis ou links para downloads;</p>
          </div>

          <p><span className='font-bold text-slate-900'>Links externos.</span> Quando você utilizar Nossos Ambientes, você poderá ser conduzido, via link, a outros sites, portais ou plataformas, que poderão coletar seus Dados e ter sua própria política de privacidade. Caberá a você ler as referidas políticas, sendo de sua responsabilidade aceitá-las ou rejeitá-las.</p>

          <p><span className='font-bold text-slate-900'>Tratamento por terceiros sob nossa diretriz.</span> Nós buscamos avaliar cuidadosamente nossos parceiros e prestadores de serviços e firmamos com eles obrigações contratuais de confidencialidade, segurança da informação e proteção de Dados, com objetivo de proteger você.</p>

          <hr className="border-slate-100 my-8" />

          <h2 className='font-extrabold text-xl text-slate-900 tracking-tight mt-8 mb-4'>
            Como armazenamos seus dados e o registro de atividades (logs)
          </h2>

          <p><span className='font-bold text-slate-900'>Local de armazenamento.</span> Os Dados tratados e os registros de atividades (logs) são armazenados em ambiente seguro e controlado, podendo estar em nossos servidores localizados no Brasil, bem como em ambiente de uso de recursos ou servidores na nuvem (cloud computing), o que poderá exigir transferência e/ou processamento dos seus Dados fora do Brasil.</p>

          <p><span className='font-bold text-slate-900'>Prazo de armazenamento.</span> Nós armazenamos os Dados somente pelo tempo que for necessário para cumprir com as finalidades para as quais foram tratados ou para cumprimento de quaisquer obrigações legais, regulatórias ou para preservação de direitos.</p>

          <p><span className='font-bold text-slate-900'>Descarte dos Dados.</span> Findos o prazo de manutenção e a necessidade legal, os Dados serão excluídos com uso de métodos de descarte seguro ou utilizados de forma anonimizada para fins estatísticos.</p>

          <hr className="border-slate-100 my-8" />

          <h2 className='font-extrabold text-xl text-slate-900 tracking-tight mt-8 mb-4'>
            Quais são os seus direitos e como exercê-los
          </h2>

          <p>Os Dados são seus e a Legislação aplicável traz uma série de direitos relacionados a eles, que poderão ser exercidos por você através de requisição ao nosso Encarregado pelo Canal de Atendimento disponibilizado no final desta Política.</p>

          <ul className="space-y-3 text-slate-700 pl-2">
            <li>• <span className='font-bold text-slate-900'>Confirmação e acesso:</span> você poderá solicitar a confirmação sobre a existência de Tratamento e o acesso a seus Dados, inclusive por meio da solicitação de cópias de registros que temos sobre você.</li>
            <li>• <span className='font-bold text-slate-900'>Correção:</span> você poderá solicitar a correção de seus Dados que estejam incompletos, inexatos ou desatualizados.</li>
            <li>• <span className='font-bold text-slate-900'>Anonimização, bloqueio ou eliminação:</span> você poderá solicitar a anonimização dos seus Dados, para que eles não possam mais ser relacionados a você, o bloqueio dos seus Dados, suspendendo temporariamente a possibilidade de Tratamento para certas finalidades, ou a eliminação dos seus Dados.</li>
            <li>• <span className='font-bold text-slate-900'>Portabilidade:</span> você poderá solicitar que nós forneçamos seus Dados em formato estruturado e interoperável visando sua transferência para um terceiro, respeitando nossa propriedade intelectual ou segredo de negócios.</li>
            <li>• <span className='font-bold text-slate-900'>Informação sobre compartilhamento:</span> você poderá solicitar informações sobre terceiros com os quais compartilhamentos seus Dados, limitando essa divulgação a informações que não violem nossa propriedade intelectual ou segredo de negócios.</li>
            <li>• <span className='font-bold text-slate-900'>Revogação do consentimento:</span> você poderá optar por retirar o consentimento para alguma finalidade que você tenha consentido.</li>
            <li>• <span className='font-bold text-slate-900'>Oposição:</span> você poderá se opor ao Tratamento dos seus Dados, caso não concorde com alguma finalidade.</li>
            <li>• <span className='font-bold text-slate-900'>Revisão:</span> em caso de decisões baseadas exclusivamente em tratamentos automatizados, você poderá solicitar a revisão da decisão, indicando seus interesses que possam ter sido afetados.</li>
          </ul>

          <p><span className='font-bold text-slate-900'>Requisição.</span> Para sua segurança, sempre que você apresentar uma requisição para exercícios dos seus direitos, nós poderemos solicitar informações complementares para comprovar sua identidade, buscando impedir fraudes.</p>

          <p><span className='font-bold text-slate-900'>Não atendimento de requisições.</span> Nós poderemos deixar de atender alguma requisição de exercício de direitos, caso o atendimento viole nossa propriedade intelectual ou segredo de negócios, bem como quando houver obrigação legal ou regulatória para retenção de Dados.</p>

          <p><span className='font-bold text-slate-900'>Respostas às requisições.</span> Nós nos comprometemos a responder todas as requisições em um prazo razoável e sempre em conformidade com a legislação aplicável.</p>

          <hr className="border-slate-100 my-8" />

          <h2 className='font-extrabold text-xl text-slate-900 tracking-tight mt-8 mb-4'>
            Informações sobre esta política
          </h2>

          <p><span className='font-bold text-slate-900'>Alteração do teor e atualização.</span> Você reconhece o nosso direito de alterar o teor desta Política a qualquer momento, conforme a finalidade ou necessidade. Ocorrendo atualizações relevantes na Política, você será notificado por meio dos dados de contato que nos informar ou por divulgação nos nossos perfis oficiais.</p>

          <p><span className='font-bold text-slate-900'>Inaplicabilidade.</span> Caso algum ponto desta Política seja considerado inaplicável por Autoridade de Dados ou judicial, as demais condições permanecerão em pleno vigor e efeito.</p>

          <p><span className='font-bold text-slate-900'>Canais de Atendimento.</span> Em caso de qualquer dúvida com relação às disposições constantes desta Política, inclusive para exercício dos seus direitos, você poderá entrar em contato com nosso Encarregado de Dados, que está à disposição nos seguintes canais:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm my-4 font-medium">
            <div className="bg-slate-50 p-4 border border-slate-200/60 rounded-xl">
              <span className="block text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-1">Encarregado (DPO)</span>
              <p className="text-slate-900 font-bold">Alexandre</p>
              <p className="text-[#F29829] font-semibold underline">alexandriaimoveis@gmail.com</p>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-200/60 rounded-xl">
              <span className="block text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-1">Canal Direto LGPD</span>
              <p className="text-[#F29829] font-semibold underline">lgpd@alexandriaimoveis.com.br</p>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-200/60 rounded-xl sm:col-span-2">
              <span className="block text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-1">Formulário Digital</span>
              <p className="text-slate-700 truncate font-semibold underline">https://www.alexandriaimoveis.com.br/formulario-de-tratamento-de-dados-pessoais</p>
            </div>
          </div>

          <p><span className='font-bold text-slate-900'>Lei aplicável.</span> Esta Política será interpretada de acordo com a legislação brasileira, no idioma português.</p>

          <div className="text-right pt-4">
            <span className='bg-slate-100 text-slate-500 font-bold px-3 py-1.5 rounded-lg text-xs tracking-wide uppercase'>
              Atualização: Abril de 2026
            </span>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}