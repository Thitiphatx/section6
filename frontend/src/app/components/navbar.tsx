"use client"

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Menubar } from 'primereact/menubar';
import { useRef } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const menuRight = useRef(null);
    const router = useRouter();

    const items = [
        {
            label: 'Home',
            url: '/'
        },
        {
            label: 'Features'
        },
        {
            label: 'Projects',
            items: [
                {
                    label: 'Components',
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];

    const profileItems = [
        {
            label: 'Profile',
        },
        {
            label: 'Backend',
            url: '/backend'
        },
        {
            label: 'Signout',
            command: () => signOut()
        },
    ]
    const end = (
        <div>

            {!session?.user.id ? (
                <Button label="Signin" onClick={() => router.push("/signin")} />
            ) : (
                <>
                    <Menu model={profileItems} ref={menuRight} popup popupAlignment="right" />
                    <Button label={session.user.name ?? ""} onClick={(event) => menuRight.current.toggle(event)} />
                </>
            )}
        </div>
    )
    return (
        <Menubar model={items} end={end} />
    )
}
