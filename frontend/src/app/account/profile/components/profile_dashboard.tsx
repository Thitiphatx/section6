"use client"

import React from 'react'
import { ProfileContext } from '../utils/profileContext'
import { Users } from '@prisma/client'
import ProfileInfoPanel from './profile_info_panel'
import ProfilePasswordPanel from './profile_password_panel'

export default function ProfileDashboard({ data }: { data: Users }) {
    return (
        <div>
            <ProfileContext.Provider value={data}>
                <div className="space-y-5">
                    <ProfileInfoPanel />
                    <ProfilePasswordPanel />
                </div>
            </ProfileContext.Provider>
        </div>
    )
}
