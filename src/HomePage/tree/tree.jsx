
import React from 'react';
import { connect } from 'react-redux';
import { treeActions, homeAction } from '../../_actions';
import { Treebeard, decorators } from '../../_addaptedLibs/react-treebeard'
import * as filters from '../../_services/tree/treeSearchFilter';

import $ from 'jquery';

/*Example: Customising The Header Decorator To Include Icons
  decorators.Header = ({ node }) => {
    const iconType = node.children ? true : false;
    const iconStyle = { marginRight: '5px' };

    return (
      <div>
        <div>
          <i style={iconStyle} />
          {iconType && <FaAngleRight />}
          {node.name}
        </div>
      </div>
    );
  };
*/


/*
OutPut the tree array object for dubag use
  class NodeViewer extends React.Component {
    render() {
      const HELP_MSG = 'Select A Node To See Its Data Structure Here...';
      let json = JSON.stringify(this.props.node, null, 4);

      if (!json) {
        json = HELP_MSG;
      }

      return <div>{json}</div>;
    }
}
*/


class TreeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { treeData: [], treeFiltered: [], trigger: 0 };
    this.onToggle = this.onToggle.bind(this);
    this.createTree = this.createTree.bind(this);
    this.indentTree = this.indentTree.bind(this);
  }

  /* update component on props change */
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data != null) {
      const data = nextProps.data;
      this.setState({ treeData: data, treeFiltered: data })
    }
  }

  componentWillMount() {
    let user = homeAction.getUser();
    this.props.dispatch(treeActions.getTree(user));
  }

  componentDidUpdate() {
    this.indentTree()
  }

  componentDidMount() {
    this.indentTree()
  }


  /* if node tree does not contain data hide else add title attr */
  indentTree() {
    $('div[style*="cursor: pointer; position: relative; padding: 0px 5px; display: block;"]').each(function () {
      let ele = $(this).children().eq(1);
      if (ele.text() == "") $(this).hide();
      else ele.attr('title', ele[0].innerText);
    });
  }

  /* on tree node click */
  onToggle(node, toggled, text) {
    const { cursor } = this.state;

    if (cursor) {
      cursor.active = false;
    }

    node.active = true;
    if (node.children && !text) {
      node.toggled = toggled;
    }

    this.setState({ cursor: node, trigger: this.state.trigger == 0 ? 1 : 0 });

    if (text) {
      const { dispatch } = this.props;
      dispatch(treeActions.nodeSelected(node.position, this.state.trigger));
    }
  }

  /* tree search filter */
  onFilterMouseUp(e) {
    const temp = [];
    const filter = e.target.value.trim();
    if (!filter) {
      this.state.treeData.forEach((node) => {
        node.toggled = false
      })
      this.setState({ treeFiltered: this.state.treeData });
      return
    }
    this.state.treeFiltered.forEach((node) => {
      var filtered = filters.filterTree(node, filter);
      filtered = filters.expandFilteredNodes(filtered, filter);
      temp.push(filtered);
    })

    this.setState({ treeFiltered: temp });
  }

  createTree(data) {
    const dataTemp = {};
    data.forEach((headLine, index) => {
    })
  }

  render() {

    const { treeFiltered: stateData, cursor } = this.state;
    return (
      <nav className="col-md-2 d-md-block pt-3">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <div>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-search" />
                </span>
                <input className="form-control"
                  onKeyUp={this.onFilterMouseUp.bind(this)}
                  placeholder="Search the tree..."
                  type="text" />
              </div>
            </div>
            <div id='tree' className="linkTree">
              <Treebeard data={stateData}
                // decorators={decorators}
                onToggle={this.onToggle} />
            </div>

            {/* <div>
              <NodeViewer node={cursor} />
            </div> */}

          </ul>
          <div>
            {/* Extra info and links */}
            {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Saved reports</span>
              <a className="d-flex align-items-center text-muted" href="#">

              </a>
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a className="nav-link" href="#">

                  Current month
                                      </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">

                  Last quarter
                                         </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">

                  Social engagement
                                        </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">

                  Year-end sale
                                       </a>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { tree } = state;
  const data = tree.treeData || null;
  return {
    data
  };
}

const TreeElement = connect(mapStateToProps)(TreeComponent);
export { TreeElement as TreeComponent };

