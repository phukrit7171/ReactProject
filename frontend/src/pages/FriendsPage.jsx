import React, { useState } from "react";
import { Box, FormControl, Select, MenuItem, Typography, CircularProgress } from "@mui/material";
import FriendList from "../features/friends/FriendList";
import FriendRequestList from "../features/friends/FriendRequestList";
import { useGetMyFriendStatusQuery } from "../services/apiSlice"; 

const FriendsPage = () => {
  const [view, setView] = useState("friends");

  // ดึงข้อมูลเพื่อนทั้งหมด (RTK Query ทำให้ useEffect ไม่จำเป็น)
  const { data, error, isLoading, isError, refetch } = useGetMyFriendStatusQuery();

  // ป้องกันกรณีที่ data ยังไม่มา
  const friends = data?.friends || [];
  const sending = data?.pendingSent || [];
  const response = data?.pendingReceived || [];

  if (isLoading) {
    return (
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading friends...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 6, textAlign: "center", color: "red" }}>
        <Typography>Error: {error?.data?.message || "Failed to load friends"}</Typography>
        <Typography
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={refetch}
        >
          Retry
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <FormControl size="small" sx={{ mb: 3 }}>
        <Select
          value={view}
          onChange={(e) => setView(e.target.value)}
          sx={{
            fontSize: "1.5rem",
            minWidth: 150,
          }}
        >
          <MenuItem value="friends" sx={{ fontSize: "1.1rem" }}>Friends</MenuItem>
          <MenuItem value="response" sx={{ fontSize: "1.1rem" }}>Responses</MenuItem>
          <MenuItem value="sending" sx={{ fontSize: "1.1rem" }}>Sending</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          width: "400px",
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
          backgroundColor: "white",
        }}
      >
        {view === "friends" && <FriendList friends={friends} />}
        {view === "response" && <FriendRequestList requests={response} type="received" />}
        {view === "sending" && <FriendRequestList requests={sending} type="sent" />}
      </Box>
    </Box>
  );
};

export default FriendsPage;
