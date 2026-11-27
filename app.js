const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

const state = {
  page: 'overview',
  intervalDays: '',
  userQuery: '',
  userRole: 'all',
  userStatus: 'all',
  recordQuery: '',
  recordType: 'all',
  collectionApplied: {},
  analyticsApplied: {},
  approvalFilter: 'pending',
  users: [
    { id: 'u1', name: 'Carla Mendes', email: 'carla.mendes@sedes.ba.gov.br', profile: 'Administrador da SEDES', active: true, last: 'Hoje, 09:42', initials: 'CM' },
    { id: 'u2', name: 'Rafael Oliveira', email: 'rafael.oliveira@sedes.ba.gov.br', profile: 'Membro da SEDES', active: true, last: 'Hoje, 08:15', initials: 'RO' },
    { id: 'u3', name: 'Joana Santos', email: 'joana.santos@sedes.ba.gov.br', profile: 'Entrevistador', active: true, last: 'Ontem, 16:28', initials: 'JS' },
    { id: 'u4', name: 'Marcos Lima', email: 'marcos.lima@sedes.ba.gov.br', profile: 'Entrevistador', active: true, last: 'Ontem, 14:06', initials: 'ML' },
    { id: 'u5', name: 'Ana Ribeiro', email: 'ana.ribeiro@sedes.ba.gov.br', profile: 'Membro da SEDES', active: true, last: '18 nov, 11:32', initials: 'AR' },
    { id: 'u6', name: 'Paulo Santana', email: 'paulo.santana@sedes.ba.gov.br', profile: 'Entrevistador', active: false, last: '03 nov, 10:17', initials: 'PS' },
    { id: 'u7', name: 'Lívia Costa', email: 'livia.costa@sedes.ba.gov.br', profile: 'Entrevistador', active: true, last: '17 nov, 15:50', initials: 'LC' }
  ],
  records: [
    { id: 'R-02841', name: 'Registro demonstrativo 01', cpf: '000.000.000-00', type: 'Possível duplicidade', date: '22 nov 2026', neighborhood: 'Centro', reason: 'CPF já associado a uma entrevista no mesmo ciclo.', status: 'pending' },
    { id: 'R-02837', name: 'Registro demonstrativo 02', cpf: '000.000.000-00', type: 'Inconsistência de dados', date: '21 nov 2026', neighborhood: 'Santa Terezinha', reason: 'Faixa etária e escolaridade informadas precisam de conferência.', status: 'pending' },
    { id: 'R-02819', name: 'Registro demonstrativo 03', cpf: '000.000.000-00', type: 'Preenchimento incompleto', date: '20 nov 2026', neighborhood: 'Jardim Petrolar', reason: 'Há campos sem resposta. Verifique se a omissão foi voluntária.', status: 'pending' },
    { id: 'R-02798', name: 'Registro demonstrativo 04', cpf: '000.000.000-00', type: 'Possível duplicidade', date: '18 nov 2026', neighborhood: 'Alagoinhas Velha', reason: 'Foram encontrados dados semelhantes em outro registro.', status: 'pending' }
  ],
  cycles: [
    { id: 'c1', name: 'Ciclo Censitário 2026', period: '2026–2027', status: 'Ativo', start: '01/01/2026', end: '31/12/2027' },
    { id: 'c0', name: 'Ciclo Censitário 2024', period: '2024–2025', status: 'Encerrado', start: '01/01/2024', end: '31/12/2025' },
    { id: 'c-1', name: 'Ciclo Censitário 2022', period: '2022–2023', status: 'Encerrado', start: '01/01/2022', end: '31/12/2023' }
  ],
  questionnaires: [
    { id: 'q1', title: 'Questionário censitário — perfil demográfico', summary: 'Inclusão de uma pergunta sobre município de residência e ajuste nas opções de escolaridade.', requester: 'Rafael Oliveira', profile: 'Membro da SEDES', date: '22 nov 2026', version: 'v1.4 → v1.5', changes: ['Novo campo: município de residência', 'Atualização das opções de escolaridade', 'Ajuste de texto de ajuda'] , status: 'pending' },
    { id: 'q2', title: 'Formulário temático — evento comunitário', summary: 'Revisão do texto de apresentação e das opções de identificação de gênero.', requester: 'Ana Ribeiro', profile: 'Membro da SEDES', date: '20 nov 2026', version: 'v1.1 → v1.2', changes: ['Texto introdutório revisado', 'Opção “Pessoa não binária” incluída', 'Campo de autodeclaração atualizado'], status: 'pending' }
  ],
  links: [
    { title: 'Pesquisa temática — demonstração', code: 'DEMO-7K2P', created: '21 nov 2026', status: 'Ativo' },
    { title: 'Levantamento comunitário — demonstração', code: 'DEMO-4M9A', created: '18 nov 2026', status: 'Ativo' }
  ],
  database: [
    { id: 'BD-001', name: 'Pessoa demonstrativa 01', cpf: '000.000.000-01', neighborhood: 'Centro', district: 'Sede', territory: 'Urbana', age: '25 a 29 anos', race: 'Parda', gender: 'Homem cisgênero', orientation: 'Gay', education: 'Ensino Médio completo', income: '1 a 2 salários mínimos', disability: 'Não', streetSituation: 'Não', cycle: '2026' },
    { id: 'BD-002', name: 'Pessoa demonstrativa 02', cpf: '000.000.000-02', neighborhood: 'Santa Terezinha', district: 'Sede', territory: 'Urbana', age: '60 anos ou mais', race: 'Preta', gender: 'Mulher cisgênero', orientation: 'Prefiro não responder', education: 'Ensino Fundamental incompleto', income: 'Até 1 salário mínimo', disability: 'Física', streetSituation: 'Sim', cycle: '2026' },
    { id: 'BD-003', name: 'Pessoa demonstrativa 03', cpf: '000.000.000-03', neighborhood: 'Jardim Petrolar', district: 'Sede', territory: 'Urbana', age: '18 a 24 anos', race: 'Branca', gender: 'Pessoa não binária', orientation: 'Bissexual', education: 'Ensino Superior incompleto', income: '1 a 2 salários mínimos', disability: 'Não', streetSituation: 'Não', cycle: '2026' },
    { id: 'BD-004', name: 'Pessoa demonstrativa 04', cpf: '000.000.000-04', neighborhood: 'Alagoinhas Velha', district: 'Sede', territory: 'Urbana', age: '40 a 49 anos', race: 'Indígena', gender: 'Mulher trans', orientation: 'Lésbica', education: 'Ensino Médio completo', income: '2 a 5 salários mínimos', disability: 'Visual', streetSituation: 'Sim', cycle: '2024' },
    { id: 'BD-005', name: 'Pessoa demonstrativa 05', cpf: '000.000.000-05', neighborhood: 'Barreiro', district: 'Rural', territory: 'Rural', age: '30 a 39 anos', race: 'Parda', gender: 'Homem trans', orientation: 'Pansexual', education: 'Ensino Fundamental completo', income: 'Até 1 salário mínimo', disability: 'Não', streetSituation: 'Não', cycle: '2026' },
    { id: 'BD-006', name: 'Pessoa demonstrativa 06', cpf: '000.000.000-06', neighborhood: 'Centro', district: 'Sede', territory: 'Urbana', age: '50 a 59 anos', race: 'Preta', gender: 'Mulher cisgênero', orientation: 'Heterossexual', education: 'Ensino Fundamental completo', income: '1 a 2 salários mínimos', disability: 'Auditiva', streetSituation: 'Não', cycle: '2026' },
    { id: 'BD-007', name: 'Pessoa demonstrativa 07', cpf: '000.000.000-07', neighborhood: 'Santa Terezinha', district: 'Sede', territory: 'Urbana', age: '25 a 29 anos', race: 'Branca', gender: 'Homem cisgênero', orientation: 'Heterossexual', education: 'Ensino Superior completo', income: '2 a 5 salários mínimos', disability: 'Não', streetSituation: 'Não', cycle: '2026' },
    { id: 'BD-008', name: 'Pessoa demonstrativa 08', cpf: '000.000.000-08', neighborhood: 'Jardim Petrolar', district: 'Sede', territory: 'Urbana', age: 'Até 17 anos', race: 'Parda', gender: 'Mulher cisgênero', orientation: 'Prefiro não responder', education: 'Ensino Fundamental incompleto', income: 'Prefiro não responder', disability: 'Não', streetSituation: 'Não', cycle: '2026' },
    { id: 'BD-009', name: 'Pessoa demonstrativa 09', cpf: '000.000.000-09', neighborhood: 'Alagoinhas Velha', district: 'Rural', territory: 'Rural', age: '40 a 49 anos', race: 'Preta', gender: 'Pessoa não binária', orientation: 'Bissexual', education: 'Ensino Médio incompleto', income: 'Até 1 salário mínimo', disability: 'Psicossocial', streetSituation: 'Sim', cycle: '2026' },
    { id: 'BD-010', name: 'Pessoa demonstrativa 10', cpf: '000.000.000-10', neighborhood: 'Barreiro', district: 'Rural', territory: 'Rural', age: '18 a 24 anos', race: 'Indígena', gender: 'Homem cisgênero', orientation: 'Gay', education: 'Ensino Médio completo', income: '1 a 2 salários mínimos', disability: 'Não', streetSituation: 'Não', cycle: '2026' }
  ]
};

