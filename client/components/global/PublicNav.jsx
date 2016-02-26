PublicNav = React.createClass({
    render() {
        return (
        <div className="ui fixed icon menu">
            <a className="item" href="/">
                <i className="home icon"></i>
                Home
            </a>

            <div className="right menu">
                <a className="ui item" href="/about">
                    <i className="info icon"></i>
                    About Us
                </a>
            </div>
        </div>);
    }
});