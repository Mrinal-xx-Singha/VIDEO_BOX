import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { VideoCard, ChannelCard } from './';

const Videos = ({ videos, direction }) => {
    if (!videos?.length) {
        return (
            <Typography color="#fff" variant="h6" textAlign="center" minHeight="100vh">
                Loading...
            </Typography>
        );
    }

    return (
        <Stack 
            direction={direction || "row"} 
            flexWrap="wrap" 
            justifyContent="start" 
            alignItems="start" 
            gap={2}
        >
            {videos.map((item) => (
                <Box key={item.id.videoId || item.id.channelId}>
                    {item.id.videoId && <VideoCard video={item} />}
                    {item.id.channelId && <ChannelCard channelDetail={item} />}
                </Box>
            ))}
        </Stack>
    );
}

export default Videos;
