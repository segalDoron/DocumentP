
import React from 'react';
import { connect } from 'react-redux';
import { treeActions } from '../../_actions';

import { Treebeard, decorators } from 'react-treebeard';
import * as filters from '../../_services/treeSreachFilter';


// Create tree fake date
const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'loading parent',
      loading: true,
      children: []
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            {
              name: 'nested child 1',
              children: [
                { name: 'nested child 1' },
                { name: 'nested child 2' }
              ]
            },
            { name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
};

// Example: Customising The Header Decorator To Include Icons
// decorators.Header = ({ node }) => {
//   const iconType = node.children ? 'folder' : 'file-text';
//   const iconClass = `fa fa-${iconType}`;
//   const iconStyle = { marginRight: '5px' };

//   return (
//     <div>
//       <div>
//         <i className={iconClass} style={iconStyle} />
//         {node.name}
//       </div>
//     </div>
//   );
// };


//OutPut the tree array object for dubag use
// class NodeViewer extends React.Component {
//   render() {
//     const HELP_MSG = 'Select A Node To See Its Data Structure Here...';
//     let json = JSON.stringify(this.props.node, null, 4);

//     if (!json) {
//       json = HELP_MSG;
//     }

//     return <div>{json}</div>;
//   }
// }


class TreeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data };
    this.onToggle = this.onToggle.bind(this);

  }

  onToggle(node, toggled) {
    const { cursor } = this.state;

    if (cursor) {
      cursor.active = false;
    }

    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }

    this.setState({ cursor: node });
  }

  onFilterMouseUp(e) {
    const filter = e.target.value.trim();
    if (!filter) {
      return this.setState({ data });
    }
    var filtered = filters.filterTree(data, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.setState({ data: filtered });
  }

  render() {

    const { data: stateData, cursor } = this.state;
    return (

      <nav className="col-md-2 d-none d-md-block sidebar pt-3">
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
            <div>
              <Treebeard data={stateData}
                // decorators={decorators}
                onToggle={this.onToggle} />
            </div>

            {/* <div>
              <NodeViewer node={cursor} />
            </div> */}


          </ul>
          {/* Extra info and links */}
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
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
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const TreeElement = connect(mapStateToProps)(TreeComponent);
export { TreeElement as TreeComponent };
