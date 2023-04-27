import { useRouter } from 'next/router';

export default function useCopy() {
  const router = useRouter();

  function invite(callback?: () => void) {
    const { teamId } = router.query;
    if (typeof teamId !== 'string') return;
    const host = window.location.host;
    const inviteUrl = `https://${host}/gola/${teamId}`;
    navigator.clipboard.writeText(inviteUrl);
    callback && callback();
  }

  function share(callback?: () => void) {
    navigator.clipboard.writeText(window.location.href);
    callback && callback();
  }

  function toGola() {
    const teamId = router.query.teamId as string;
    router.push(`/gola/${teamId}`);
  }

  return { invite, share, toGola };
}
