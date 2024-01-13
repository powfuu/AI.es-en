import { Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { AssistantComponent } from '../assistant/assistant.component';
import { AiLearningComponent } from '../ai-learning/ai-learning.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'assistant',
        component: AssistantComponent
      },
      {
        path: 'ai-learning',
        component: AiLearningComponent
      },
      {
        path: '',
        redirectTo: 'assistant',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/assistant',
    pathMatch: 'full',
  },
];
