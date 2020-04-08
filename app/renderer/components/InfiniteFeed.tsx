/* eslint-disable react/prop-types */
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
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
  const handleItemResize = (index: number, height: number) => {
    if (itemSizes.current[index] !== height) {
      itemSizes.current[index] = height;
      if (listRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (listRef.current as any).resetAfterIndex(index, true);
      }
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
                  <LazyMeasure
                    onMeasure={resizeData =>
                      handleItemResize(index, resizeData)
                    }
                  >
                    {({ measureRef }) =>
                      isItemLoaded(index)
                        ? renderItem({ ref: measureRef, index })
                        : renderLoadingIndicator({ ref: measureRef, index })
                    }
                  </LazyMeasure>
                </div>
              )}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}

function LazyMeasure({ onMeasure, children }) {
  const measureRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const { height } = measureRef.current.getBoundingClientRect();
    onMeasure(height);
  }, []);
  return children({ measureRef });
}
