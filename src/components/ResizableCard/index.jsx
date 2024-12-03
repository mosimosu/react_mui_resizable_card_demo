import React, { useRef } from 'react';
import { Box, Card, CardContent, CardActions, Typography, IconButton, Button, Avatar, AvatarGroup } from '@mui/joy';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
 
export default function ResizableCards() {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const maxContainerWidth = 1400;
 
  const handleResize = (e, cardRef, otherCardRef) => {
    const container = containerRef.current;
    const card = cardRef.current;
    const otherCard = otherCardRef.current;
 
    const startX = e.clientX;
    const startCardWidth = card.offsetWidth;
    const startOtherCardWidth = otherCard.offsetWidth;
 
    const onMouseMove = (e) => {
      const dx = e.clientX - startX;
 
      let newCardWidth = startCardWidth + dx;
      let newOtherCardWidth = startOtherCardWidth - dx;
 
      if (newCardWidth < 200) newCardWidth = 200; // 最小寬度
      if (newOtherCardWidth < 200) newOtherCardWidth = 200;
 
      const totalWidth = newCardWidth + newOtherCardWidth;
 
      if (totalWidth <= maxContainerWidth) {
        card.style.width = `${newCardWidth}px`;
        otherCard.style.width = `${newOtherCardWidth}px`;
      }
    };
 
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
 
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
 
  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        maxWidth: maxContainerWidth,
        margin: '0 auto',
        border: '1px solid #ccc',
      }}
    >
      <Card
        ref={card1Ref}
        variant="outlined"
        sx={{
          width: '50%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CardContent>
          <Typography level="title-lg">Card 1</Typography>
          <Typography level="body-sm">This is the first card.</Typography>
        </CardContent>
        <CardActions>
          <IconButton variant="outlined" color="neutral">
            <FavoriteBorder />
          </IconButton>
          <Button variant="solid" color="primary">
            Action 1
          </Button>
        </CardActions>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '10px',
            height: '100%',
            cursor: 'ew-resize',
            background: '#00ff00',
          }}
          onMouseDown={(e) => handleResize(e, card1Ref, card2Ref)}
        ></Box>
      </Card>
      <Card
        ref={card2Ref}
        variant="outlined"
        sx={{
          width: '50%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CardContent>
          <Typography level="title-lg">Card 2</Typography>
          <Typography level="body-sm">This is the second card.</Typography>
        </CardContent>
        <CardActions>
          <IconButton variant="outlined" color="neutral">
            <FavoriteBorder />
          </IconButton>
          <Button variant="solid" color="primary">
            Action 2
          </Button>
        </CardActions>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '10px',
            height: '100%',
            cursor: 'ew-resize',
            background: '#007bff',
          }}
          onMouseDown={(e) => handleResize(e, card2Ref, card1Ref)}
        ></Box>
      </Card>
    </Box>
  );
}