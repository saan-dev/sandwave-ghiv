export interface SearchProps {
  org?: string;
  repo?: string;
  page?: number;
}

export interface IssuesProps {
  data: Issue[];
  org?: string;
  repo?: string;
}

export interface HomeProps {
  searchParams: SearchProps;
}

export interface Issue {
  title: string;
  repository_url: string;
  state?: string;
  html_url?: string;
}

export type StateType = {
  page: number;
};

export type ActionType = {
  type: string;
};
