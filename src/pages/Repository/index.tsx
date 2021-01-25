import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: string;
  forks_count: number;
  open_issues_count: number;
}

interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    // * Primeira forma de chamar uma api
    api.get(`/repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });
    api.get(`/repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });
    // * Segunda form
    // async function loadData(): Promise<void> {
    // * se chamassemos cada função separadamente elas seriam executadas em tempos diferente (podemos ver isso na aba network do navegador), prejudicando a experiencia do usuario, então, só vamos mostrar o dado depois que essa promise resolver as duas requisiçõs, mostrando os dois conteudos juntos
    //   const [repository, issues] = await Promise.all([
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`)
    //   ]);
    //   console.log(repository)
    //   console.log(issues)
    // }
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}/</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
