import React from 'react';
import { Meteor } from 'meteor/meteor';
import FloaterListRow from './FloaterListRow.jsx';

export default class FloaterList extends React.Component{
  getFloaterList() {
      return this.props.users.map((user) => {
          return (
          <FloaterListRow user={user} key={user._id}/>
          );
      });
  }

  search(event) {
      let search = event.target.value;
      let floaterList = $(this.refs.floaterlist);
      floaterList.find(`tr:contains(${search})`).each(function() {
          $(this).show();
      });
      floaterList.find(`tr:not(:contains(${search}))`).each(function() {
          $(this).hide();
      });
  }

  componentDidMount() {
      $(this.refs.controlRow)
          .visibility({
              type   : 'fixed',
              offset : 35,
          });
  }

  render() {
      return (
      <table className="ui compact celled table">
          <thead ref="controlRow" className="full-width control-row">
              <tr>
                  <th colSpan="3">
                      <div className="ui grid">
                          <div className="three wide column">
                              <div className="ui large green fluid label">
                                  <i className="user icon"></i>
                                  &nbsp;
                                  {this.props.users.length} Users
                              </div>
                          </div>
                          <div className="ten wide column">
                              <div className="ui fluid right icon input">
                                  <input type="text" placeholder="Search" onChange={this.search.bind(this)}/>
                                  <i className="search icon"></i>
                              </div>
                          </div>
                      </div>
                  </th>
              </tr>
          </thead>
          <thead className="full-width">
              <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Email</th>
              </tr>
          </thead>
        <tbody ref="floaterlist">
          {this.getFloaterList()}
        </tbody>
        <tfoot className="full-width">
          <tr>
            <th colSpan="3">

            </th>
          </tr>
        </tfoot>
      </table>
      );
  }
};

FloaterList.propTypes = {
    users: React.PropTypes.array,
    loading: React.PropTypes.bool,
};
