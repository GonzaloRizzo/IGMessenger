import { useState } from 'react';
import { keyBy, merge } from 'lodash-es'
import { plainToClassFromExist } from 'class-transformer';
import * as api from '../../../services/instagram'


const useDirectThread = () => {
    const [state, setState] = useState({
        metadata: {},
        threads: {}
    })

    const getMoreItems = async threadId => {
        const metadata = state.metadata[threadId] || {}
        const feed = plainToClassFromExist(api.client.feed.directThread({
            thread_id: threadId,
        }), metadata)

        const newItems = await feed.items()
        
        setState(merge({}, state, {
            metadata: {
                [threadId]: feed.toPlain()
            },
            threads: {
                [threadId]: keyBy(newItems, 'item_id')
            }
        }))
    }

    return [state.threads, getMoreItems]
}

export default useDirectThread;