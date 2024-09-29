import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { 
  demoThumbnailUrl, 
  demoVideoUrl, 
  demoVideoTitle, 
  demoChannelUrl, 
  demoChannelTitle 
} from './utils/constants';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Card 
    sx={{
      width: { xs: '100%', sm: '358px', md: '320px' },
      boxShadow: 'none',
      borderRadius: 0,
      transition: '0.3s', // Add a transition effect for hover
      '&:hover': {
        transform: 'scale(1.05)', // Slight scaling effect on hover
      },
    }}
  >
    <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} style={{ textDecoration: 'none' }}>
      <CardMedia
        component="img" // Changed to component="img" for better semantics
        image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
        alt={snippet?.title || 'Video thumbnail'} // Added alt text
        sx={{
          width: '100%', 
          height: 180,
          objectFit: 'cover', // Ensures image covers the area without distortion
        }}
      />
    </Link>
    <CardContent sx={{ backgroundColor: '#1E1E1E', height: '106px', padding: '16px' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} style={{ textDecoration: 'none' }}>
        <Typography variant='subtitle1' fontWeight='bold' color='#FFF'>
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} style={{ textDecoration: 'none' }}>
        <Typography variant='subtitle2' color='gray' display='flex' alignItems='center'>
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard;
