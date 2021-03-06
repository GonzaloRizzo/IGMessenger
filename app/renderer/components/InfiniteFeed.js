import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import Measure from 'react-measure';
import { VariableSizeList as List } from 'react-window-reversed';
import { mergeRefs } from '../utils';

const InfiniteFeed = ({
  loadMoreItems,
  itemCount,
  reversed = false,
  renderItem
}) => {
  const itemSizes = React.useRef({});
  const listRef = React.useRef();

  const getItemSize = index => itemSizes.current[index] || 50;
  const handleItemResize = (index, { bounds, margin }) => {
    itemSizes.current[index] = bounds.height + margin.top + margin.bottom;
    if (listRef.current) {
      listRef.current.resetAfterIndex(index, false);
    }
  };
  
  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={index => index < itemCount}
          itemCount={itemCount + 1}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              ref={mergeRefs(ref, listRef)}
              onItemsRendered={onItemsRendered}
              itemCount={itemCount}
              itemSize={getItemSize}
              width={width}
              height={height}
              reversed={reversed}
            >
              {({ index, style }) => (
                <div style={style}>
                  <Measure
                    bounds
                    margin
                    onResize={resizeData => handleItemResize(index, resizeData)}
                  >
                    {({ measureRef }) => renderItem({ ref: measureRef, index })}
                  </Measure>
                </div>
              )}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};
export default InfiniteFeed;
