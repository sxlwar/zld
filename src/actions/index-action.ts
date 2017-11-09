import {Actions as login} from './login-action';
import {Actions as config} from './config-action';
import {Actions as tutorial} from './tutorial-action';
import {Actions as search} from './search-action';
import {Actions as icons} from './icons-action';
import {Actions as project} from './project-action';
import {Actions as worker} from './worker-action';
import {Actions as workType} from './craft-action';
import {Actions as team} from './team-actions';

export type Actions = config
  | tutorial
  | login
  | search
  | icons
  | project
  | worker
  | workType
  | team;
