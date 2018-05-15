import React from 'react';
import { connect } from 'react-redux';
import { ScaleLoader } from 'react-spinners';

class LoaderComponent extends React.Component {

    constructor() {
        super();
        this.state = { loading: false };
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.showLoader != undefined)
            this.setState({ loading: nextProps.showLoader })
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                <div className="loader-img">
                    <ScaleLoader color={'#000000'} height={70} width={10} loading={this.state.loading} />
                </div>
                {loading && <div className="overlay"></div>}
            </div >
        );
    }
}

function mapStateToProps(state) {
    const showLoader = state.loader.showLoader
    return {
        showLoader
    };
}

const connectLoaderComponent = connect(mapStateToProps)(LoaderComponent);
export { connectLoaderComponent as Loader };