import { Routes, RouterModule }  from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component'
import { UserNewComponent } from './user-new/user-new.component'

// Route config let's you map routes to components
const routes: Routes = [
    // map '/persons' to the people list component
    {
      path: 'users',
      component: UserListComponent,
    },
    // HERE: new route for PersonDetailsComponent
    // map '/persons/:id' to person details component
    {
        path: 'user/:user_id',
        component: UserDetailsComponent
    },

    // route to NEW user page
    {
        path: 'new_user',
        component: UserNewComponent
    },

    // map '/' to '/persons' as our default route
    {
      path: '',
      redirectTo: '/users',
      pathMatch: 'full'
    },
];

export const appRouterModule = RouterModule.forRoot(routes);