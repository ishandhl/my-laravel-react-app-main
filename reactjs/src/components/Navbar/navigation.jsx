import AuthUser from '../Authentication/AuthUser';
import AdminNav from './admin';
import GuestNav from './guest';
import UserNav from './user';

export default function Navigation() {
    if (AuthUser().user.role == 'admin') {
        return <AdminNav />
    }
    else if (AuthUser().user.role == 'user') {
        return <UserNav />
    }
    else
    {
        return <GuestNav />
    }
}
