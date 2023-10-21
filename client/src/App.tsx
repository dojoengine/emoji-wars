import { useEffect, useState } from 'react';
import { Cell } from './components/cell';
import { EmojiContextMenu } from './components/menu';
import { EmojiIndex } from './constants';
import { useSyncWorld } from './hooks/useSyncWorld';
import { useDojo } from './DojoContext';

function App() {
  useSyncWorld();

  const { setup: { entityUpdates } } = useDojo()

  const totalRows = 30;
  const totalCols = 30;

  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiIndex>(1);

  const handleRightClick = (event: any) => {
    event.preventDefault();
    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleEmojiSelect = (emoji: EmojiIndex) => {

    console.log(emoji)
    setSelectedEmoji(emoji);
    closeContextMenu();  // Close the context menu when an emoji is selected
  };

  const closeContextMenu = () => {
    setContextMenuPosition(null);
  };

  useEffect(() => {
    const subscription = entityUpdates.subscribe((updates) => {

      console.log(updates)
      // const notifications = generateTradeNotifications(updates, Status);
      // addUniqueNotifications(notifications, setNotifications);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div onContextMenu={handleRightClick} className="App">

      {contextMenuPosition && (
        <EmojiContextMenu
          position={contextMenuPosition}
          onSelect={handleEmojiSelect}
          onClose={closeContextMenu}
        />
      )}
      <div className="grid">
        {Array.from({ length: totalRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: totalCols }).map((index, colIndex) => {
              return <Cell key={index} x={colIndex.toString()} y={rowIndex.toString()} emoji={selectedEmoji} />
            }
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
