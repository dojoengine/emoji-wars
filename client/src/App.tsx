import { useDojo } from './DojoContext';
import { Direction, } from './dojo/createSystemCalls'
import { useComponentValue } from "@latticexyz/react";
import { Entity } from '@latticexyz/recs';
import { useEffect, useState } from 'react';
import { getEntityIdFromKeys, setComponentsFromGraphQLEntities } from '@dojoengine/utils';
import { Cell } from './components/cell';
import { EmojiContextMenu } from './components/menu';
import { EmojiIndex } from './constants';

function App() {
  const {
    setup: {
      systemCalls: { spawn },
      components,
      network: { contractComponents }
    },
    account: { create, list, select, account, isDeploying }
  } = useDojo();

  // extract query
  // const { getEntities } = graphSdk()

  // entity id - this example uses the account address as the entity id
  const entityId = account.address.toString();

  // get current component values
  const position = useComponentValue(components.Position, getEntityIdFromKeys([BigInt(1), BigInt(1)]));
  const emoji_component = useComponentValue(components.Emoji, entityId as Entity);

  console.log("position", position, emoji_component);

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
