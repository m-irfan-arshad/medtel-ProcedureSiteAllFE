import { Box, Card, CardActionArea, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { deepPurple, blue } from "@mui/material/colors";
import { useState } from "react";
import AppLogo from '../../assets/AppSelection/app_logo.png'
import Reporting from '../../assets/AppSelection/reporting.png'
import Analysis from '../../assets/AppSelection/analysis.png'
import UserMng from '../../assets/AppSelection/user_mng.png'
import Procedure from '../../assets/AppSelection/procedure.png'

type Tenant = {
  id: number;
  name: string;
  logo: string; // image url
};

const tenants: Tenant[] = [
  { id: 1, name: "Procedure Site", logo: Procedure },
  { id: 2, name: "User Management", logo: UserMng },
  { id: 3, name: "Analysis", logo: Analysis },
  { id: 3, name: "Reporting", logo: Reporting },
];

export default function Applications() {
  const [selectedTenant, setSelectedTenant] = useState<number | null>(null);

  const handleSelect = (tenantId: number) => {
    setSelectedTenant(tenantId);
    console.log("Selected tenant:", tenantId);
    // navigate to login or dashboard for that tenant
  };

  return (
    <Box
      sx={{
        //height: "100%", // make sure html, body, #root are 100%
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //background: "linear-gradient(135deg, #4A90E2 0%, #0052D4 100%)",
        //p: 4,
      }}
    >
      <Box sx={{ width: "100%", mt: 15 }}>
        {/* <Box display="flex" justifyContent="center" mb={0}>
            <img
              src={AppLogo}
              alt="App Logo"
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
          </Box> */}
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          mb={5}
          mt={5}
          color={blue[900]}
        >
          Select Application
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {tenants.map((tenant) => (
            <Grid item xs={12} sm={6} md={4} key={tenant.id}>
              <Card
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: 200,
                    minWidth: 200,
                    minHeight: 200,
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "0.3s",
                  border:
                    selectedTenant === tenant.id
                      ? "2px solid #1976d2"
                      : "2px solid transparent",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardActionArea onClick={() => handleSelect(tenant.id)}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      py: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={tenant.logo}
                      alt={tenant.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "contain",
                        mb: 2,
                      }}
                    />
                    {/* <Avatar alt="Remy Sharp" color="primary" variant="rounded" sx={{ width: 100, height: 100, mb: 2, bgcolor: deepPurple[100] }}>{tenant.name.split('')[0]}</Avatar> */}
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      align="center"
                      color={blue[900]}
                    >
                      {tenant.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
