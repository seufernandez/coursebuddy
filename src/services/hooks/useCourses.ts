import { useQuery } from 'react-query';
import { api } from '../api';

type courseData = {
  slug_number: number;
  name: string;
  image: string;
  likes: number;
  resumes_available: number;
};

export function useGetLatestCourses() {
  return useQuery<courseData[]>(
    'useGetlatestCourses',
    async () => {
      const { data } = await api.get('/api/supaRequests', {
        headers: {
          type: 'COMMUNITY-get-latest-courses',
        },
      });

      return data;
    },
    {
      staleTime: 1000 * 5, // 5 sec
    }
  );
}

export function useGetMostLikedCourses() {
  return useQuery<courseData[]>(
    'useGetMostLikedCourses',
    async () => {
      const { data } = await api.get('/api/supaRequests', {
        headers: {
          type: 'COMMUNITY-get-most-liked-courses',
        },
      });

      return data;
    },
    {
      staleTime: 1000 * 5, // 5 sec
    }
  );
}

export function useGetLikedCourses(currentUserId) {
  return useQuery<courseData[]>(
    'useGetLikedCourses',
    async () => {
      const { data } = await api.get('/api/supaRequests', {
        headers: {
          type: 'HOME-get-liked-courses',
          current_user_id: currentUserId.id,
        },
      });

      return data;
    },
    {
      staleTime: 1000 * 5, // 5 sec
    }
  );
}

export function useGetSearchedCourses(searchText) {
  return useQuery<courseData[]>(
    'useGetSeachedCourses',
    async () => {
      const { data } = await api.get('/api/supaRequests', {
        headers: {
          type: 'SEARCH-get-searched-courses',
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

export function useCourses() {
  return useQuery<courseData[]>(
    'courses',
    async () => {
      const { data } = await api.get('/api/supaRequests', {
        headers: {
          type: 'COMMUNITY-get-latest-courses',
        },
      });

      return data;
    },
    {
      staleTime: 1000 * 5, // 5 sec
    }
  );
}
