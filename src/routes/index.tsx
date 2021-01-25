import { Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Repository from '../pages/Repository'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    {/* o + indica que tudo que vem depois da / faz parte dessa rota, em caso de o repositorio ter barras no name */}
    <Route path="/repository/:repository+" component={Repository} />
  </Switch>
)

export default Routes
