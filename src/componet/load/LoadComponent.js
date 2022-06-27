import React from 'react'
import Loadable from 'react-loadable'
import Loading from './index';

/*组件加载时是否有loading效果*/
const LoadComponent = (component, haveLoading = false) => {
    return Loadable({
        loader: () => component,
        loading: () => {
            if (haveLoading) {
                return <Loading style={{ background: 'none', height: 'calc(100vh - 173px)' }} />
            }
            return null
        }
    })
};

export default LoadComponent