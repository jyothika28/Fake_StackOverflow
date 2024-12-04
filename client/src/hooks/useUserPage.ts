import { useState, useEffect } from 'react';
import { getUserDetails } from '../services/userService';

interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  dob?: string;
}

interface UseUserPageResult {
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
}

const useUserPage = (): UseUserPageResult => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails= async () => {
        try {
            const res = await getUserDetails();
            console.log("res in client8",res);
            setUserDetails(res);
        } catch (error: any) {
            setError("Error fetching user details: " + error.message);
        } finally {
            setLoading(false);
        }
        };
        fetchUserDetails();
    }, []);


  return { userDetails, loading, error, };
};

export default useUserPage;