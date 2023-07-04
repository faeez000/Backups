import {organizationSwitchService} from '../../Services/index';
import OrganizationController from './OrganizationController';



const organizationController = new OrganizationController(organizationSwitchService);

export{organizationController}
