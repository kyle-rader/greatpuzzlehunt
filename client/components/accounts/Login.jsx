// Define our login comp

Login = React.createClass({
    // mixins: [ReactMeteorData],
    // getmeteorData() {
    //     return {
            
    //     };
    // },

    login(event) {
        event.preventDefault();

        // Log user in 
    },

    render() {
      let gridStyle = {
        height: '100%'
      };
      let colStyle = {
        maxWidth: '440px'
      };
      return (
      <div className="ui middle aligned center aligned grid" style={gridStyle}>
          <div className="column" style={colStyle}>
              <form className="ui large form">
                <div className="ui raised segment">
                  <h2 className="ui blue header">
                    <div className="content">
                      Altitude
                    </div>
                  </h2>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input type="text" ref="username" placeholder="Username" autoComplete="off" />
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" ref="password" placeholder="Password" autoComplete="off" />
                    </div>
                  </div>
                  <div className="ui fluid large blue submit button">Login</div>
                </div>

                <div className="ui error message"></div>

              </form>

              <div className="ui message">
                New to us? <a href="#">Sign Up</a>
              </div>
          </div>
      </div>);
    }
});