const pageNames = {
  overview: 'Visão geral', analytics: 'Análise de dados', ask: 'Pergunte aos dados', collection: 'Coleta de Dados', users: 'Usuários', records: 'Qualidade dos dados',
  cycles: 'Ciclos de pesquisa', questionnaires: 'Questionários', links: 'Formulários externos'
};

function setPage(page) {
  if (!pageNames[page]) return;
  state.page = page;
  $('#breadcrumb-current').textContent = pageNames[page];
  $$('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.page === page));
  $('#sidebar').classList.remove('open');
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function heading(eyebrow, title, description, actions = '') {
  return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ''}</div>`;
}

function updateCounters() {
  const pendingRecords = state.records.filter(item => item.status === 'pending').length;
  const pendingApprovals = state.questionnaires.filter(item => item.status === 'pending').length;
  $('#nav-user-count').textContent = state.users.length;
  $('#nav-approval-count').textContent = pendingApprovals;
  const navRecords = $('[data-page="records"]');
  if (navRecords) {
    let badge = $('.nav-counter', navRecords);
    if (pendingRecords && !badge) {
      badge = document.createElement('span'); badge.className = 'nav-counter'; navRecords.append(badge);
    }
    if (badge) { badge.textContent = pendingRecords; badge.hidden = !pendingRecords; }
  }
}

function renderPage() {
  const content = $('#page-content');
  const pages = {
    overview: renderOverview,
    analytics: renderAnalytics,
    ask: renderDataChat,
    collection: renderCollection,
    users: renderUsers,
    records: renderRecords,
    cycles: renderCycles,
    questionnaires: renderQuestionnaires,
    links: renderLinks
  };
  content.innerHTML = pages[state.page]();
  updateCounters();
}

function renderOverview() {
  const activeUsers = state.users.filter(user => user.active).length;
  const pendingRecords = state.records.filter(record => record.status === 'pending').length;
  const pendingApprovals = state.questionnaires.filter(item => item.status === 'pending').length;
  const activeCycle = state.cycles.find(cycle => cycle.status === 'Ativo');
  return `
    ${heading('PAINEL ADMINISTRATIVO', 'Olá, Carla', 'Acompanhe a administração e a governança do Observatório.', `<button class="button button-outline" data-action="open-users">${icon('users')} Gerenciar usuários</button>`)}
    <div class="welcome-line"><span>Quinta-feira, 26 de novembro de 2026</span><i class="welcome-separator"></i><span>Alagoinhas, Bahia</span></div>
    <div class="overview-grid" style="margin-top:18px">
      <article class="panel metric-card"><div class="metric-top"><span>Usuários ativos</span><span class="metric-icon">${icon('users')}</span></div><div class="metric-number">${activeUsers}<span class="metric-trend">no sistema</span></div><div class="metric-note">Perfis com acesso habilitado</div></article>
      <article class="panel metric-card"><div class="metric-top"><span>Registros para revisar</span><span class="metric-icon gold">${icon('alert')}</span></div><div class="metric-number">${pendingRecords}<span class="metric-trend" style="color:#b28143">na fila</span></div><div class="metric-note">Sinalizados para conferência administrativa</div></article>
      <article class="panel metric-card"><div class="metric-top"><span>Ciclo de pesquisa</span><span class="metric-icon blue">${icon('calendar')}</span></div><div class="metric-number" style="font-size:19px">${activeCycle ? '01' : '00'}<span class="metric-trend" style="color:#6887bb">ativo</span></div><div class="metric-note">${activeCycle ? activeCycle.name : 'Nenhum ciclo ativo'}</div></article>
      <article class="panel metric-card"><div class="metric-top"><span>Questionários pendentes</span><span class="metric-icon red">${icon('clipboard')}</span></div><div class="metric-number">${pendingApprovals}<span class="metric-trend" style="color:#b56b63">aprovação</span></div><div class="metric-note">Alterações aguardando sua análise</div></article>
    </div>

    <div class="overview-layout">
      <section class="panel cycle-summary">
        <div class="cycle-summary-top"><div class="cycle-name"><span class="cycle-badge">${icon('calendar')}</span><div><h3>${activeCycle?.name || 'Nenhum ciclo ativo'}</h3><p>Ciclo atual · coleta e atualização da base</p></div></div><span class="status status-active">Ativo</span></div>
        <div class="cycle-summary-grid"><div><small>Período</small><b>${activeCycle?.period || '—'}</b></div><div><small>Intervalo mínimo</small><b>${state.intervalDays ? `${state.intervalDays} dias` : 'A definir'}</b></div><div><small>Alterações do questionário</small><b>${pendingApprovals} aguardando aprovação</b></div></div>
      </section>
      <section class="panel review-summary"><div class="panel-header"><div><h2 class="panel-title">Fila de qualidade</h2><p class="panel-subtitle">Registros sinalizados automaticamente</p></div><button class="text-link" data-page="records">Ver fila</button></div>
        ${state.records.filter(record => record.status === 'pending').slice(0,3).map((record,index) => `<div class="review-summary-row"><span class="review-type-icon ${index === 1 ? 'red' : ''}">${icon(index === 1 ? 'alert' : 'clock')}</span><span class="review-row-copy"><b>${record.type}</b><small>${record.id} · ${record.date}</small></span><span class="review-row-count">1</span></div>`).join('') || `<div class="empty-state" style="padding:20px 8px">Nenhum registro pendente.</div>`}
      </section>
    </div>

    <div class="dashboard-bottom">
      <section class="panel quick-actions"><h2 class="panel-title">Acesso rápido</h2><div class="quick-action-grid">
        <button class="quick-action" data-page="analytics"><span class="quick-action-icon">${icon('chart')}</span><span><b>Analisar dados</b><small>Filtros, gráficos e relatórios</small></span></button>
        <button class="quick-action" data-action="open-user-modal"><span class="quick-action-icon">${icon('plus')}</span><span><b>Cadastrar usuário</b><small>Defina um perfil de acesso</small></span></button>
        <button class="quick-action" data-page="records"><span class="quick-action-icon">${icon('shield')}</span><span><b>Revisar registros</b><small>${pendingRecords} itens aguardando</small></span></button>
        <button class="quick-action" data-page="links"><span class="quick-action-icon">${icon('link')}</span><span><b>Gerar formulário externo</b><small>Crie um link de pesquisa</small></span></button>
      </div></section>
      <aside class="governance-note"><div class="governance-note-head">${icon('lock')} Acesso e proteção de dados</div><p>O administrador consulta a base completa e identificada, sem anonimização ou supressão. O membro da SEDES acessa somente informações agregadas e anonimizadas.</p></aside>
    </div>`;
}

function filteredUsers() {
  const q = state.userQuery.trim().toLocaleLowerCase('pt-BR');
  return state.users.filter(user => {
    const matchesText = !q || `${user.name} ${user.email} ${user.profile}`.toLocaleLowerCase('pt-BR').includes(q);
    const matchesRole = state.userRole === 'all' || user.profile === state.userRole;
    const matchesStatus = state.userStatus === 'all' || (state.userStatus === 'active' ? user.active : !user.active);
    return matchesText && matchesRole && matchesStatus;
  });
}

function userRows() {
  const list = filteredUsers();
  if (!list.length) return `<tr><td colspan="6"><div class="empty-state"><span class="empty-icon">${icon('search')}</span><strong>Nenhum usuário encontrado</strong>Tente outro nome, e-mail ou perfil.</div></td></tr>`;
  return list.map((user,index) => `<tr>
    <td><div class="user-cell"><span class="user-avatar ${index%4 ? `alt-${index%4}` : ''}">${escapeHtml(user.initials)}</span><span><span class="row-primary">${escapeHtml(user.name)}</span><span class="row-secondary">${escapeHtml(user.email)}</span></span></div></td>
    <td><span class="role-tag">${escapeHtml(user.profile)}</span></td>
    <td><span class="status ${user.active ? 'status-active' : 'status-inactive'}">${user.active ? 'Ativo' : 'Inativo'}</span></td>
    <td><span class="last-access">${escapeHtml(user.last)}</span></td>
    <td><div class="table-actions"><button class="table-action" title="Editar usuário" aria-label="Editar ${escapeHtml(user.name)}" data-action="edit-user" data-id="${user.id}">${icon('edit')}</button><button class="table-action" title="${user.active ? 'Inativar' : 'Ativar'} usuário" aria-label="${user.active ? 'Inativar' : 'Ativar'} ${escapeHtml(user.name)}" data-action="toggle-user" data-id="${user.id}">${icon(user.active ? 'lock' : 'check')}</button></div></td>
  </tr>`).join('');
}

function renderUsers() {
  return `${heading('GESTÃO DO SISTEMA', 'Usuários', 'Cadastre e gerencie os acessos de administradores, membros e entrevistadores.', `<button class="button button-primary" data-action="open-user-modal">${icon('plus')} Cadastrar usuário</button>`)}
    <section class="panel users-panel">
      <div class="users-toolbar"><label class="search-field">${icon('search')}<input id="user-search" type="search" placeholder="Buscar por nome ou e-mail" value="${escapeHtml(state.userQuery)}" /></label><select id="user-role-filter" class="select-field" aria-label="Filtrar por perfil"><option value="all">Todos os perfis</option>${['Administrador da SEDES','Membro da SEDES','Entrevistador'].map(role=>`<option value="${role}" ${state.userRole===role?'selected':''}>${role}</option>`).join('')}</select><select id="user-status-filter" class="select-field" aria-label="Filtrar por situação"><option value="all" ${state.userStatus==='all'?'selected':''}>Todos os status</option><option value="active" ${state.userStatus==='active'?'selected':''}>Ativos</option><option value="inactive" ${state.userStatus==='inactive'?'selected':''}>Inativos</option></select><span class="table-count" id="user-count">${filteredUsers().length} usuário(s)</span></div>
      <div class="table-wrap"><table><thead><tr><th>Usuário</th><th>Perfil de acesso</th><th>Status</th><th>Último acesso</th><th style="text-align:right">Ações</th></tr></thead><tbody id="user-table-body">${userRows()}</tbody></table></div>
      <div class="table-foot"><span>Os perfis definem quais áreas do sistema cada pessoa pode acessar.</span><div class="pagination"><button>1</button></div></div>
    </section>`;
}

function filteredRecords() {
  const q = state.recordQuery.trim().toLocaleLowerCase('pt-BR');
  return state.records.filter(record => record.status === 'pending' && (!q || `${record.id} ${record.name} ${record.cpf} ${record.neighborhood} ${record.type}`.toLocaleLowerCase('pt-BR').includes(q)) && (state.recordType === 'all' || record.type === state.recordType));
}

function recordRows() {
  const list = filteredRecords();
  if (!list.length) return `<tr><td colspan="6"><div class="empty-state"><span class="empty-icon">${icon('check')}</span><strong>Fila sem registros pendentes</strong>Os novos alertas aparecerão aqui para revisão.</div></td></tr>`;
  return list.map(record => `<tr>
    <td><span class="record-name">${escapeHtml(record.name)}</span><span class="record-id">${record.id}</span></td>
    <td><span class="cpf">${record.cpf}</span></td>
    <td><span class="type-pill">${escapeHtml(record.type)}</span></td>
    <td>${escapeHtml(record.neighborhood)}</td>
    <td><span class="last-access">${escapeHtml(record.date)}</span></td>
    <td><div class="table-actions"><button class="table-action-label" data-action="review-record" data-id="${record.id}">${icon('eye')} Revisar</button></div></td>
  </tr>`).join('');
}

function renderRecords() {
  const pending = state.records.filter(record => record.status === 'pending');
  const duplicates = pending.filter(record => record.type === 'Possível duplicidade').length;
  const inconsistencies = pending.length - duplicates;
  return `${heading('GOVERNANÇA DE DADOS', 'Qualidade dos dados', 'Confira registros sinalizados antes de validar a base de pesquisa.', `<button class="button button-outline" data-action="refresh-records">${icon('clock')} Atualizado agora</button>`)}
    <div class="privacy-callout">${icon('lock')}<span><strong>Área restrita ao perfil administrador</strong>Os registros desta fila podem conter informações identificadas. Os dados apresentados aqui são fictícios e servem apenas para demonstrar a interface.</span></div>
    <div class="records-summary"><article class="panel record-stat"><span class="metric-icon gold">${icon('alert')}</span><span><b>${pending.length}</b><small>Registros pendentes</small></span></article><article class="panel record-stat"><span class="metric-icon red">${icon('users')}</span><span><b>${duplicates}</b><small>Possíveis duplicidades</small></span></article><article class="panel record-stat"><span class="metric-icon blue">${icon('clipboard')}</span><span><b>${inconsistencies}</b><small>Outras inconsistências</small></span></article></div>
    <section class="panel users-panel"><div class="records-toolbar"><label class="search-field">${icon('search')}<input id="record-search" type="search" placeholder="Buscar por registro, CPF ou bairro" value="${escapeHtml(state.recordQuery)}" /></label><select id="record-type-filter" class="select-field" aria-label="Filtrar por tipo"><option value="all">Todos os alertas</option>${[...new Set(state.records.map(record=>record.type))].map(type=>`<option ${state.recordType===type?'selected':''}>${type}</option>`).join('')}</select><span class="table-count" id="record-count">${filteredRecords().length} registro(s)</span></div>
      <div class="table-wrap"><table><thead><tr><th>Registro</th><th>CPF vinculado</th><th>Sinalização</th><th>Bairro</th><th>Data de envio</th><th style="text-align:right">Ação</th></tr></thead><tbody id="record-table-body">${recordRows()}</tbody></table></div>
      <div class="table-foot"><span>A edição, validação ou exclusão deve seguir as permissões administrativas definidas pela SEDES.</span><span>${pending.length} pendente(s)</span></div>
    </section>`;
}

const filterOptions = {
  age: ['Até 17 anos','18 a 24 anos','25 a 29 anos','30 a 39 anos','40 a 49 anos','50 a 59 anos','60 anos ou mais'],
  gender: ['Mulher cisgênero','Homem cisgênero','Mulher trans','Homem trans','Pessoa não binária'],
  race: ['Preta','Parda','Branca','Amarela','Indígena'],
  education: ['Não estudei','Ensino Fundamental incompleto','Ensino Fundamental completo','Ensino Médio incompleto','Ensino Médio completo','Ensino Superior incompleto','Ensino Superior completo','Pós-graduação'],
  orientation: ['Lésbica','Gay','Bissexual','Pansexual','Assexual','Heterossexual','Prefiro não responder'],
  neighborhood: ['Centro','Santa Terezinha','Jardim Petrolar','Alagoinhas Velha','Barreiro'],
  district: ['Sede','Rural'],
  territory: ['Urbana','Rural'],
  income: ['Até 1 salário mínimo','1 a 2 salários mínimos','2 a 5 salários mínimos','Prefiro não responder'],
  disability: ['Não','Física','Auditiva','Visual','Intelectual','Psicossocial','Múltipla','Prefiro não responder'],
  streetSituation: ['Sim','Não','Prefiro não responder']
};

function collectionFilterSelect(key, label, selected = '') {
  return `<label class="collection-field"><span>${label}</span><select name="${key}" aria-label="${label}"><option value="">${label}</option>${filterOptions[key].map(value=>`<option value="${escapeHtml(value)}" ${selected===value?'selected':''}>${escapeHtml(value)}</option>`).join('')}</select>${icon('chevron-down')}</label>`;
}

function filteredData(filters = {}) {
  return state.database.filter(record => {
    const keys = ['age','gender','race','education','orientation','neighborhood','district','territory','income','disability','streetSituation','cycle'];
    const matchesSelects = keys.every(key => !filters[key] || record[key] === filters[key]);
    const chosenTerritories = filters.territories || [];
    const matchesTerritory = !chosenTerritories.length || chosenTerritories.length === 2 || chosenTerritories.includes(record.territory);
    return matchesSelects && matchesTerritory;
  });
}

function renderCollection() {
  const filters = state.collectionApplied;
  const rows = filteredData(filters);
  return `<div class="collection-page">${heading('CONSULTA DA BASE', 'Coleta de Dados', 'Consulte e filtre os registros coletados no Observatório.', `<span class="status status-alert">${icon('lock')} Acesso integral · Administrador</span>`)}
    <div class="collection-cycle-row"><span class="collection-base-label">Base atual</span><select name="cycle" form="collection-filter-form" class="collection-cycle-select" aria-label="Base atual"><option value="" ${!filters.cycle?'selected':''}>Todos os ciclos</option><option value="2026" ${filters.cycle==='2026'?'selected':''}>Ciclo Censitário 2026</option><option value="2024" ${filters.cycle==='2024'?'selected':''}>Ciclo Censitário 2024</option></select><span class="collection-access-hint">Nome e CPF visíveis para este perfil</span></div>
    <section class="panel collection-filter-panel"><div class="collection-filter-title">Filtros</div><form id="collection-filter-form"><div class="collection-filter-grid">
      ${collectionFilterSelect('age','Faixa Etária',filters.age)}${collectionFilterSelect('gender','Gênero',filters.gender)}
      ${collectionFilterSelect('race','Cor/Raça',filters.race)}${collectionFilterSelect('education','Escolaridade',filters.education)}
      ${collectionFilterSelect('orientation','Sexualidade',filters.orientation)}${collectionFilterSelect('neighborhood','Bairro',filters.neighborhood)}
      ${collectionFilterSelect('district','Distrito',filters.district)}${collectionFilterSelect('income','Classificação da Renda',filters.income)}
      ${collectionFilterSelect('disability','Deficiência',filters.disability)}${collectionFilterSelect('streetSituation','Situação de rua',filters.streetSituation)}
      <fieldset class="territory-field"><legend>Território</legend><label><input type="checkbox" name="territories" value="Urbana" ${(filters.territories||[]).includes('Urbana')?'checked':''}/> Zona Urbana</label><label><input type="checkbox" name="territories" value="Rural" ${(filters.territories||[]).includes('Rural')?'checked':''}/> Zona Rural</label></fieldset>
    </div><div class="collection-filter-actions"><button type="button" class="button button-outline" data-action="clear-collection-filters">${icon('close')} Limpar Tudo</button><span class="collection-filter-spacer"></span><button type="submit" class="button button-primary">${icon('search')} Pesquisar</button></div></form></section>
    <section class="panel collection-results"><div class="collection-results-head"><div><h2>Resultados</h2><small>${rows.length} de ${state.database.length} registros demonstrativos</small></div><button class="button button-primary" data-action="export-collection">${icon('download')} Exportar Dados</button></div>
      <div class="table-wrap"><table><thead><tr><th>Nome</th><th>CPF</th><th>Idade</th><th>Gênero</th><th>Cor/Raça</th><th>Escolaridade</th><th>Bairro</th><th></th></tr></thead><tbody>${rows.length?rows.map(record=>`<tr><td class="row-primary">${escapeHtml(record.name)}</td><td class="cpf">${record.cpf}</td><td>${escapeHtml(record.age)}</td><td>${escapeHtml(record.gender)}</td><td>${escapeHtml(record.race)}</td><td>${escapeHtml(record.education)}</td><td>${escapeHtml(record.neighborhood)}</td><td><button class="table-action" title="Ver dados completos" aria-label="Ver ${escapeHtml(record.name)}" data-action="view-database-record" data-id="${record.id}">${icon('eye')}</button></td></tr>`).join(''):`<tr><td colspan="8"><div class="empty-state"><span class="empty-icon">${icon('search')}</span><strong>Nenhum registro encontrado</strong>Ajuste os filtros e tente novamente.</div></td></tr>`}</tbody></table></div>
      <div class="table-foot"><span>Visão identificada, sem anonimização dos campos para o perfil administrador.</span><span>${rows.length} registro(s)</span></div></section></div>`;
}

function analyticsRows() { return filteredData(state.analyticsApplied); }

function countBy(rows, key) {
  return rows.reduce((counts, row) => { const label = row[key] || 'Não informado'; counts[label] = (counts[label] || 0) + 1; return counts; }, {});
}

function analyticsFilterSelect(key, label, selected = '') {
  return `<label class="analytics-filter"><span>${label}</span><select name="${key}"><option value="">Todos</option>${filterOptions[key].map(value=>`<option value="${escapeHtml(value)}" ${selected===value?'selected':''}>${escapeHtml(value)}</option>`).join('')}</select></label>`;
}

function renderBars(rows, key) {
  const entries = Object.entries(countBy(rows,key)).sort((a,b)=>b[1]-a[1]);
  const max = Math.max(1,...entries.map(([,count])=>count));
  return entries.map(([label,count])=>`<div class="bar-row"><span class="bar-label">${escapeHtml(label)}</span><span class="bar-track"><i style="width:${Math.round(count/max*100)}%"></i></span><b>${count}</b></div>`).join('') || '<div class="empty-chart">Sem dados para os filtros escolhidos.</div>';
}

function renderAnalytics() {
  const rows = analyticsRows();
  const cycleLabel = state.analyticsApplied.cycle || 'Todos';
  const neighborhoods = Object.entries(countBy(rows,'neighborhood'));
  const raceCounts = Object.entries(countBy(rows,'race')).sort((a,b)=>b[1]-a[1]);
  const disabledCount = rows.filter(row=>row.disability!=='Não').length;
  const mapCounts = Object.fromEntries(neighborhoods);
  const mapPolygons = [
    {name:'Santa Terezinha',d:'M36 45 100 28 129 57 113 94 62 100 32 77'},
    {name:'Centro',d:'M133 49 183 36 207 66 191 104 137 102 119 75'},
    {name:'Barreiro',d:'M209 43 266 51 279 88 253 113 197 103 197 69'},
    {name:'Jardim Petrolar',d:'M51 110 113 103 138 133 120 174 66 169 35 140'},
    {name:'Alagoinhas Velha',d:'M144 111 196 108 223 137 209 177 151 182 124 151'}
  ];
  const mapSvg = mapPolygons.map((zone,index)=>`<path class="map-zone map-zone-${index+1}" d="${zone.d}"/><text x="${index===0?70:index===1?157:index===2?235:index===3?83:169}" y="${index===0?69:index===1?73:index===2?78:index===3?143:148}">${escapeHtml(zone.name)}</text><circle cx="${index===0?96:index===1?172:index===2?243:index===3?99:181}" cy="${index===0?87:index===1?91:index===2?94:index===3?151:159}" r="10"/><text class="map-count" x="${index===0?96:index===1?172:index===2?243:index===3?99:181}" y="${index===0?90:index===1?94:index===2?97:index===3?154:162}">${mapCounts[zone.name]||0}</text>`).join('');
  return `${heading('PAINEL DO OBSERVATÓRIO', 'Análise de dados', 'Explore recortes demográficos e territoriais da base de Alagoinhas.', `<span class="status status-alert">${icon('lock')} Visão completa · Administrador</span>`)}
    <section class="panel analytics-filter-panel"><div class="analytics-filter-heading">${icon('filter')}<div><b>Filtros e recortes</b><small>Combine características e território para consultar a base.</small></div></div><form id="analytics-filter-form"><div class="analytics-filter-grid">${analyticsFilterSelect('age','Faixa etária',state.analyticsApplied.age)}${analyticsFilterSelect('gender','Gênero',state.analyticsApplied.gender)}${analyticsFilterSelect('race','Cor/Raça',state.analyticsApplied.race)}${analyticsFilterSelect('education','Escolaridade',state.analyticsApplied.education)}${analyticsFilterSelect('orientation','Sexualidade',state.analyticsApplied.orientation)}${analyticsFilterSelect('neighborhood','Bairro',state.analyticsApplied.neighborhood)}${analyticsFilterSelect('district','Distrito',state.analyticsApplied.district)}${analyticsFilterSelect('territory','Território',state.analyticsApplied.territory)}${analyticsFilterSelect('disability','Deficiência',state.analyticsApplied.disability)}${analyticsFilterSelect('streetSituation','Situação de rua',state.analyticsApplied.streetSituation)}<label class="analytics-filter"><span>Ciclo</span><select name="cycle"><option value="">Todos</option><option value="2026" ${state.analyticsApplied.cycle==='2026'?'selected':''}>2026</option><option value="2024" ${state.analyticsApplied.cycle==='2024'?'selected':''}>2024</option></select></label></div><div class="analytics-filter-bottom"><span>${icon('lock')} Dados identificados disponíveis neste perfil; membros veem resultados anonimizados.</span><div><button type="button" class="button button-outline" data-action="clear-analytics-filters">Limpar</button><button type="submit" class="button button-primary">${icon('search')} Aplicar filtros</button></div></div></form></section>
    <div class="overview-grid analytics-metrics"><article class="panel metric-card"><div class="metric-top"><span>Registros no recorte</span><span class="metric-icon">${icon('users')}</span></div><div class="metric-number">${rows.length}<span class="metric-trend">entrevistas</span></div><div class="metric-note">Base demonstrativa · ciclo ${cycleLabel}</div></article><article class="panel metric-card"><div class="metric-top"><span>Bairros no recorte</span><span class="metric-icon blue">${icon('map')}</span></div><div class="metric-number">${neighborhoods.length}<span class="metric-trend" style="color:#6887bb">territórios</span></div><div class="metric-note">Distribuição territorial</div></article><article class="panel metric-card"><div class="metric-top"><span>Com deficiência</span><span class="metric-icon gold">${icon('users')}</span></div><div class="metric-number">${disabledCount}<span class="metric-trend" style="color:#b28143">registros</span></div><div class="metric-note">Campo identificado na base</div></article><article class="panel metric-card"><div class="metric-top"><span>Relatório</span><span class="metric-icon red">${icon('file')}</span></div><div class="metric-number" style="font-size:17px">Pronto<span class="metric-trend" style="color:#b56b63">para emitir</span></div><div class="metric-note">Recorte atual aplicado</div></article></div>
    <div class="analytics-grid"><section class="panel chart-panel"><div class="panel-header"><div><h2 class="panel-title">Distribuição por faixa etária</h2><p class="panel-subtitle">Número de entrevistas no recorte atual</p></div><span class="chart-legend"><i></i> Registros</span></div><div class="bar-chart">${renderBars(rows,'age')}</div></section>
      <section class="panel chart-panel"><div class="panel-header"><div><h2 class="panel-title">Distribuição por raça/cor</h2><p class="panel-subtitle">Autodeclaração dos entrevistados</p></div><span class="chart-legend"><i class="gold-dot"></i> Registros</span></div><div class="race-chart">${raceCounts.length?raceCounts.map(([label,count])=>`<div class="race-bar-item"><span class="race-bar-value">${count}</span><div class="race-bar-track"><i style="height:${Math.max(10,Math.round(count/Math.max(1,...raceCounts.map(([,n])=>n))*100))}%"></i></div><small>${escapeHtml(label)}</small></div>`).join(''):'<div class="empty-chart">Sem dados para os filtros escolhidos.</div>'}</div></section>
      <section class="panel map-panel"><div class="panel-header"><div><h2 class="panel-title">Distribuição por bairro</h2><p class="panel-subtitle">Mapa esquemático · totais do recorte</p></div><span class="map-scale">menor <i></i> maior</span></div><div class="map-canvas"><svg viewBox="0 0 310 205" role="img" aria-label="Mapa esquemático com totais por bairro">${mapSvg}</svg></div><div class="map-footnote">Representação ilustrativa para prototipação.</div></section>
      <section class="panel report-panel"><div class="panel-header"><div><h2 class="panel-title">Resumo para relatório</h2><p class="panel-subtitle">Síntese do recorte selecionado</p></div>${icon('file')}</div><div class="report-summary"><div><span>Registros consultados</span><b>${rows.length}</b></div><div><span>Territórios com dados</span><b>${neighborhoods.length}</b></div><div><span>Grupo com deficiência</span><b>${disabledCount}</b></div><div><span>Ciclo</span><b>${cycleLabel}</b></div></div><div class="report-callout">O relatório apresentará filtros selecionados, indicadores e gráficos do recorte atual.</div><button class="button button-primary report-export" data-action="export-analysis">${icon('download')} Exportar relatório PDF</button></section></div>
    <section class="panel cross-panel"><div class="panel-header"><div><h2 class="panel-title">Cruzamento por cor/raça e gênero</h2><p class="panel-subtitle">Contagem de registros por combinação no recorte atual.</p></div><span class="status status-info">Dados identificados</span></div><div class="table-wrap"><table><thead><tr><th>Cor/Raça</th>${filterOptions.gender.map(gender=>`<th>${escapeHtml(gender)}</th>`).join('')}</tr></thead><tbody>${filterOptions.race.map(race=>`<tr><td class="row-primary">${race}</td>${filterOptions.gender.map(gender=>`<td>${rows.filter(row=>row.race===race&&row.gender===gender).length}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>
    <section class="panel analytics-table-panel"><div class="panel-header"><div><h2 class="panel-title">Registros do recorte</h2><p class="panel-subtitle">Acesso administrativo identificado, incluindo CPF e respostas demográficas.</p></div><button class="button button-outline" data-action="export-collection">${icon('download')} Exportar dados</button></div><div class="table-wrap"><table><thead><tr><th>Nome</th><th>CPF</th><th>Bairro</th><th>Faixa etária</th><th>Gênero</th><th>Sexualidade</th><th>Deficiência</th><th>Situação de rua</th></tr></thead><tbody>${rows.map(record=>`<tr><td class="row-primary">${escapeHtml(record.name)}</td><td class="cpf">${record.cpf}</td><td>${escapeHtml(record.neighborhood)}</td><td>${escapeHtml(record.age)}</td><td>${escapeHtml(record.gender)}</td><td>${escapeHtml(record.orientation)}</td><td>${escapeHtml(record.disability)}</td><td>${escapeHtml(record.streetSituation)}</td></tr>`).join('')||'<tr><td colspan="8"><div class="empty-state">Nenhum registro para o recorte selecionado.</div></td></tr>'}</tbody></table></div></section>`;
}

function renderDataChat() {
  return `${heading('ANÁLISE ASSISTIDA', 'Pergunte aos dados', 'Faça perguntas em linguagem natural sobre a base do Observatório.', `<span class="status status-info">Text-to-SQL</span>`)}
    <div class="chat-layout"><aside class="panel chat-help-panel"><span class="chat-help-icon">${icon('chat')}</span><h2>Explore os dados conversando</h2><p>O recurso Text-to-SQL transforma perguntas em consultas para apoiar a análise da base.</p><div class="chat-help-label">EXEMPLOS DE PERGUNTAS</div><div class="chat-example">Quantas pessoas com deficiência há por bairro?</div><div class="chat-example">Como se distribuem as faixas etárias?</div><div class="chat-example">Cruze escolaridade e cor/raça.</div><div class="chat-access-note">${icon('lock')} Como administrador, você pode consultar os dados completos e identificados.</div></aside>
      <section class="panel chat-window"><header class="chat-window-header"><span class="chat-bot-avatar">${icon('chart')}</span><span><b>Assistente do Observatório</b><small>Text-to-SQL · Protótipo visual</small></span><span class="chat-status"><i></i> Demonstração</span></header><div class="chat-messages"><div class="chat-date-separator">HOJE</div><div class="chat-message assistant-message"><span class="chat-bot-avatar small">${icon('chart')}</span><div><b>Assistente</b><p>Olá! Posso ajudar a explorar os dados demográficos de Alagoinhas. Escreva uma pergunta sobre a base para começar.</p><small>Esta tela demonstra o chat; a integração Text-to-SQL ainda não está conectada.</small></div></div></div><div class="chat-compose"><textarea placeholder="Pergunte algo sobre os dados..." aria-label="Digite sua pergunta" disabled></textarea><button class="button button-primary" disabled>${icon('search')} Enviar</button></div><div class="chat-disclaimer">As respostas serão apresentadas conforme as permissões do perfil administrador.</div></section></div>`;
}

function renderCycles() {
  const current = state.cycles.find(cycle => cycle.status === 'Ativo');
  return `${heading('CONFIGURAÇÃO DA PESQUISA', 'Ciclos de pesquisa', 'Organize os períodos censitários e defina parâmetros para novas entrevistas.', `<button class="button button-primary" data-action="open-cycle-modal">${icon('plus')} Novo ciclo</button>`)}
    <section class="panel cycle-hero"><div class="cycle-hero-top"><div class="cycle-hero-ident"><span class="cycle-badge">${icon('calendar')}</span><div><h2>${escapeHtml(current?.name || 'Nenhum ciclo ativo')}</h2><p>Base censitária oficial · atualizado por ciclo de pesquisa</p></div></div>${current ? '<span class="status status-active">Ciclo ativo</span>' : '<span class="status status-inactive">Sem ciclo ativo</span>'}</div>
      <div class="cycle-hero-stats"><div><small>Período</small><b>${current?.period || '—'}</b></div><div><small>Início previsto</small><b>${current?.start || '—'}</b></div><div><small>Encerramento previsto</small><b>${current?.end || '—'}</b></div></div>
    </section>
    <div class="settings-grid"><section class="panel setting-panel"><h3>Intervalo mínimo entre entrevistas</h3><p>Defina quanto tempo deve passar antes que uma pessoa possa ser entrevistada novamente. O prazo ainda precisa ser validado pela SEDES.</p>
      <form id="interval-form"><label class="field-label" for="interval-days">Prazo configurado</label><div class="interval-control"><input class="input" id="interval-days" type="number" min="1" max="3650" placeholder="Ex.: 180" value="${escapeHtml(state.intervalDays)}" /><select class="select-field" aria-label="Unidade do intervalo"><option selected>dias</option></select></div><small class="field-help">${state.intervalDays ? 'Parâmetro de demonstração salvo nesta sessão.' : 'Nenhum prazo foi definido neste protótipo.'}</small><div class="setting-actions"><span class="saved-note" id="interval-feedback"></span><button class="button button-outline" type="submit">Salvar parâmetro</button></div></form>
    </section><aside class="panel timeline-panel"><h3>Atualizações recentes</h3>${state.cycles.map(cycle=>`<div class="timeline-item ${cycle.status==='Ativo'?'':'past'}"><span class="timeline-dot"></span><span class="timeline-copy"><b>${escapeHtml(cycle.name)} ${cycle.status==='Ativo'?'<span class="status status-active">Ativo</span>':''}</b><small>${cycle.status==='Ativo'?'Ciclo em andamento':`Período ${cycle.period} · ${cycle.status.toLocaleLowerCase('pt-BR')}`}</small></span></div>`).join('')}</aside></div>
    <section class="panel past-cycles"><div class="panel-header"><div><h2 class="panel-title">Histórico de ciclos</h2><p class="panel-subtitle">Consulte períodos de pesquisa anteriores e o ciclo vigente.</p></div></div><div class="table-wrap"><table><thead><tr><th>Ciclo</th><th>Período</th><th>Data de início</th><th>Data de encerramento</th><th>Status</th></tr></thead><tbody>${state.cycles.map(cycle=>`<tr><td class="row-primary">${escapeHtml(cycle.name)}</td><td><span class="cycle-period">${cycle.period}</span></td><td>${cycle.start}</td><td>${cycle.end}</td><td><span class="status ${cycle.status==='Ativo'?'status-active':'status-closed'}">${cycle.status}</span></td></tr>`).join('')}</tbody></table></div></section>`;
}

function renderQuestionnaires() {
  const pending = state.questionnaires.filter(item => item.status === 'pending');
  const completed = state.questionnaires.filter(item => item.status !== 'pending');
  const list = state.approvalFilter === 'pending' ? pending : completed;
  return `${heading('GOVERNANÇA DOS QUESTIONÁRIOS', 'Questionários', 'Revise as alterações propostas antes que uma nova versão entre em uso.', `<button class="button button-outline" data-action="questionnaire-guide">${icon('help')} Sobre as aprovações</button>`)}
    <div class="approval-intro"><span class="approval-intro-icon">${icon('clipboard')}</span><span class="approval-intro-copy"><b>${pending.length ? `${pending.length} alteração(ões) aguardando sua aprovação` : 'Nenhuma alteração aguardando aprovação'}</b><small>A administração da SEDES aprova mudanças estruturais nos instrumentos de coleta.</small></span><span class="approval-count">${pending.length}</span></div>
    <div class="toolbar" style="margin-bottom:12px"><button class="button ${state.approvalFilter==='pending'?'button-primary':'button-outline'}" data-action="approval-filter" data-filter="pending">Pendentes (${pending.length})</button><button class="button ${state.approvalFilter==='history'?'button-primary':'button-outline'}" data-action="approval-filter" data-filter="history">Decididos (${completed.length})</button></div>
    <div class="approval-list">${list.length ? list.map(item=>`<article class="panel approval-card"><div class="approval-card-top"><div class="approval-title-wrap"><span class="questionnaire-icon">${icon('clipboard')}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><div class="change-chips">${item.changes.slice(0,3).map(change=>`<span class="change-chip">${escapeHtml(change)}</span>`).join('')}</div></div></div><span class="status ${item.status==='pending'?'status-pending':item.status==='approved'?'status-approved':'status-inactive'}">${item.status==='pending'?'Aguardando aprovação':item.status==='approved'?'Aprovado':'Rejeitado'}</span></div><div class="approval-meta"><span>Solicitado por <b>${escapeHtml(item.requester)}</b></span><span>Perfil <b>${escapeHtml(item.profile)}</b></span><span>Versão <b>${item.version}</b></span><span>${item.date}</span></div><div class="approval-card-bottom"><small>Confira o resumo e os campos alterados antes de decidir.</small><div class="approval-actions">${item.status==='pending'?`<button class="button button-outline" data-action="review-questionnaire" data-id="${item.id}">Analisar alteração</button>`:`<button class="button button-outline" data-action="review-questionnaire" data-id="${item.id}">${icon('eye')} Ver decisão</button>`}</div></div></article>`).join('') : `<section class="panel"><div class="empty-state"><span class="empty-icon">${icon(state.approvalFilter==='pending'?'check':'clipboard')}</span><strong>${state.approvalFilter==='pending'?'Tudo em dia':'Nenhuma decisão registrada'}</strong>${state.approvalFilter==='pending'?'Novas solicitações de alteração aparecerão aqui.':'As decisões sobre alterações aparecerão nesta lista.'}</div></section>`}</div>`;
}

function renderLinks() {
  return `${heading('COLETA POR LINK', 'Formulários externos', 'Gere links para pesquisas temáticas e eventos compartilhados fora do aplicativo de campo.', `<span class="status status-info">Pesquisa anônima</span>`)}
    <div class="forms-layout"><section class="panel form-builder"><h2>Gerar novo link</h2><p>Configure a identificação do formulário e disponibilize um endereço para compartilhamento.</p>
      <form id="link-form"><div class="form-grid"><div class="form-field full"><label class="field-label" for="link-title">Nome da pesquisa</label><input class="input" id="link-title" name="title" placeholder="Ex.: Levantamento da Feira Cidadã" required maxlength="80" /></div><div class="form-field"><label class="field-label" for="link-questionnaire">Questionário</label><select id="link-questionnaire" name="questionnaire" class="select-field"><option>Pesquisa temática da SEDES</option><option>Formulário de evento comunitário</option><option>Questionário censitário simplificado</option></select></div><div class="form-field"><label class="field-label" for="link-expiration">Disponibilidade</label><select id="link-expiration" name="expiration" class="select-field"><option>Sem data definida</option><option>7 dias</option><option>30 dias</option></select></div></div>
      <div class="anonymous-note">${icon('lock')}<span><b>Formulário sem identificação pessoal</b>Este link destina-se à pesquisa temática anônima e não solicita CPF, nome ou outro identificador pessoal.</span></div><button class="button button-primary" type="submit">${icon('link')} Gerar link</button></form><div id="new-link-output"></div>
    </section><aside class="panel form-side-panel"><h3>Links gerados recentemente</h3><p>Links ilustrativos nesta sessão. O protótipo não publica formulários em um servidor.</p><div id="link-history">${linkRows()}</div></aside></div>`;
}

function linkRows() {
  if (!state.links.length) return `<div class="empty-state" style="padding:18px 5px"><strong>Nenhum link gerado</strong>Os links criados aparecerão aqui.</div>`;
  return state.links.map(link=>`<div class="link-history-item"><span class="link-history-icon">${icon('link')}</span><span class="link-history-copy"><b>${escapeHtml(link.title)}</b><small>${escapeHtml(link.code)} · ${escapeHtml(link.created)}</small></span><span class="status status-active">${link.status}</span></div>`).join('');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
}

function openModal(title, description, body, footer, wide = false) {
  $('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal ${wide?'modal-wide':''}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><div><h2 id="modal-title">${title}</h2><p>${description}</p></div><button class="close-modal" data-action="close-modal" aria-label="Fechar">${icon('close')}</button></header><div class="modal-body">${body}</div>${footer ? `<footer class="modal-footer">${footer}</footer>` : ''}</section></div>`;
  const focusTarget = $('input,select,textarea,button', $('#modal-root'));
  focusTarget?.focus();
}

function closeModal() { $('#modal-root').innerHTML = ''; }

function userFormMarkup(user = null) {
  return `<form id="user-form"><input type="hidden" name="id" value="${user?.id || ''}" /><div class="modal-grid"><div class="form-field full"><label class="field-label" for="user-name">Nome completo</label><input class="input" id="user-name" name="name" required maxlength="80" value="${escapeHtml(user?.name || '')}" placeholder="Digite o nome do usuário" /></div><div class="form-field full"><label class="field-label" for="user-email">E-mail institucional</label><input class="input" id="user-email" name="email" type="email" required maxlength="100" value="${escapeHtml(user?.email || '')}" placeholder="nome@sedes.ba.gov.br" /></div><div class="form-field full"><label class="field-label" for="user-profile">Perfil de acesso</label><select class="select-field" id="user-profile" name="profile" required style="width:100%"><option value="">Selecione um perfil</option>${['Administrador da SEDES','Membro da SEDES','Entrevistador'].map(role=>`<option ${user?.profile===role?'selected':''}>${role}</option>`).join('')}</select><small class="field-help">O perfil determina o acesso às funcionalidades e aos dados.</small></div>${user?`<div class="form-field full"><label class="field-label" for="user-status">Situação</label><select class="select-field" id="user-status" name="active" style="width:100%"><option value="true" ${user.active?'selected':''}>Ativo</option><option value="false" ${!user.active?'selected':''}>Inativo</option></select></div>`:''}</div></form>`;
}

function openUserModal(user = null) {
  const title = user ? 'Editar usuário' : 'Cadastrar usuário';
  openModal(title, user ? 'Atualize os dados e o perfil de acesso desta pessoa.' : 'Preencha os dados para criar um novo acesso ao sistema.', userFormMarkup(user), `<button class="button button-outline" data-action="close-modal">Cancelar</button><button class="button button-primary" data-action="submit-user">${user ? 'Salvar alterações' : 'Cadastrar usuário'}</button>`);
}

function submitUser() {
  const form = $('#user-form');
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const id = data.get('id');
  if (id) {
    const user = state.users.find(item => item.id === id);
    if (!user) return;
    Object.assign(user, { name: data.get('name').trim(), email: data.get('email').trim(), profile: data.get('profile'), active: data.get('active') === 'true' });
    user.initials = initials(user.name);
    showToast('Dados do usuário atualizados.');
  } else {
    const name = data.get('name').trim();
    state.users.unshift({ id: `u-${Date.now()}`, name, email: data.get('email').trim(), profile: data.get('profile'), active: true, last: 'Nunca acessou', initials: initials(name) });
    showToast('Usuário cadastrado nesta demonstração.');
  }
  state.userQuery = '';
  closeModal(); renderPage();
}

function initials(name) { return name.trim().split(/\s+/).slice(0,2).map(part=>part[0]?.toLocaleUpperCase('pt-BR') || '').join(''); }

function reviewRecord(id) {
  const record = state.records.find(item => item.id === id);
  if (!record) return;
  const body = `<div class="detail-strip"><div><small>Identificador</small><b>${record.id}</b></div><div><small>CPF vinculado</small><b>${record.cpf}</b></div><div><small>Bairro informado</small><b>${escapeHtml(record.neighborhood)}</b></div></div><div class="warning-copy">${icon('alert')} Sinalização: <strong>${escapeHtml(record.type)}</strong> — ${escapeHtml(record.reason)}</div><div class="detail-section-title">Resumo do registro demonstrativo</div><div class="detail-answer"><span>Faixa etária</span><b>25 a 29 anos</b></div><div class="detail-answer"><span>Escolaridade</span><b>Ensino Médio completo</b></div><div class="detail-answer"><span>Origem</span><b>Coleta censitária · ${escapeHtml(record.date)}</b></div><div class="detail-answer"><span>Status de revisão</span><b>Precisa de conferência</b></div><p class="field-help">Os campos acima ilustram a consulta administrativa. Nenhum dado real está armazenado no protótipo.</p>`;
  const footer = `<button class="button button-danger" data-action="delete-record" data-id="${id}">Excluir registro</button><span class="toolbar-spacer"></span><button class="button button-outline" data-action="edit-record" data-id="${id}">${icon('edit')} Editar</button><button class="button button-primary" data-action="validate-record" data-id="${id}">${icon('check')} Validar registro</button>`;
  openModal('Revisar registro', 'Consulte os dados identificados e decida como tratar a sinalização.', body, footer, true);
}

function viewDatabaseRecord(id) {
  const record = state.database.find(item => item.id === id);
  if (!record) return;
  const fields = [
    ['CPF', record.cpf], ['Bairro de residência', record.neighborhood], ['Faixa etária', record.age],
    ['Distrito', record.district], ['Território', `Zona ${record.territory}`], ['Raça/cor autodeclarada', record.race],
    ['Identidade de gênero', record.gender], ['Orientação sexual', record.orientation], ['Escolaridade', record.education],
    ['Classificação de renda', record.income], ['Pessoa com deficiência', record.disability],
    ['Situação de rua', record.streetSituation], ['Ciclo de pesquisa', record.cycle]
  ];
  const body = `<div class="detail-strip"><div><small>Registro</small><b>${record.id}</b></div><div><small>Identificação</small><b>${record.cpf}</b></div><div><small>Perfil com acesso</small><b>Administrador SEDES</b></div></div><div class="detail-section-title">Dados armazenados</div>${fields.map(([label,value])=>`<div class="detail-answer"><span>${label}</span><b>${escapeHtml(value)}</b></div>`).join('')}<p class="field-help">Registro totalmente demonstrativo; os dados exibidos não correspondem a uma pessoa real.</p>`;
  openModal('Dados do registro', record.name, body, `<button class="button button-primary" data-action="close-modal">Fechar</button>`);
}

function openEditRecord(id) {
  const record = state.records.find(item => item.id === id);
  if (!record) return;
  const body = `<form id="record-form"><input type="hidden" name="id" value="${id}" /><div class="modal-grid"><div class="form-field full"><label class="field-label">Identificador do registro</label><input class="input" value="${id}" disabled /></div><div class="form-field"><label class="field-label" for="record-cpf">CPF vinculado</label><input class="input" id="record-cpf" name="cpf" value="${escapeHtml(record.cpf)}" /></div><div class="form-field"><label class="field-label" for="record-neighborhood">Bairro</label><input class="input" id="record-neighborhood" name="neighborhood" value="${escapeHtml(record.neighborhood)}" /></div><div class="form-field full"><label class="field-label" for="record-review-note">Nota da revisão</label><textarea class="input input-area" id="record-review-note" name="reason">${escapeHtml(record.reason)}</textarea></div></div><small class="field-help">Dados demonstrativos: as alterações ficam apenas na memória desta página.</small></form>`;
  openModal('Editar registro', 'Corrija os campos necessários após conferir a entrevista.', body, `<button class="button button-outline" data-action="review-record" data-id="${id}">Voltar</button><button class="button button-primary" data-action="save-record">Salvar alterações</button>`);
}

function saveRecord() {
  const form = $('#record-form');
  const data = new FormData(form);
  const record = state.records.find(item => item.id === data.get('id'));
  if (record) {
    record.cpf = data.get('cpf').trim();
    record.neighborhood = data.get('neighborhood').trim();
    record.reason = data.get('reason').trim();
    showToast('Registro atualizado para demonstração.');
  }
  closeModal(); renderPage();
}

function validateRecord(id) {
  const record = state.records.find(item => item.id === id);
  if (record) record.status = 'validated';
  closeModal(); renderPage(); showToast('Registro marcado como validado.');
}

function deleteRecord(id) {
  const record = state.records.find(item => item.id === id);
  if (!record || !window.confirm('Excluir este registro demonstrativo da fila?')) return;
  state.records = state.records.filter(item => item.id !== id);
  closeModal(); renderPage(); showToast('Registro removido desta demonstração.');
}

function openCycleModal() {
  const body = `<form id="cycle-form"><div class="modal-grid"><div class="form-field full"><label class="field-label" for="cycle-name">Nome do ciclo</label><input class="input" id="cycle-name" name="name" required maxlength="60" placeholder="Ex.: Ciclo Censitário 2028" /></div><div class="form-field"><label class="field-label" for="cycle-start">Data de início</label><input class="input" id="cycle-start" name="start" type="date" required /></div><div class="form-field"><label class="field-label" for="cycle-end">Data de encerramento</label><input class="input" id="cycle-end" name="end" type="date" required /></div><div class="form-field full"><label class="field-label" for="cycle-status">Situação inicial</label><select class="select-field" id="cycle-status" name="status" style="width:100%"><option selected>Planejado</option><option>Ativo</option></select></div></div></form>`;
  openModal('Configurar ciclo', 'Registre um novo período de pesquisa censitária.', body, `<button class="button button-outline" data-action="close-modal">Cancelar</button><button class="button button-primary" data-action="submit-cycle">Criar ciclo</button>`);
}

function submitCycle() {
  const form = $('#cycle-form');
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const startDate = new Date(`${data.get('start')}T12:00:00`);
  const endDate = new Date(`${data.get('end')}T12:00:00`);
  if (endDate < startDate) { showToast('A data de encerramento precisa ser posterior ao início.'); return; }
  const format = date => date.toLocaleDateString('pt-BR');
  if (data.get('status') === 'Ativo') state.cycles.filter(cycle => cycle.status === 'Ativo').forEach(cycle => cycle.status = 'Encerrado');
  state.cycles.unshift({ id: `c-${Date.now()}`, name: data.get('name').trim(), period: `${startDate.getFullYear()}–${endDate.getFullYear()}`, start: format(startDate), end: format(endDate), status: data.get('status') });
  closeModal(); renderPage(); showToast('Ciclo criado nesta demonstração.');
}

function openQuestionnaire(id) {
  const item = state.questionnaires.find(entry => entry.id === id);
  if (!item) return;
  const changes = item.changes.map(change=>`<div class="diff-row"><span class="diff-mark">+</span>${escapeHtml(change)}</div>`).join('');
  const body = `<div class="detail-strip"><div><small>Versão atual</small><b>${item.version.split(' → ')[0]}</b></div><div><small>Versão proposta</small><b>${item.version.split(' → ')[1]}</b></div><div><small>Solicitante</small><b>${escapeHtml(item.requester)}</b></div></div><p style="color:#718592;font-size:10px;line-height:1.6;margin:0">${escapeHtml(item.summary)}</p><div class="diff-box"><b>Resumo das alterações propostas</b>${changes}</div>${item.status==='pending'?'<div class="warning-copy" style="margin-top:12px">A aprovação disponibiliza a nova versão do questionário para os fluxos correspondentes.</div>':`<div class="detail-section-title">Decisão registrada</div><div class="detail-answer"><span>Status</span><b>${item.status==='approved'?'Aprovado':'Rejeitado'}</b></div>`}`;
  const footer = item.status === 'pending' ? `<button class="button button-outline" data-action="close-modal">Voltar</button><span class="toolbar-spacer"></span><button class="button button-danger" data-action="decide-questionnaire" data-id="${id}" data-decision="rejected">Rejeitar</button><button class="button button-primary" data-action="decide-questionnaire" data-id="${id}" data-decision="approved">${icon('check')} Aprovar alteração</button>` : `<button class="button button-primary" data-action="close-modal">Fechar</button>`;
  openModal('Analisar alteração', item.title, body, footer, true);
}

function decideQuestionnaire(id, decision) {
  const item = state.questionnaires.find(entry => entry.id === id);
  if (!item) return;
  if (decision === 'rejected' && !window.confirm('Rejeitar esta proposta de alteração?')) return;
  item.status = decision;
  state.approvalFilter = 'history';
  closeModal(); renderPage(); showToast(decision === 'approved' ? 'Alteração aprovada nesta demonstração.' : 'Alteração rejeitada nesta demonstração.');
}

function generateLink(form) {
  const data = new FormData(form);
  const title = data.get('title').trim();
  if (!title) return;
  const code = `DEMO-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  state.links.unshift({ title, code, created: new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'}), status: 'Ativo' });
  const url = `https://exemplo.sedes.ba.gov.br/formulario/${code.toLowerCase()}`;
  $('#new-link-output').innerHTML = `<div class="generated-link"><div class="generated-link-head"><span>${icon('check')} Link gerado para demonstração</span><span class="status status-info">Anônimo</span></div><div class="generated-link-code"><code>${url}</code><button class="table-action" data-action="copy-link" data-link="${url}" title="Copiar link" aria-label="Copiar link">${icon('copy')}</button></div><small class="field-help">Este endereço é ilustrativo; o protótipo não publica um formulário real.</small></div>`;
  $('#link-history').innerHTML = linkRows();
  form.reset();
  showToast('Link demonstrativo gerado.');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${icon('check')}${escapeHtml(message)}`;
  $('#toast-root').append(toast);
  setTimeout(() => toast.remove(), 3200);
}

document.addEventListener('click', async event => {
  const pageButton = event.target.closest('[data-page]');
  if (pageButton) { event.preventDefault(); setPage(pageButton.dataset.page); return; }
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id;
  if (action === 'open-users') { setPage('users'); return; }
  if (action === 'open-user-modal') { openUserModal(); return; }
  if (action === 'edit-user') { openUserModal(state.users.find(user => user.id === id)); return; }
  if (action === 'toggle-user') {
    const user = state.users.find(item => item.id === id);
    if (user) { user.active = !user.active; renderPage(); showToast(`Acesso de ${user.name} ${user.active?'ativado':'inativado'}.`); }
    return;
  }
  if (action === 'submit-user') { submitUser(); return; }
  if (action === 'close-modal') { closeModal(); return; }
  if (action === 'backdrop-close' && event.target === button) { closeModal(); return; }
  if (action === 'review-record') { reviewRecord(id); return; }
  if (action === 'view-database-record') { viewDatabaseRecord(id); return; }
  if (action === 'clear-collection-filters') { state.collectionApplied = {}; renderPage(); return; }
  if (action === 'clear-analytics-filters') { state.analyticsApplied = {}; renderPage(); return; }
  if (action === 'export-collection') {
    const count = state.page === 'analytics' ? analyticsRows().length : filteredData(state.collectionApplied).length;
    showToast(`Exportação demonstrativa preparada para ${count} registro(s).`); return;
  }
  if (action === 'export-analysis') { showToast('Relatório PDF demonstrativo preparado para o recorte atual.'); return; }
  if (action === 'edit-record') { openEditRecord(id); return; }
  if (action === 'save-record') { saveRecord(); return; }
  if (action === 'validate-record') { validateRecord(id); return; }
  if (action === 'delete-record') { deleteRecord(id); return; }
  if (action === 'open-cycle-modal') { openCycleModal(); return; }
  if (action === 'submit-cycle') { submitCycle(); return; }
  if (action === 'approval-filter') { state.approvalFilter = button.dataset.filter; renderPage(); return; }
  if (action === 'review-questionnaire') { openQuestionnaire(id); return; }
  if (action === 'decide-questionnaire') { decideQuestionnaire(id, button.dataset.decision); return; }
  if (action === 'questionnaire-guide') { openModal('Sobre as aprovações', 'Governança das mudanças nos instrumentos de coleta.', '<p style="font-size:10px;line-height:1.7;color:#718592">As propostas de alteração ficam disponíveis para análise da administração da SEDES. Revise o resumo e os campos alterados antes de aprovar. A nova versão aprovada pode ser utilizada nos próximos ciclos ou formulários correspondentes.</p>', `<button class="button button-primary" data-action="close-modal">Entendi</button>`); return; }
  if (action === 'copy-link') {
    try { await navigator.clipboard.writeText(button.dataset.link); showToast('Endereço copiado.'); }
    catch { showToast('Selecione e copie o endereço exibido.'); }
    return;
  }
  if (action === 'refresh-records') { renderPage(); showToast('Fila atualizada.'); return; }
  if (action === 'mobile-menu') { $('#sidebar').classList.toggle('open'); return; }
});

document.addEventListener('input', event => {
  if (event.target.id === 'user-search') {
    state.userQuery = event.target.value;
    const selection = event.target.selectionStart;
    $('#user-table-body').innerHTML = userRows();
    $('#user-count').textContent = `${filteredUsers().length} usuário(s)`;
    event.target.focus(); event.target.setSelectionRange(selection, selection);
  }
  if (event.target.id === 'record-search') {
    state.recordQuery = event.target.value;
    const selection = event.target.selectionStart;
    $('#record-table-body').innerHTML = recordRows();
    $('#record-count').textContent = `${filteredRecords().length} registro(s)`;
    event.target.focus(); event.target.setSelectionRange(selection, selection);
  }
});

document.addEventListener('change', event => {
  if (event.target.id === 'user-role-filter') state.userRole = event.target.value;
  if (event.target.id === 'user-status-filter') state.userStatus = event.target.value;
  if (event.target.id === 'user-role-filter' || event.target.id === 'user-status-filter') { $('#user-table-body').innerHTML = userRows(); $('#user-count').textContent = `${filteredUsers().length} usuário(s)`; }
  if (event.target.id === 'record-type-filter') { state.recordType = event.target.value; $('#record-table-body').innerHTML = recordRows(); $('#record-count').textContent = `${filteredRecords().length} registro(s)`; }
});

document.addEventListener('submit', event => {
  if (event.target.id === 'user-form') { event.preventDefault(); submitUser(); }
  if (event.target.id === 'collection-filter-form') {
    event.preventDefault();
    const data = new FormData(event.target);
    const filters = Object.fromEntries(['age','gender','race','education','orientation','neighborhood','district','income','disability','streetSituation','cycle'].map(key=>[key,data.get(key)||'']));
    filters.territories = data.getAll('territories');
    state.collectionApplied = filters;
    renderPage();
  }
  if (event.target.id === 'analytics-filter-form') {
    event.preventDefault();
    const data = new FormData(event.target);
    state.analyticsApplied = Object.fromEntries([...data.entries()].filter(([,value])=>value));
    renderPage();
  }
  if (event.target.id === 'interval-form') {
    event.preventDefault();
    const value = Number($('#interval-days').value);
    if (!value || value < 1) { $('#interval-feedback').textContent = 'Informe um prazo maior que zero.'; return; }
    state.intervalDays = String(value); renderPage(); showToast('Parâmetro salvo nesta demonstração.');
  }
  if (event.target.id === 'cycle-form') { event.preventDefault(); submitCycle(); }
  if (event.target.id === 'link-form') { event.preventDefault(); generateLink(event.target); }
});

$('#mobile-menu').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
renderPage();
