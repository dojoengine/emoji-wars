import { useState } from 'react';
import { Cell } from './components/cell';
import { EmojiContextMenu } from './components/menu';
import { EmojiIndex } from './constants';

function App() {


  // extract query
  // const { getEntities } = graphSdk() /


  // // use graphql to current state data
  // useEffect(() => {
  //   if (!entityId) return;

  //   const fetchData = async () => {
  //     try {
  //       const { data } = await getEntities();
  //       if (data && data.entities) {
  //         setComponentsFromGraphQLEntities(contractComponents, data.entities.edges);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [entityId, contractComponents]);

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
            {Array.from({ length: totalCols }).map((_, colIndex) => {
              return <Cell x={colIndex.toString()} y={rowIndex.toString()} emoji={selectedEmoji} />
            }
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
