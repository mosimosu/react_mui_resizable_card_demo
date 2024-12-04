// 引入必要的 React 和 Material-UI Joy 組件
import React, { useRef } from 'react';
import { Box, Card, CardContent, CardActions, Typography, IconButton, Button, Avatar, AvatarGroup } from '@mui/joy';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

/**
 * 可調整大小的卡片組件
 */
export default function ResizableCards() {
  // 使用 useRef 來儲存 DOM 元素的引用
  const containerRef = useRef(null);  // 容器的參考
  const card1Ref = useRef(null);      // 第一張卡片的參考
  const card2Ref = useRef(null);      // 第二張卡片的參考
  const maxContainerWidth = 1400;      // 容器最大寬度設定

  /**
   * 處理卡片調整大小的函數
   * @param {MouseEvent} e 滑鼠事件
   * @param {React.RefObject<HTMLElement>} cardRef 當前正在調整的卡片的參考
   * @param {React.RefObject<HTMLElement>} otherCardRef 另一張卡片的參考
   */
  const handleResize = (e, cardRef, otherCardRef) => {
    // 獲取相關的 DOM 元素
    const container = containerRef.current;
    const card = cardRef.current;          // 當前正在調整的卡片
    const otherCard = otherCardRef.current; // 另一張卡片

    // 記錄滑鼠開始拖曳時的初始位置和卡片寬度
    const startX = e.clientX;
    const startCardWidth = card.offsetWidth;
    const startOtherCardWidth = otherCard.offsetWidth;

    /**
     * 滑鼠移動時的處理函數
     * @param {MouseEvent} e 滑鼠事件
     */
    const onMouseMove = (e) => {
      // 計算滑鼠移動的距離
      const dx = e.clientX - startX;

      // 計算新的卡片寬度
      let newCardWidth = startCardWidth + dx;
      let newOtherCardWidth = startOtherCardWidth - dx;

      // 設定最小寬度限制，防止卡片過小
      if (newCardWidth < 200) newCardWidth = 200;
      if (newOtherCardWidth < 200) newOtherCardWidth = 200;

      // 計算總寬度
      const totalWidth = newCardWidth + newOtherCardWidth;

      // 確保總寬度不超過容器最大寬度
      if (totalWidth <= maxContainerWidth) {
        card.style.width = `${newCardWidth}px`;
        otherCard.style.width = `${newOtherCardWidth}px`;
      }
    };

    /**
     * 滑鼠放開時的處理函數
     */
    const onMouseUp = () => {
      // 移除事件監聽器，停止追蹤滑鼠移動
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // 添加事件監聽器，追蹤滑鼠移動和放開
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    // 外層容器
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        maxWidth: maxContainerWidth,
        margin: '0 auto',
        border: '1px solid #ccc',
      }}
    >
      {/* 第一張卡片 */}
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
        {/* 右側調整大小的拖曳條 */}
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
      {/* 第二張卡片 */}
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
        {/* 左側調整大小的拖曳條 */}
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