import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import LogoUDG from '../../assets/udg.jpg'
import { menuConfig, ROOT, COORDI, JEFE_AREA, JEFE_DPTO, SUPERVISOR, type MenuItem } from "./menuOptions.constants";
import { ChevronDown } from 'lucide-react';

interface NavDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    role: 'ROOT' | 'COORDI' | 'JEFE_DPTO' | 'JEFE_AREA' | 'SUPERVISOR' | null;
}

const DrawerItem: React.FC<{ item: MenuItem, onClose: () => void }> = ({ item, onClose }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const Icon = item.icon;

    const handleResetSubmenu = () => {
        onClose();
        setIsOpen(false);
    }

    if(!item.subItems){
        return(
            <Link
                to={item.href || '/'}
                onClick={onClose}
                className='flex px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors'
            >
                {Icon && <Icon className='h2 w-5 text-gray-400 group-hover:text-indigo-600 mr-2' />}
                {item.label}
            </Link>
        )
    }

    return(
        <div key={item.href}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer'
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className='h2 w-5 text-gray-400 group-hover:text-indigo-600' />}
                    {item.label}
                </div>
                <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div className={`pl-6 mt-1 space-y-1 overflow-hidden transition-all ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                { item.subItems.map((sub) => {
                    const SubIcon = sub.icon;
                    return(
                        <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={handleResetSubmenu}
                            className='flex px-4 py-2 text-sm text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-md transition-colors'
                        >
                            <SubIcon className="h2 w-4 mr-2" />
                            {sub.label}
                        </Link>
                    )
                }) }
            </div>
        </div>
    )
}

export const NavDrawer = React.memo(({ isOpen, onClose, role }: NavDrawerProps) => {
    const menuItems = useMemo<MenuItem[]>(() => {
        const roleRoutes: Record<string, MenuItem[]> = {
            ROOT,
            COORDI,
            JEFE_AREA,
            JEFE_DPTO,
            SUPERVISOR
        }
        if(role)
            return [...menuConfig, ...roleRoutes[role]]
        else 
            return [...menuConfig]
    }, [role])
    
    return(
        <>
            {/* Overlay: BG */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={onClose}
            />
            {/* Drawer Panel */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-2">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <img className='w-auto' src={LogoUDG} alt='Logo' />
                    </div>
                    {/* Menu */}
                    <div className="p-2 space-y-2 overflow-auto h[calc(100vh-64px)]">
                        {menuItems.map((item, i) => (
                            <DrawerItem key={i} item={item} onClose={onClose} />
                        ))}
                    </div>
                </div>
                {/* Footer */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-50 bg-gray-50/50">
                    <p className="text-xs text-gray-400 text-center uppercase tracking-widest font-semibold">
                        v3.0.0 - Nest Core
                    </p>
                </div>
            </aside>
        </>
    )
})