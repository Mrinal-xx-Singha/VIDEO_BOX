import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { demoProfilePicture } from './utils/constants';

const ChannelCard = React.memo(({ channelDetail, marginTop }) => {
  const channelId = channelDetail?.id?.channelId;
  const channelTitle = channelDetail?.snippet?.title || 'Channel Name';
  const profileImage =
    channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture;
  const subscriberCount =
    channelDetail?.statistics?.subscriberCount
      ? parseInt(channelDetail.statistics.subscriberCount).toLocaleString()
      : null;

  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '100%', sm: '356px', md: '320px' },
        height: '326px',
        margin: 'auto',
        marginTop,
      }}
    >
      <Link to={`/channel/${channelId}`} aria-label={channelTitle}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <CardMedia
            image={profileImage}
            alt={channelTitle}
            sx={{
              borderRadius: '50%',
              height: '180px',
              width: '180px',
              mb: 2,
              border: '1px solid #e3e3e3',
            }}
          />
          <Typography variant="h6" noWrap>
            {channelTitle}
            <CheckCircle
              sx={{ fontSize: '14px', color: 'gray', ml: '5px' }}
            />
          </Typography>
          {subscriberCount && (
            <Typography variant="body2" color="gray">
              {subscriberCount} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
});

export default ChannelCard;
