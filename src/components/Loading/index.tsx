import React, { memo } from 'react';
import { connect } from 'react-redux';

import './style.scss';

interface LoadignProps {
    loading: boolean;
}

const Loading = ({ loading }: LoadignProps) =>
    loading ? (
        <div className="loading">
            <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    ) : <></>

const mapState = (state: any) => ({
    loading: state.loading.effects.calendar.getHolidaysAsync,
});

export default connect(mapState)(memo(Loading));
