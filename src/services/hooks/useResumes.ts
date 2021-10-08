import { useQuery } from 'react-query';
import { api } from '../api';

type resumeData = {
  id: string;
  name: string;
  image: string;
  description: string;
  link: string;
  likes: number;
  users: {
    name: string;
  };
};

export function useGetLatestResumes(courseId) {
  return useQuery<resumeData[]>('useGetlatestResumes', async () => {
    const { data } = await api.get('/api/supaRequests', {
      headers: {
        type: 'COURSE-get-latest-resumes',
        course_id: courseId,
      },
    });

    return data;
  });
}

export function useGetLikedResumes(currentUserId) {
  return useQuery<resumeData[]>('useGetLikedResumes', async () => {
    const { data } = await api.get('/api/supaRequests', {
      headers: {
        type: 'HOME-get-liked-resumes',
        current_user_id: currentUserId.id,
      },
    });

    return data;
  });
}

export function useGetTopLikedResumes(courseId) {
  return useQuery<resumeData[]>('useGetTopLikedResumes', async () => {
    const { data } = await api.get('/api/supaRequests', {
      headers: {
        type: 'COURSE-get-top-liked-resumes',
        course_id: courseId,
      },
    });

    return data;
  });
}

export function useGetSearchedResumes(searchText) {
  return useQuery<resumeData[]>(
    'useGetSeachedResumes',
    async () => {
      const { data } = await api.get('/api/supaRequests', {
        headers: {
          type: 'SEARCH-get-searched-resumes',
          search: searchText,
        },
      });

      return data;
    },
    {
      staleTime: 1000 * 5, // 5 sec
    }
  );
}

export function useResumes() {
  return useQuery<resumeData[]>(
    'resumes',
    async () => {
      const { data } = await api.get('/api/supaRequests', {
        headers: {
          type: 'COMMUNITY-get-latest-resumes',
        },
      });

      return data;
    },
    {
      staleTime: 1000 * 5, // 5 sec
    }
  );
}
