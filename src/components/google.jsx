import React from 'react';

class Google extends React.Component {

    componentDidMount() {
        (function() {
          var cx = '013790329765579001936:xw63gx7spom';
          var gcse = document.createElement('script');
          gcse.type = 'text/javascript';
          gcse.async = true;
          gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(gcse, s);
        })();
      }

    render() {
        return(
            <div className="google-container">
                <div className="gcse-search"></div>

            </div>
        );
    }
}

export default Google;