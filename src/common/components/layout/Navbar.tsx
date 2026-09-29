import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavDrawer } from './NavDrawer';
import Logo from '../../assets/sigaaeLogo.png';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout } from '../../../features/auth/services/authSlice';
import { baseApi } from '../../../app/services/baseApi';
import { LogOut, UserKey } from 'lucide-react';
import { SearchUser } from '../../../features/users/components/SearchUser';

export const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuth, role } = useAppSelector((state) => state.auth);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        navigate('/login');
    }

    return (
        <>
            <nav className='bg-white border-b border-gray-200 sticky top-0 z-30 h-16'>
                <div className='max-w-7xl mx-auto px-4 h-full flex items-center justify-between'>
                    {/* Logo */}
                    <div className="flex item-center gap-4">
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className='p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors hover:cursor-pointer'
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link to={'/'}>
                            <img  className="h-10 w-auto" src={Logo}  alt="Logo Sistema" />
                        </Link>
                    </div>
                    {/* { isAuth && <SearchUser /> } */}
                    <SearchUser />

                    {/* Login */}
                    <div>
                        { isAuth ? (
                            <button
                                onClick={() => handleLogout()}
                                title='Salir'
                                className='flex gap-2 items-center bg-red-700 text-sm px-3 py-1 rounded-xl text-white font-semibold hover:bg-red-950 hover:cursor-pointer transition-colors'
                            >
                                <LogOut className='h-4 w-4' />
                                Salir
                            </button>
                        ) : (
                            <Link
                                to={'/login'}
                                className='flex items-center gap-2 bg-sky-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-sky-700 transition-all shadow-sm'
                            >
                                <UserKey className='h-4 w-4' />
                                Entrar
                            </Link>
                        ) }
                    </div>
                </div>
            </nav>

            <NavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} role={role} />
        </>
    )
}