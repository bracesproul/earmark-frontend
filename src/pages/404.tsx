import {Box, Typography, Button} from "@mui/material";

export default function Custom404() {
  return (
    <Box>
      <Typography sx={{
          fontSize: '32px',
          fontWeight: 'bold',
      }}>
          404
      </Typography>
      <Typography sx={{
            fontSize: '22px',
      }}>
          Page not found
      </Typography>
        <Button href={'/dashboard'}>
            Go home
        </Button>
    </Box>
  );
}