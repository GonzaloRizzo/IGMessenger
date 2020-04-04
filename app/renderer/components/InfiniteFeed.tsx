/* eslint-disable react/prop-types */
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import Measure, { ContentRect } from 'react-measure';
import { VariableSizeList as List } from 'react-window-reversed';
import { mergeRefs } from '../utils';

export default function InfiniteFeed({
  loadMoreItems,
  isLoadingItems,
  hasMoreItems,
  itemCount,
  reversed = false,
  renderItem,
  renderLoadingIndicator
}) {
  const itemSizes = React.useRef({});
  const listRef = React.useRef();

  const getItemSize = index => itemSizes.current[index] || 50;
  const handleItemResize = (index: number, resizeData: ContentRect) => {
    const { bounds, margin } = resizeData;

    itemSizes.current[index] = bounds.height + margin.top + margin.bottom;
    if (listRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (listRef.current as any).resetAfterIndex(index, false);
    }
  };

  const isItemLoaded = index => !hasMoreItems || index < itemCount;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={hasMoreItems ? itemCount + 1 : itemCount}
          loadMoreItems={isLoadingItems ? () => {} : loadMoreItems}
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
              overscanCount={1}
            >
              {({ index, style }) => (
                <div style={style}>
                  <Measure
                    bounds
                    margin
                    onResize={resizeData => handleItemResize(index, resizeData)}
                  >
                    {({ measureRef }) =>
                      isItemLoaded(index)
                        ? renderItem({ ref: measureRef, index })
                        : renderLoadingIndicator({ ref: measureRef, index })
                    }
                  </Measure>
                </div>
              )}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}
