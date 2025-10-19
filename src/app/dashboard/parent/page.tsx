import { getUser } from '@/lib/auth-helpers'
import { createClient } from '@/lib/supabase/server'
import { ParentStudentManager } from '@/components/ParentStudentManager'
import { WelcomeBanner } from '@/components/WelcomeBanner'
import { SignupConfirmation } from '@/components/SignupConfirmation'
import { UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default async function ParentDashboard() {
  const user = await getUser()

  if (!user) {
    return null
  }

  const supabase = await createClient()
  
  // Get parent profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .eq('account_type', 'parent')
    .single()

  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg bg-white p-6 shadow">
              <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
              <p className="mt-2 text-gray-600">
                This page is only accessible to parent/guardian accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Get linked students count
  const { data: linkedStudents, error: studentsError } = await supabase
    .from('profiles')
    .select('id, full_name, is_verified')
    .eq('parent_id', profile.id)

  const approvedStudents = linkedStudents?.filter(student => student.is_verified) || []
  const pendingStudents = linkedStudents?.filter(student => !student.is_verified) || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Banner for first-time users */}
      <WelcomeBanner />
      
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back, {profile.full_name}! Manage your student accounts and monitor their progress.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Students
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {linkedStudents?.length || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Approved Students
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {approvedStudents.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Approval
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {pendingStudents.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Management */}
          <div className="mb-8">
            <ParentStudentManager parentProfileId={profile.id} />
          </div>

          {/* Linked Students List */}
          {linkedStudents && linkedStudents.length > 0 && (
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Students
              </h3>
              <div className="space-y-3">
                {linkedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`h-2 w-2 rounded-full ${
                        student.is_verified ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {student.full_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student.is_verified ? 'Approved & Active' : 'Pending Approval'}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.is_verified ? (
                        <span className="text-green-600">✓ Active</span>
                      ) : (
                        <span className="text-yellow-600">⏳ Pending</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Program Information */}
          <div className="mt-8 rounded-lg bg-blue-50 p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Program Access Information
            </h3>
            <p className="text-sm text-blue-700">
              As a parent/guardian, you have full access to all program materials and can monitor your students' progress. 
              Students will only gain access after you approve their accounts.
            </p>
          </div>
        </div>
      </div>
      <SignupConfirmation />
    </div>
  )
}
