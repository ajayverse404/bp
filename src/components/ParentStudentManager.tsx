'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/Button'
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface StudentApproval {
  id: string
  student_profile_id: string
  student_name: string
  student_email: string
  status: 'pending' | 'approved' | 'denied'
  requested_at: string
  parent_notes?: string
}

interface ParentStudentManagerProps {
  parentProfileId: string
}

export function ParentStudentManager({ parentProfileId }: ParentStudentManagerProps) {
  const [approvals, setApprovals] = useState<StudentApproval[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchStudentApprovals()
  }, [parentProfileId])

  const fetchStudentApprovals = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('student_approvals')
        .select(`
          id,
          student_profile_id,
          status,
          requested_at,
          parent_notes,
          profiles!student_approvals_student_profile_id_fkey (
            full_name,
            user_id
          )
        `)
        .eq('parent_profile_id', parentProfileId)
        .order('requested_at', { ascending: false })

      if (error) throw error

      // Get student emails
      const studentApprovals: StudentApproval[] = []
      for (const approval of data || []) {
        const { data: userData } = await supabase.auth.admin.getUserById(
          approval.profiles.user_id
        )
        
        studentApprovals.push({
          id: approval.id,
          student_profile_id: approval.student_profile_id,
          student_name: approval.profiles.full_name,
          student_email: userData?.user?.email || 'Unknown',
          status: approval.status,
          requested_at: approval.requested_at,
          parent_notes: approval.parent_notes
        })
      }

      setApprovals(studentApprovals)
    } catch (err) {
      console.error('Error fetching student approvals:', err)
      setError('Failed to load student approval requests')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprovalAction = async (approvalId: string, action: 'approved' | 'denied', notes?: string) => {
    try {
      setActionLoading(approvalId)
      
      const { error } = await supabase
        .from('student_approvals')
        .update({
          status: action,
          responded_at: new Date().toISOString(),
          parent_notes: notes
        })
        .eq('id', approvalId)

      if (error) throw error

      // Update local state
      setApprovals(prev => 
        prev.map(approval => 
          approval.id === approvalId 
            ? { ...approval, status: action, parent_notes: notes }
            : approval
        )
      )

      // If approved, update the student's profile to be verified
      if (action === 'approved') {
        const approval = approvals.find(a => a.id === approvalId)
        if (approval) {
          await supabase
            .from('profiles')
            .update({ is_verified: true })
            .eq('id', approval.student_profile_id)
        }
      }
    } catch (err) {
      console.error('Error updating approval:', err)
      setError('Failed to update approval status')
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'denied':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'denied':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="text-red-600">{error}</div>
        <Button 
          onClick={fetchStudentApprovals}
          variant="outline"
          color="red"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Student Approval Requests
      </h3>
      
      {approvals.length === 0 ? (
        <div className="text-center py-8">
          <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pending requests</h3>
          <p className="mt-1 text-sm text-gray-500">
            Student approval requests will appear here when students register with your email.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {approvals.map((approval) => (
            <div
              key={approval.id}
              className={`border rounded-lg p-4 ${getStatusColor(approval.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(approval.status)}
                  <div>
                    <h4 className="text-sm font-medium">
                      {approval.student_name}
                    </h4>
                    <p className="text-sm opacity-75">
                      {approval.student_email}
                    </p>
                    <p className="text-xs opacity-60">
                      Requested: {new Date(approval.requested_at).toLocaleDateString()}
                    </p>
                    {approval.parent_notes && (
                      <p className="text-xs mt-1 opacity-75">
                        <strong>Notes:</strong> {approval.parent_notes}
                      </p>
                    )}
                  </div>
                </div>
                
                {approval.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      color="green"
                      onClick={() => handleApprovalAction(approval.id, 'approved')}
                      disabled={actionLoading === approval.id}
                    >
                      {actionLoading === approval.id ? 'Processing...' : 'Approve'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      color="red"
                      onClick={() => handleApprovalAction(approval.id, 'denied')}
                      disabled={actionLoading === approval.id}
                    >
                      {actionLoading === approval.id ? 'Processing...' : 'Deny'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
