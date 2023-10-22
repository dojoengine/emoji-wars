import { useEffect, useState } from 'react';
import { Cell } from './components/cell';
import { EmojiContextMenu } from './components/menu';
import { EmojiIndex } from './constants';
import { useSyncWorld } from './hooks/useSyncWorld';
import { useDojo } from './DojoContext';
import { LeaderBoard } from './components/leaderboard';
import LoadingEmoji from './components/loading';

function App() {
  const { VITE_PUBLIC_MASTER_ADDRESS } = import.meta.env;
  const { loading } = useSyncWorld();
  const { setup: { entityUpdates }, account: { create, list, select, account, isDeploying } } = useDojo()

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

      console.log("updates", updates)
      // const notifications = generateTradeNotifications(updates, Status);
      // addUniqueNotifications(notifications, setNotifications);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div onContextMenu={handleRightClick} className="App">
      <div>
        {account.address}
      </div>
      {loading || account.address === VITE_PUBLIC_MASTER_ADDRESS ? <div className='h-screen w-screen bg-white flex fixed top-0 justify-center '>
        <div className='self-center'>
          <div>
            <LoadingEmoji />
          </div>

          loading emojis
          <div>
            right click to show allegiances
          </div>
          <button className='p-2 border' onClick={create}>{isDeploying ? "deploying burner" : "create burner"}</button>
          <div className="card">
            select signer:{" "}
            <select onChange={e => select(e.target.value)}>
              {list().map((account, index) => {
                return <option value={account.address} key={index}>{account.address}</option>
              })}i
            </select>
          </div>
        </div>
      </div> : ''}


      {contextMenuPosition && (
        <EmojiContextMenu
          position={contextMenuPosition}
          onSelect={handleEmojiSelect}
          onClose={closeContextMenu}
        />
      )}
      <div>
        {!loading && <LeaderBoard />}
      </div>
      <div className="grid-emoji">
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
