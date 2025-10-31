import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import FriendList from "../features/friends/FriendList";
import FriendRequestList from "../features/friends/FriendRequestList";

const FriendsPage = () => {
  const [view, setView] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [sending, setSending] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/v1/friend/status/me");

        setFriends(res.data.friends || []);
        setSending(res.data.pendingSent || []);       
        setResponse(res.data.pendingReceived || []);  
      } catch (error) {
        console.error("Error fetching friend status:", error);
      }
    };

    fetchData();
  }, []);

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
