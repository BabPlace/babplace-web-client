import { useRouter } from 'next/router';

export default function useRecentResult() {
  const router = useRouter();

  const deleteRecentResult = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('recent_team');
    }
  };

  const addRecentResult = () => {
    if (typeof window !== 'undefined') {
      const teamId = router.query.teamId as string;
      localStorage.setItem('recent_team', JSON.stringify(teamId));
    }
  };

  const getRecentResult = () => {
    if (typeof window !== 'undefined') {
      const teamId = JSON.parse(localStorage.getItem('recent_team') || '""') as string;
      return teamId;
    }
    return '';
  };

  return { deleteRecentResult, addRecentResult, getRecentResult };
}
