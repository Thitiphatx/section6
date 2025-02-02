import { PanelMenu } from "primereact/panelmenu";

const navItems = [
    {
        label: 'Profile',
        icon: 'pi pi-user',
        url: '/account/profile'
    },
    {
        label: 'Resource',
        icon: 'pi pi-file-import',
        url: '/dashboard/resources'
    },
    {
        label: 'Segmentation',
        icon: 'pi pi-file-import',
        url: '/dashboard/segmentation'
    },
]

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-row">
            <div className="w-1/6">
            <PanelMenu model={navItems} />
            </div>
            <div className="w-5/6">
                {children}
            </div>
        </div>
    );
}