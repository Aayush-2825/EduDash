'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Separator } from '../ui/separator'
import { CreateClassDialog } from './CreateClassDialog'
import { AddSubjectDialog } from './AddSubjectDialog'
import { UploadLectureDialog } from './UploadLectureDialog'
import { JoinClassDialog } from './JoinClassDialog'

type HeaderFor = 'class' | 'subject' | 'lecture'

interface ClassHeaderProps {
  label: string
  headerFor: HeaderFor
  classID?: string
  subjectID?: string,
  isStudent: boolean
}

export const ClassHeader = ({ label, headerFor, classID, subjectID,isStudent }: ClassHeaderProps) => {
  
  return (
    <div className="w-full mt-4 mb-4  px-4 space-y-4">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap drop-shadow-sm">
          {label}
        </h2>
        <Separator className="flex-1 h-1 ml-2 bg-gradient-to-r from-indigo-500 to-blue-400 dark:from-indigo-300 dark:to-blue-500 rounded-l-full opacity-95" />
      {!isStudent && (
        <>
          {headerFor === 'class' && <CreateClassDialog />}
          {headerFor === 'subject' && classID && <AddSubjectDialog classID={classID} />}
          {headerFor === 'lecture' && classID && subjectID && (
            <UploadLectureDialog classID={classID} subjectID={subjectID} />
          )}
        </>
      )}
      {isStudent && headerFor === 'class' && <JoinClassDialog />}
      </div>

    </div>
  )
}
