
import React from 'react';
import { connect } from 'react-redux';
import { Tree, Input } from 'antd';
import { treeActions } from '../../_actions';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const x = 10;
const y = 3;
const z = 1;
const gData = [];

// creat tree fake data
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

// generate list for Search bar
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);

// generate key for Search bar
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class TreeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      gData,
      // expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    }

    this.onSelect = this.onSelect.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // Search bar input onChange
  onChange(e) {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  onExpand(expandedKeys) {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onSelect(selectedKeys, info) {
    const { dispatch } = this.props;
    console.log('selected', selectedKeys, info);
    dispatch(treeActions.nodeSelected(selectedKeys, info));
  }




  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => data.map((item) => {
      const index = item.key.indexOf(searchValue);
      const beforeStr = item.key.substr(0, index);
      const afterStr = item.key.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.key}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
    return (

      <nav className="col-md-2 d-none d-md-block sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">

            {/* add this style to make search bar position fix */}
            {/* style={{ marginBottom: 8, position: 'sticky', top: '50px', zIndex: '1020' }} */}
            <Search placeholder="Search" style={{ marginTop: '10px' }} onChange={this.onChange} />
            <Tree
              className="draggable-tree"
              showLine
              expandedKeys={expandedKeys}
              onSelect={this.onSelect}
              onExpand={this.onExpand}
              autoExpandParent={autoExpandParent}
            >
              {loop(this.state.gData)}
            </Tree>
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
