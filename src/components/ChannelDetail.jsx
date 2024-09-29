import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from './utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const channelData = await fetchFromAPI(`channels?part=snippet&id=${id}`);
        setChannelDetail(channelData?.items[0]);

        const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet,id&order=date`);
        setVideos(videosData?.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchResults();
  }, [id]);

  if (loading) {
    return (
      <Box minHeight='95vh' display="flex" justifyContent="center" alignItems="center">
        <CircularProgress /> {/* Loading spinner */}
      </Box>
    );
  }

  return (
    <Box minHeight='95vh'>
      <Box>
        <div
          style={{
            background: 'linear-gradient(900deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
            height: '300px',
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box display='flex' p={2}>
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
