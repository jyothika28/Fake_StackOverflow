
import { VoidFunctionType } from "../../../types/functionTypes";
import { TextField, Box, CircularProgress, Typography } from "@mui/material";
import useUserPage from '../../../hooks/useUserPage';

interface UserProfileProps {
  userProfilePage: VoidFunctionType;
}

const UserProfile = ({ userProfilePage }: UserProfileProps) => {
  const { userDetails, loading, error } = useUserPage();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!userDetails) {
    return null;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <TextField
        label="First Name"
        value={userDetails.firstname}
        fullWidth
        margin="normal"
       
      />
      <TextField
        label="Last Name"
        value={userDetails.lastname}
        fullWidth
        margin="normal"
        
      />
      <TextField
        label="Email"
        value={userDetails.email}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Username"
        value={userDetails.username}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      {userDetails.dob && (
        <TextField
          label="Date of Birth"
          value={userDetails.dob}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      )}
  
    </Box>
  );
};

export default UserProfile;