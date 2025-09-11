import { Box, Typography, Avatar, TextField, Autocomplete, Paper } from "@mui/material";
import { deepPurple, blue, grey } from "@mui/material/colors";
import { useState } from "react";

type Tenant = {
  id: number;
  name: string;
  logo: string; // image url
  url: string;  // redirect url
};

const tenants: Tenant[] = [
  { id: 1, name: "Procedure Site", logo: "/logos/tenant1.png", url: "https://dev-proceduresite.medtel.com/" },
  { id: 2, name: "User Management Tool", logo: "/logos/tenant2.png", url: "https://dev-usermanagement.medtel.com/" },
  { id: 3, name: "Analysis Tool", logo: "/logos/tenant3.png", url: "https://dev-proceduresite-analysis.medtel.com/" },
  { id: 4, name: "Reporting", logo: "/logos/tenant4.png", url: "https://dev-reporting.medtel.com/" },
];

export default function Applications() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const handleSelect = (tenant: Tenant | null) => {
    setSelectedTenant(tenant);
    if (tenant) {
      console.log("Redirecting to:", tenant.url);
      // full redirect
      //window.location.href = tenant.url;
      window.open(tenant.url, "_blank");
      // alternatively: window.open(tenant.url, "_self"); // in case of iframe issues
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: grey[50],
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          p: 5,
          mt: 20,
          textAlign: "center",
          bgcolor: "white",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={4}
          color={blue[900]}
        >
          Select Application
        </Typography>

        {/* Autocomplete Box */}
        <Autocomplete
          id="tenant-autocomplete"
          options={tenants}
          getOptionLabel={(option) => option.name}
          value={selectedTenant}
          onChange={(_, newValue) => handleSelect(newValue)}
          sx={{ width: "100%" }}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Avatar
                alt={option.name}
                src={option.logo}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: deepPurple[100],
                  fontWeight: "bold",
                }}
              >
                {option.name[0]}
              </Avatar>
              <Typography variant="body1">{option.name}</Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose application"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Paper>
    </Box>
  );
}
