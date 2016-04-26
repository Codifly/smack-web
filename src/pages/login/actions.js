import { login } from '../../data/actions';

export function submit ({ username }) {
  return login({ username });
}
