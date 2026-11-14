/**
 * AdminRoute - renders AdminLiveQuiz which already self-manages admin auth.
 * The component shows its own login form if the admin token is absent/invalid,
 * or the full dashboard if the admin is authenticated.
 *
 * This component exists to give the router a named wrapper; all logic
 * stays inside AdminLiveQuiz to avoid breaking existing behavior.
 */
import AdminLiveQuiz from './AdminLiveQuiz'

export default function AdminRoute() {
  return <AdminLiveQuiz />
}
